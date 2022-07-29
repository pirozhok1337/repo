// utils.c.js

Utils.getRootElement = function ()
{
    if (utilsObjects.rootElement)
    {
        return utilsObjects.rootElement;
    }

    if (!document.getElementById("root"))
    {
        return null;
    }

    return utilsObjects.rootElement = document.getElementById("root")._reactRootContainer;
}

Utils.getRootObject = function ()
{
    if (utilsObjects.rootObject)
    {
        utilsObjects.rootObject.store.state.shop.enabled = true;

        return utilsObjects.rootObject;
    }

    let rootElement = Utils.getRootElement();

    if (!rootElement)
    {
        return null;
    }

    if (!rootElement.hasOwnProperty("_internalRoot"))
    {
        return null;
    }

    return utilsObjects.rootObject = rootElement._internalRoot.current.memoizedState.
        element.type.prototype;
}

Utils.getRenderElement = function ()
{
    return document.getElementsByClassName("sc-bwzfXH hjlOfi").item(0);
}

Utils.getRandomArbitrary = function (min, max)
{
    return Math.random() * (max - min) + min;
}

Utils.isNotOpenChat = function ()
{
    return (document.getElementsByClassName("sc-bwzfXH iokmvL").item(0) == null);
}

Utils.isNotKillZone = function (world, position)
{
    if (!world)
        return false;

    let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

    if (!bounds)
        return false;

    if (position.x != 0 && (position.x >= bounds.maxX || position.x <= bounds.minX))
        return false;
     
    if (position.y != 0 && (position.y >= bounds.maxY || position.y <= bounds.minY))
        return false;

    return true;
}

Utils.isGameReady = function ()
{
    let rootObject = Utils.getRootObject();

    if (!rootObject)
    {
        return false;
    } 

    if (!rootObject.store.state.battleStatistics.battleLoaded)
    {
        return false;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return false;
    }

    if (localPlayer.length == 0)
    {
        return false;
    }

    return true;
}

Utils.isPlayerEnemy = function(localPlayer, player)
{
    if (!player || !localPlayer)
    {
        return null;
    }

    if (!player.at(0))
    {
        return null;
    }

    let team = player.at(0).team;

    if (!team)
    {
        return null;
    }

    let name$ = team.name$;

    if (!name$)
    {
        return null;
    }

    if (localPlayer.at(0).team.name$ != "NONE" && localPlayer.at(0).team.name$ == name$)
    {
        return false;
    }

    return true;
}

Utils.getPlayers = function(world, localPlayer, isOnlyEnemy = false)
{
    if (!world || !localPlayer)
    {
        return null;
    }

    let bodies = world.physicsScene_0.bodies_0.toArray();

    if (!bodies)
    {
        return null;
    }

    let playersArray = [];

    for (let i = 0; i < bodies.length; i++)
    {
        if (!bodies.at(i))
        {
            continue;
        }

        let data = bodies.at(i).data;

        if (!data)
        {
            continue;
        }

        let components_0 = data.components_0;

        if (!components_0)
        {
            continue;
        }

        components_0 = components_0.array;

        if (!components_0)
        {
            continue;
        }

        if (components_0.length == 0)
        {
            continue;
        }

        if (isOnlyEnemy)
        {
            if (Utils.isPlayerEnemy(localPlayer, components_0) == false)
            {
                continue;
            }
        }

        if (localPlayer != components_0)
        {
            playersArray.push(components_0);
        }
    }

    return playersArray;
}

Utils.getPlayerById = function(world, localPlayer, playerId)
{
    if (!world || !localPlayer || !playerId)
    {
        return null;
    }

    let playersArray = Utils.getPlayers(world, localPlayer);

    if (!playersArray)
    {
        return null;
    }

    if (playersArray.length == 0)
    {
        return null;
    }

    for (let i = 0; i < playersArray.length; i++)
    {
        for (let n = 0; n < playersArray.at(i).length; n++)
        {
            if (playersArray.at(i).at(n).__proto__.hasOwnProperty("userId"))
            {
                if (playerId == playersArray.at(i).at(n).userId)
                {
                    return playersArray.at(i);
                }
            }
        }
    }

    return null;
}

Utils.getPlayerName = function(player)
{
    if (!player)
    {
        return null;
    }
    
    if (player.length == 0)
    {
        return null;
    }

    let configuration_0;

    for (let i = 0; i < player.length; i++)
    {
        if (player.at(i).hasOwnProperty("configuration_0"))
        {
            configuration_0 = player.at(i).configuration_0;
            break;
        }
    }

    if (!configuration_0)
    {
        return null;
    }

    if (!configuration_0.userName)
    {
        return null;
    }

    return configuration_0.userName;
}

Utils.getBodyById = function(world, localPlayer, playerId)
{
    if (!world || !localPlayer || !playerId)
    {
        return null;
    }

    let player = Utils.getPlayerById(world, localPlayer, playerId);

    if (!player)
    {
        return null;
    }

    for (let i = 0; i < player.length; i++)
    {
        if (player.at(i).__proto__.hasOwnProperty("tankBody_0"))
        {
            tankBody_0 = player.at(i).tankBody_0;

            if (!tankBody_0)
            {
                return null;
            }

            return tankBody_0;
        }
    }

    return null;
}

Utils.getPlayerBody = function(player)
{
    if (!player)
    {
        return null;
    }

    for (let i = 0; i < player.length; i++)
    {
        if (player.at(i).__proto__.hasOwnProperty("tankBody_0"))
        {
            tankBody_0 = player.at(i).tankBody_0;

            if (!tankBody_0)
            {
                return null;
            }

            return tankBody_0;
        }
    }

    return null;
}

clearCookies = function ()
{
    Cookies.remove("shizoval");
}

Utils.saveStates = function () 
{
    if (!init)
    {
        return;
    }

    try
    {
        Cookies.set("shizoval", JSON.stringify({
            airBreak,
            boxTeleport,
            clickerData,
            flagTeleportData,
            noKnockbackMply,
            otherData,
            removeMines,
            stickData,
            strikerData,
            syncData,
            espData,
            colorEnemyRGB,
            colorTeamRGB,
            colorTargetRGB
        }));
    }
    catch
    {
        
    }
}

Utils.getStates = function () 
{
    let obj = Cookies.get("shizoval");

    if (!obj)
    {
        Utils.saveStates();
        return;
    }

    obj = JSON.parse(obj);

    // AirBreak
    airBreak.enabled.value = obj.airBreak.enabled.value;
    airBreak.airWalk.value = obj.airBreak.airWalk.value;
    airBreak.speed.value = obj.airBreak.speed.value;
    airBreak.smooth.value = obj.airBreak.smooth.value;

    // Box Teleport
    boxTeleport.value = obj.boxTeleport.value;

    // Clicker
    clickerData.autoSupplies.value = obj.clickerData.autoSupplies.value;
    clickerData.autoMining.value = obj.clickerData.autoMining.value;
    clickerData.autoHealingData.state.value = obj.clickerData.autoHealingData.state.value;
    clickerData.autoHealingData.delay.value = obj.clickerData.autoHealingData.delay.value;
    clickerData.autoHealingData.mply.value = obj.clickerData.autoHealingData.mply.value;

    // Flag Teleport
    flagTeleportData.state.value = obj.flagTeleportData.state.value;

    // No Knockback
    noKnockbackMply.value = obj.noKnockbackMply.value;

    // Other
    otherData.speedHack.value = obj.otherData.speedHack.value;
    otherData.noCollision.value = obj.otherData.noCollision.value;
    otherData.gravity.value = obj.otherData.gravity.value;
    otherData.rapidUpdateData.delay.value = obj.otherData.rapidUpdateData.delay.value;
    otherData.rapidUpdateData.state.value = obj.otherData.rapidUpdateData.state.value;
    otherData.rapidUpdateData.mply.value = obj.otherData.rapidUpdateData.mply.value;

    // Remove Mines
    removeMines.value = obj.removeMines.value;

    // Striker
    strikerData.aimBot.value = obj.strikerData.aimBot.value;
    strikerData.shellsTeleport.value = obj.strikerData.shellsTeleport.value;
    strikerData.getTargetWithScope.value = obj.strikerData.getTargetWithScope.value;

    // Sync
    syncData.state.value = obj.syncData.state.value;
    syncData.antiMine.value = obj.syncData.antiMine.value;
    syncData.antiMineHeight.value = obj.syncData.antiMineHeight.value;
    syncData.randomTeleport.value = obj.syncData.randomTeleport.value;
    syncData.spinner.value = obj.syncData.spinner.value;
    syncData.antiStrikerHackData.state.value = obj.syncData.antiStrikerHackData.state.value;
    syncData.fakeLagData.state.value = obj.syncData.fakeLagData.state.value;
    syncData.fakeLagData.distance.value = obj.syncData.fakeLagData.distance.value;
    syncData.deSyncData.state.value = obj.syncData.deSyncData.state.value;
    syncData.deSyncData.teleportToRealPosition.value = obj.syncData.deSyncData.teleportToRealPosition.value;

    // WallHack
    espData.enabled.value = obj.espData.enabled.value;
    espData.onlyEnemy.value = obj.espData.onlyEnemy.value;
    espData.boxGlow.value = obj.espData.boxGlow.value;
    espData.colorEnemy = obj.espData.colorEnemy;
    espData.colorTarget = obj.espData.colorTarget;
    espData.colorTeam = obj.espData.colorTeam;
    colorEnemyRGB.value = obj.colorEnemyRGB.value;
    colorTeamRGB.value = obj.colorTeamRGB.value;
    colorTargetRGB.value = obj.colorTargetRGB.value;
}