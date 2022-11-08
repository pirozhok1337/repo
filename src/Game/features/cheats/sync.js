import { config, utils, sync, gameObjects, packetControl } from '../../../index.js';

export default class Sync {
    #initialized = false;
    #lastSendState = {
        position: {
            x: 0, y: 0, z: 0
        },
        orientation: {
            x: 0, y: 0, z: 0, w: 0
        }
    };
    #nextTime = 0;
    #aafk = undefined;
    #config = config.data.syncData;
    skip = false;
    forceSkip = false;
    isRandomTPEnabled = false;

    reset = () => {
        this.forceSkip = false;
        this.skip = false;
        this.#initialized = false;
        this.#nextTime = 0;
        clearInterval(this.#aafk);
    }

    compareOrientation = state => {
        return (+state.orientation.x.toFixed(2) === +this.#lastSendState.orientation.x.toFixed(2) && 
            +state.orientation.y.toFixed(2) === +this.#lastSendState.orientation.y.toFixed(2) &&
            +state.orientation.z.toFixed(2) === +this.#lastSendState.orientation.z.toFixed(2) &&
            +state.orientation.w.toFixed(2) === +this.#lastSendState.orientation.w.toFixed(2));
    }

    isRocketsExist = onlyEnemy => {
        let tanks = utils.getTanks(onlyEnemy),
            state = false;

        if (!utils.isArrayValid(tanks))
            return;

        for (const tank of tanks) {
            let shells = tank['StrikerRocketFactory']?.shellCache_0?.itemsInUse?.toArray();

            if (utils.isArrayValid(shells)) {
                for (const shell of shells) {
                    shell.components_0.array[1].direction.init_y2kzbl$(0, 0, 0);
                }

                state = true;
            }
        }

        return state;
    }

    sendUpdate = (sender, state) => {
        if (packetControl.responseTime >= 2500)
            return;

        let health = gameObjects.localTank?.['HealthComponent']?.health;

        if (typeof health === 'number' && health !== 0) {
            let result = utils.isNotKillZone(state.position);

            if (result !== 0)
                utils.outKillZone(state.position, result);

            if (gameObjects.localTank['StrikerWeapon'] && !this.skip && !this.forceSkip) {
                if (state.position.distance_ry1qwf$(this.#lastSendState.position) < 300)
                    return;
            } else {
                if (state.position.distance_ry1qwf$(this.#lastSendState.position) < 300 && this.compareOrientation(state))
                    return;
            }

            this.#lastSendState.position = state.position.clone();
            this.#lastSendState.orientation = state.orientation.clone();
        
            sender.sendUpdate_0(state, sender.world.physicsTime);
        }
    }

    randomPosition = t => {
        sync.isRandomTPEnabled = true;

        let map = gameObjects.gameMode?.['BattleMapComponent'],
            killZone = utils.getKillZone(map);

        if (killZone) {
            t.position.x = utils.getUniqueRandomArbitrary(this.#lastSendState.position.x, 3000,
                killZone.minX, killZone.maxX);
            t.position.y = utils.getUniqueRandomArbitrary(this.#lastSendState.position.y, 3000, 
                killZone.minY, killZone.maxY);
            t.position.z = !Math.round(Math.random()) ? map.bounds.maxZ + 500 : killZone.maxZ;

            t.orientation.x = 0;
            t.orientation.y = 0;
        }
    }

    process = (sender, chassisServer, root) => {
        utils.isBindPressed(this.#config.antiStrikerData) && 
            (this.#config.antiStrikerData.state = !this.#config.antiStrikerData.state);

        utils.isBindPressed(this.#config.randomTeleportData) && 
            (this.#config.randomTeleportData.state = !this.#config.randomTeleportData.state);

        utils.isBindPressed(this.#config.antiMineData) && 
            (this.#config.antiMineData.state = !this.#config.antiMineData.state);

        if (sender && this.#initialized && !this.skip && !this.forceSkip && sender.world.physicsTime > this.#nextTime) {
            this.#nextTime = sender.world.physicsTime + this.#config.updateInterval;
            sender.sendState_0(sender.tankPhysicsComponent_0.getInterpolatedBodyState());
        }

        if (!sender || this.#initialized)
            return;

        this.#initialized = !!(chassisServer.onControlChanged_0 = sender.runAfterPhysicsUpdate_mx4ult$ = () => {})

        setInterval((function() {
            root.state.battlePauseState.idleKickPeriodInMsec.low_ = -1;
            this.chassis_0.controlState.moveForward = 1;
            this.serverInterface_0.sendChassisControl_t8q23h$(this.world.physicsTime, this.chassis_0.controlState);
            this.chassis_0.controlState.moveForward = 0;
            this.serverInterface_0.sendChassisControl_t8q23h$(this.world.physicsTime, this.chassis_0.controlState);
        }).bind(chassisServer), 30000);

        sender.__proto__.sendState_0 = function(t) {
            if (sync.forceSkip || (t.position && t.position.x === 0 && t.position.y === 0 && t.position.z === 0))
                return;

            if (sync.skip)
                return sync.sendUpdate(this, t);

            sync.#config.antiMineData.state && (t.position.z += sync.#config.antiMineData.height);

            sync.isRandomTPEnabled = false;

            if (sync.#config.antiStrikerData.state)
                sync.isRocketsExist(sync.#config.antiStrikerData.type === 'Enemy') && sync.randomPosition(t);

            sync.#config.randomTeleportData.state && sync.randomPosition(t);

            sync.sendUpdate(this, t);
        }
    }
}