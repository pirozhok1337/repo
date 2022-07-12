// antiStrikerHack.c.js

syncData.antiStrikerHackData.process = function (ecx, t)
{
    if (!syncData.antiStrikerHackData.state.value)
    {
        syncData.antiStrikerHackData.randomTeleport = false;
        return;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    if (syncData.antiStrikerHackData.randomTeleport)
    {
        let bounds = world.entities_0.toArray().at(0).components_0.array.at(0).bounds;

        t.position.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
        t.position.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
        t.position.z = Utils.getRandomArbitrary(bounds.maxZ + 60, bounds.maxZ + 2000);

        ecx.sendUpdate_0(t, world.physicsTime);

        t.position.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
        t.position.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
        t.position.z = Utils.getRandomArbitrary(bounds.maxZ + 200, bounds.maxZ + 2000);
    }

    let playersArray = Utils.getPlayers(world, localPlayer);

    if (!playersArray)
    {
        return;
    }

    if (playersArray.length == 0)
    {
        return;
    }

    for (let i = 0; i < playersArray.length; i++)
    {
        for (let n = 0; n < playersArray.at(i).length; n++)
        {
            let shellCache;
            let striker;

            if (playersArray.at(i).at(n).hasOwnProperty("shellCache_0"))
            {
                striker = playersArray.at(i).at(n);

                if (!striker.rocketLauncherCC_0)
                {
                    continue;
                }

                if (striker.rocketLauncherCC_0.salvoSize != 8)
                {
                    continue;
                }

                shellCache = playersArray.at(i).at(n).shellCache_0.itemsInUse.toArray();

                if (!playersArray.at(i).at(n).tempTimeout)
                {
                    playersArray.at(i).at(n).tempTimeout = null;
                }

                if (!playersArray.at(i).at(n).tempState)
                {
                    playersArray.at(i).at(n).tempState = false;
                }
            }
            else
            {
                continue;
            }

            if (playersArray.at(i).at(n).tempState == true)
            {
                continue;
            }

            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;
            }

            if (playersArray.at(i).at(n).tempTimeout == null && shellCache.length == 8)
            {
                playersArray.at(i).at(n).tempTimeout = setTimeout(() => 
                { 
                    playersArray.at(i).at(n).tempState = syncData.antiStrikerHackData.randomTeleport = true;

                    setTimeout(() => 
                    {
                        syncData.antiStrikerHackData.randomTeleport = false; 
                        playersArray.at(i).at(n).tempTimeout = null;
                        playersArray.at(i).at(n).tempState = true;
                    }, 500);

                    setTimeout(() => 
                    {
                        playersArray.at(i).at(n).tempState = false;
                    }, 1000);
                }, 1600);
            }

            break;
        }
    }
}