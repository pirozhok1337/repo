// flagTeleport.c.js

flagTeleportData = 
{
    state: new ImGui_Var(false),
    cooldown: true
};

FlagTeleport.process = function (localPlayer)
{
    if (!flagTeleportData.state.value)
    {
        return;
    }

    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let flags = GameObjects.getFlags();

    if (!flags)
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
    
    if (flagTeleportData.cooldown)
    {
        let localFlag, enemyFlag;

        if (flags[0].value.teamType.name != localPlayer.at(0).team.name)
        {
            enemyFlag = flags[0].value;
            localFlag = flags[1].value;
        }
        else
        {
            enemyFlag = flags[1].value;
            localFlag = flags[0].value;
        }

        if (localFlag.state.name == "AT_BASE" && enemyFlag.state.name != "CARRIED")
        {
            flagTeleportData.cooldown = false;

            let enemyFlagPosition = enemyFlag.interpolatedStatus_o5md0j$_0.position;
            let localFlagPosition = localFlag.interpolatedStatus_o5md0j$_0.position;

            let t = physicsComponent.getInterpolatedBodyState();

            t.position.x = enemyFlagPosition.x;
            t.position.y = enemyFlagPosition.y;
            t.position.z = enemyFlagPosition.z;

            serverUpdates.sendUpdate_0(t, world.physicsTime);

            t.position.x = localFlagPosition.x;
            t.position.y = localFlagPosition.y;
            t.position.z = localFlagPosition.z;

            serverUpdates.sendUpdate_0(t, world.physicsTime);

            setTimeout(() => 
            {
                flagTeleportData.cooldown = true;
            }, 5000);

            return;
        }
    }
}