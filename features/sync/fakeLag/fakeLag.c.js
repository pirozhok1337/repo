// fakeLag.c.js

function calculateDistance(p1, p2) 
{
    var a = p2.x - p1.x;
    var b = p2.y - p1.y;
    var c = p2.z - p1.z;

    return Math.sqrt(a * a + b * b + c * c);
}

syncData.fakeLagData.process = function (ecx, t, physicsComponent)
{
    if (syncData.fakeLagData.temp && !syncData.fakeLagData.state.value)
    {
        syncData.fakeLagData.temp = false;

        syncData.fakeLagData.position.x = t.position.x;
        syncData.fakeLagData.position.y = t.position.y;
        syncData.fakeLagData.position.z = t.position.z;

        ecx.sendUpdate_0(t, ecx.world.physicsTime);

        return true;
    }
    else if (!syncData.fakeLagData.temp && syncData.fakeLagData.state.value)
    {
        syncData.fakeLagData.temp = true;

        syncData.fakeLagData.position.x = t.position.x;
        syncData.fakeLagData.position.y = t.position.y;
        syncData.fakeLagData.position.z = t.position.z;

        ecx.sendUpdate_0(t, ecx.world.physicsTime);

        return true;
    }

    if (syncData.fakeLagData.state.value)
    {
        let distance = calculateDistance(syncData.fakeLagData.position, physicsComponent.body.state.position);

        t.velocity.z += Infinity;

        if (distance >= syncData.fakeLagData.distance.value)
        {
            syncData.fakeLagData.position.x = t.position.x;
            syncData.fakeLagData.position.y = t.position.y;
            syncData.fakeLagData.position.z = t.position.z;

            ecx.sendUpdate_0(t, ecx.world.physicsTime);

            return true;
        }
        else
        {
            return true;
        }
    }

    return false;
}