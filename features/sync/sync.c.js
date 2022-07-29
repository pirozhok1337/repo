// sync.c.js

syncData =
{
    state: new ImGui_Var(false),
    antiMine: new ImGui_Var(true),
    antiMineHeight: new ImGui_Var(60),
    randomTeleport: new ImGui_Var(false),
    spinner: new ImGui_Var(false),

    antiStrikerHackData:
    {
        state: new ImGui_Var(true),
        process: null,
        randomTeleport: false
    },

    fakeLagData:
    {
        state: new ImGui_Var(false),
        process: null,
        temp: false,
        position: { x: 0, y: 0, z: 0 },
        distance: new ImGui_Var(300)
    },

    deSyncData:
    {
        state: new ImGui_Var(false),
        temp: false,
        orientation: { w: 0, x: 0, y: 0, z: 0 },
        position: { x: 0, y: 0, z: 0 },
        teleportToRealPosition: new ImGui_Var(false)
    }
};

Sync.init = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let serverUpdates = GameObjects.getServerUpdates();

    if (!serverUpdates)
    {
        return;
    }

    serverUpdates.sendState_0 = function(t) 
    {
        if (KeyPressing.isKeyPressed(pingKey) && Utils.isNotOpenChat())
        {
            return;
        }

        if (KeyPressing.isKeyPressed(46 /*key: DELETE*/) && Utils.isNotOpenChat())
        {
            t.position.z = 99999;
            this.sendUpdate_0(t, this.world.physicsTime);
            return;
        }

        if (syncData.state.value)
        {
            if (syncData.spinner.value)
            {
                t.orientation.w = Utils.getRandomArbitrary(-1, 1);
                t.orientation.x = Utils.getRandomArbitrary(-1, 1);
                t.orientation.y = Utils.getRandomArbitrary(-1, 1);
                t.orientation.z = Utils.getRandomArbitrary(-1, 1);
            }

            if (syncData.antiMine.value)
            {
                t.position.z += syncData.antiMineHeight.value;
            }

            if (syncData.fakeLagData.process(this, t, physicsComponent) == true)
            {
                return;
            }

            if (syncData.deSyncData.process(this, t, physicsComponent) == true)
            {
                return;
            }

            syncData.antiStrikerHackData.process(this, t);

            if (syncData.randomTeleport.value)
            {
                let bounds = world.entities_0.toArray().at(0).components_0.array.at(0).bounds;

                for (let i = 0; i < 2; i++)
                {
                    t.position.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
                    t.position.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
                    t.position.z = Utils.getRandomArbitrary(bounds.maxZ + 60, bounds.maxZ + 1900);
                    
                    this.sendUpdate_0(t, this.world.physicsTime);
                }

                return;
            }
        }
        
        this.sendUpdate_0(t, this.world.physicsTime);
    }
    
}