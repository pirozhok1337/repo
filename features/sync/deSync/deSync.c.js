// deSync.c.js

function getDeSyncState(t)
{
    syncData.deSyncData.position.x = t.position.x;
    syncData.deSyncData.position.y = t.position.y;
    syncData.deSyncData.position.z = t.position.z;

    syncData.deSyncData.orientation.w = t.orientation.w;
    syncData.deSyncData.orientation.x = t.orientation.x;
    syncData.deSyncData.orientation.y = t.orientation.y;
    syncData.deSyncData.orientation.z = t.orientation.z;
}

syncData.deSyncData.process = function (ecx, t, physicsComponent)
{
    if (syncData.deSyncData.temp && !syncData.deSyncData.state.value)
    {
        syncData.deSyncData.temp = false;

        getDeSyncState(t);
        ecx.sendUpdate_0(t, ecx.world.physicsTime);
        return true;
    }
    else if (!syncData.deSyncData.temp && syncData.deSyncData.state.value)
    {
        syncData.deSyncData.temp = true;

        getDeSyncState(t);
        ecx.sendUpdate_0(t, ecx.world.physicsTime);
        return true;
    }

    if (syncData.deSyncData.state.value)
    {
        if (syncData.deSyncData.teleportToRealPosition.value && !airBreak.state)
        {
            physicsComponent.body.state.position.x = syncData.deSyncData.position.x;
            physicsComponent.body.state.position.y = syncData.deSyncData.position.y;
            physicsComponent.body.state.position.z = syncData.deSyncData.position.z;

            physicsComponent.body.state.orientation.w = syncData.deSyncData.orientation.w;
            physicsComponent.body.state.orientation.x = syncData.deSyncData.orientation.x;
            physicsComponent.body.state.orientation.y = syncData.deSyncData.orientation.y;
            physicsComponent.body.state.orientation.z = syncData.deSyncData.orientation.z;

            physicsComponent.body.state.angularVelocity.x = 0;
            physicsComponent.body.state.angularVelocity.y = 0;
            physicsComponent.body.state.angularVelocity.z = 0;

            physicsComponent.body.state.velocity.x = 0;
            physicsComponent.body.state.velocity.y = 0;
            physicsComponent.body.state.velocity.z = 0;
        }

        return true;
    }

    return false;
}