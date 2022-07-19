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

Utils.saveStates = function () 
{
    // AirBreak
    Cookies.set("airBreak.enabled.value", airBreak.enabled.value);
    Cookies.set("airBreak.airWalk.value", airBreak.airWalk.value);
    Cookies.set("airBreak.speed.value", airBreak.speed.value);

    // Box Teleport
    Cookies.set("boxTeleport.value", boxTeleport.value);

    // Clicker
    Cookies.set("clickerData.autoSupplies.value", clickerData.autoSupplies.value);
    Cookies.set("clickerData.autoMining.value", clickerData.autoMining.value);
    Cookies.set("clickerData.autoHealingData.state.value", clickerData.autoHealingData.state.value);

    // Flag Teleport
    Cookies.set("flagTeleportData.state.value", flagTeleportData.state.value);

    // No Knockback
    Cookies.set("noKnockbackMply.value", noKnockbackMply.value);

    // Other
    Cookies.set("otherData.speedHack.value", otherData.speedHack.value);
    Cookies.set("otherData.noCollision.value", otherData.noCollision.value);
    Cookies.set("otherData.gravity.value", otherData.gravity.value);
    Cookies.set("otherData.rapidUpdateData.state.value", otherData.rapidUpdateData.state.value);
    Cookies.set("otherData.rapidUpdateData.mply.value", otherData.rapidUpdateData.mply.value);

    // Remove Mines
    Cookies.set("removeMines.value", removeMines.value);

    // Striker
    Cookies.set("strikerData.aimBot.value", strikerData.aimBot.value);
    Cookies.set("strikerData.shellsTeleport.value", strikerData.shellsTeleport.value);
    Cookies.set("strikerData.noLaser.value", strikerData.noLaser.value);
    Cookies.set("strikerData.getTargetWithScope.value", strikerData.getTargetWithScope.value);

    // Sync
    Cookies.set("syncData.state.value", syncData.state.value);
    Cookies.set("syncData.antiMine.value", syncData.antiMine.value);
    Cookies.set("syncData.antiMineHeight.value", syncData.antiMineHeight.value);
    Cookies.set("syncData.randomTeleport.value", syncData.randomTeleport.value);
    Cookies.set("syncData.spinner.value", syncData.spinner.value);
    Cookies.set("syncData.antiStrikerHackData.state.value", syncData.antiStrikerHackData.state.value);
    Cookies.set("syncData.fakeLagData.state.value", syncData.fakeLagData.state.value);
    Cookies.set("syncData.fakeLagData.distance.value", syncData.fakeLagData.distance.value);
    Cookies.set("syncData.deSyncData.state.value", syncData.deSyncData.state.value);
    Cookies.set("syncData.deSyncData.teleportToRealPosition.value", syncData.deSyncData.teleportToRealPosition.value);

    // WallHack
    Cookies.set("espData.enabled.value", espData.enabled.value);
    Cookies.set("espData.onlyEnemy.value", espData.onlyEnemy.value);
    Cookies.set("espData.boxGlow.value", espData.boxGlow.value);
    Cookies.set("espData.colorEnemy", espData.colorEnemy);
    Cookies.set("espData.colorTarget", espData.colorTarget);
    Cookies.set("espData.colorTeam", espData.colorTeam);
    Cookies.set("colorEnemyRGB.r", colorEnemyRGB.value.at(0));
    Cookies.set("colorEnemyRGB.g", colorEnemyRGB.value.at(1));
    Cookies.set("colorEnemyRGB.b", colorEnemyRGB.value.at(2));
    Cookies.set("colorTeamRGB.r", colorTeamRGB.value.at(0));
    Cookies.set("colorTeamRGB.g", colorTeamRGB.value.at(1));
    Cookies.set("colorTeamRGB.b", colorTeamRGB.value.at(2));
    Cookies.set("colorTargetRGB.r", colorTargetRGB.value.at(0));
    Cookies.set("colorTargetRGB.g", colorTargetRGB.value.at(1));
    Cookies.set("colorTargetRGB.b", colorTargetRGB.value.at(2));
}

function checkValue(v)
{
    if (v == undefined)
    {
        Cookies.set("init", "false");
        document.location.reload();
        throw new Error("stop");
    }

    return v;
}

function boolean(v)
{
    return v === "true";
}

Utils.getStates = function () 
{
    // AirBreak
    airBreak.enabled.value = boolean(checkValue(Cookies.get("airBreak.enabled.value")));
    airBreak.airWalk.value = boolean(checkValue(Cookies.get("airBreak.airWalk.value")));
    airBreak.speed.value = Number(checkValue(Cookies.get("airBreak.speed.value")));

    // Box Teleport
    boxTeleport.value = boolean(checkValue(Cookies.get("boxTeleport.value")));

    // Clicker
    clickerData.autoSupplies.value = boolean(checkValue(Cookies.get("clickerData.autoSupplies.value")));
    clickerData.autoMining.value = boolean(checkValue(Cookies.get("clickerData.autoMining.value")));
    clickerData.autoHealingData.state.value = boolean(checkValue(Cookies.get("clickerData.autoHealingData.state.value")));

    // Flag Teleport
    flagTeleportData.state.value = boolean(checkValue(Cookies.get("flagTeleportData.state.value")));

    // No Knockback
    noKnockbackMply.value = Number(checkValue(Cookies.get("noKnockbackMply.value")));

    // Other
    otherData.speedHack.value = boolean(checkValue(Cookies.get("otherData.speedHack.value")));
    otherData.noCollision.value = boolean(checkValue(Cookies.get("otherData.noCollision.value")));
    otherData.gravity.value = Number(checkValue(Cookies.get("otherData.gravity.value")));
    otherData.rapidUpdateData.state.value = boolean(checkValue(Cookies.get("otherData.rapidUpdateData.state.value")));
    otherData.rapidUpdateData.mply.value = Number(checkValue(Cookies.get("otherData.rapidUpdateData.mply.value")));

    // Remove Mines
    removeMines.value = boolean(checkValue(Cookies.get("removeMines.value")));

    // Striker
    strikerData.aimBot.value = boolean(checkValue(Cookies.get("strikerData.aimBot.value")));
    strikerData.shellsTeleport.value = boolean(checkValue(Cookies.get("strikerData.shellsTeleport.value")));
    strikerData.noLaser.value = boolean(checkValue(Cookies.get("strikerData.noLaser.value")));
    strikerData.getTargetWithScope.value = boolean(checkValue(Cookies.get("strikerData.getTargetWithScope.value")));

    // Sync
    syncData.state.value = boolean(checkValue(Cookies.get("syncData.state.value")));
    syncData.antiMine.value = boolean(checkValue(Cookies.get("syncData.antiMine.value")));
    syncData.antiMineHeight.value = Number(checkValue(Cookies.get("syncData.antiMineHeight.value")));
    syncData.randomTeleport.value = boolean(checkValue(Cookies.get("syncData.randomTeleport.value")));
    syncData.spinner.value = boolean(checkValue(Cookies.get("syncData.spinner.value")));
    syncData.antiStrikerHackData.state.value = boolean(checkValue(Cookies.get("syncData.antiStrikerHackData.state.value")));
    syncData.fakeLagData.state.value = boolean(checkValue(Cookies.get("syncData.fakeLagData.state.value")));
    syncData.fakeLagData.distance.value = Number(checkValue(Cookies.get("syncData.fakeLagData.distance.value")));
    syncData.deSyncData.state.value = boolean(checkValue(Cookies.get("syncData.deSyncData.state.value")));
    syncData.deSyncData.teleportToRealPosition.value = boolean(checkValue(Cookies.get("syncData.deSyncData.teleportToRealPosition.value")));

    // WallHack
    espData.enabled.value = boolean(checkValue(Cookies.get("espData.enabled.value")));
    espData.onlyEnemy.value = boolean(checkValue(Cookies.get("espData.onlyEnemy.value")));
    espData.boxGlow.value = boolean(checkValue(Cookies.get("espData.boxGlow.value")));
    espData.colorEnemy = Number(checkValue(Cookies.get("espData.colorEnemy")));
    espData.colorTarget = Number(checkValue(Cookies.get("espData.colorTarget")));
    espData.colorTeam = Number(checkValue(Cookies.get("espData.colorTeam")));
    colorEnemyRGB.value[0] = Number(checkValue(Cookies.get("colorEnemyRGB.r")));
    colorEnemyRGB.value[1] = Number(checkValue(Cookies.get("colorEnemyRGB.g")));
    colorEnemyRGB.value[2] = Number(checkValue(Cookies.get("colorEnemyRGB.b")));
    colorTeamRGB.value[0] = Number(checkValue(Cookies.get("colorTeamRGB.r")));
    colorTeamRGB.value[1] = Number(checkValue(Cookies.get("colorTeamRGB.g")));
    colorTeamRGB.value[2] = Number(checkValue(Cookies.get("colorTeamRGB.b")));
    colorTargetRGB.value[0] = Number(checkValue(Cookies.get("colorTargetRGB.r")));
    colorTargetRGB.value[1] = Number(checkValue(Cookies.get("colorTargetRGB.g")));
    colorTargetRGB.value[2] = Number(checkValue(Cookies.get("colorTargetRGB.b")));
}