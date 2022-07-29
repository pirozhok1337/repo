// striker.c.js

strikerData = 
{
    aimBot: new ImGui_Var(true),
    shellsTeleport: new ImGui_Var(true),
    state: false,
    salvoRocketsCount: 8,
    shellsTimeout: null,
    type: "striker",
    shellCache: null,
    getTargetWithScope: new ImGui_Var(true)
};

Striker.init = function (localPlayer)
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

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    if (strikerData.type == "striker")
    {
        strikerData.salvoRocketsCount = striker.salvoRocketsCount;

        if (striker.targetingSystem_0 && striker.targetingSystem_0.targetingSystem_vutpoz$_0)
        {
            let targetingSystem_0 = striker.targetingSystem_0.targetingSystem_vutpoz$_0;

            if (targetingSystem_0.directionCalculator_0 &&
                targetingSystem_0.directionCalculator_0.targetingSectorsCalculator_0)
            {
                let targetingSectorsCalculator_0 = targetingSystem_0.directionCalculator_0.
                    targetingSectorsCalculator_0;
            
                targetingSectorsCalculator_0.maxElevationAngle_0 = 100000;
                targetingSectorsCalculator_0.minElevationAngle_0 = -100000;
            }
        }
    }
    else
    {
        strikerData.salvoRocketsCount = striker.scorpioData_0.secondarySalvoSize;
    }

    if (striker.lockingTargetUpdateMessage_0)
    {
        striker.lockingTargetUpdateMessage_0.init_dcrrv6$ = function() {};
    }

    striker.lockTarget_gcez93$ = function (t, e, n)
    {
        if (strikerData.aimBot.value)
        {
            strikerData.getTargetWithScope.value ? targetId = e : t.targetId = targetId;
            this.lockTarget_gcez93$$default(t, targetId);
            return true;
        }
        else
        {
            return void 0 === e && (e = null), n ? n(t, e) : this.lockTarget_gcez93$$default(t, e);
        }
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            strikerData.shellCache = localPlayer.at(i).shellCache_0.itemsInUse.array_hd7ov6$_0;
            break;
        }
    }
}

Striker.process = function (localPlayer)
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

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    if (!strikerData.shellCache)
    {
        return;
    }

    if (!strikerData.shellsTeleport.value)
    {
        return;
    }

    if (!targetId)
    {
        return;
    }

    if (KeyPressing.isKeyPressed(82 /*key: R*/) && Utils.isNotOpenChat())
    {
        strikerData.state = true;
    }

    if (!strikerData.state && strikerData.shellCache.length == strikerData.salvoRocketsCount)
    {
        if (!strikerData.shellsTimeout)
        {
            strikerData.shellsTimeout = setTimeout(() => { strikerData.state = true; strikerData.shellsTimeout = null; }, 
            strikerData.type == "striker" ? 2000 : 4000);
        }
    }

    let targetBody = Utils.getBodyById(world, localPlayer, targetId);

    if (!targetBody)
    {
        return;
    }
    
    if (!targetBody.state)
    {
        return;
    }

    if (!targetBody.state.position)
    {
        return;
    }

    let target = Utils.getPlayerById(world, localPlayer, targetId);

    if (!target)
    {
        return;
    }

    if (strikerData.state)
    {
        for (let i = 0; i < strikerData.shellCache.length; i++)
        {
            strikerData.shellCache.at(i).components_0.array.at(1).direction.x = 0;
            strikerData.shellCache.at(i).components_0.array.at(1).direction.y = 0;
            strikerData.shellCache.at(i).components_0.array.at(1).direction.z = 0;

            strikerData.shellCache.at(i).components_0.array.at(1).position.x = targetBody.state.position.x;
            strikerData.shellCache.at(i).components_0.array.at(1).position.y = targetBody.state.position.y;
            strikerData.shellCache.at(i).components_0.array.at(1).position.z = targetBody.state.position.z;
        }

        if (strikerData.shellCache.length == 0)
        {
            strikerData.state = false;
        }
    }
    else
    {
        for (let i = 0; i < strikerData.shellCache.length; i++)
        {
            strikerData.shellCache.at(i).components_0.array.at(1).direction.x = 0;
            strikerData.shellCache.at(i).components_0.array.at(1).direction.y = 0;
            strikerData.shellCache.at(i).components_0.array.at(1).direction.z = 0;
        }
    }
}