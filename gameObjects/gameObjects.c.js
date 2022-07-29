// gameObjects.c.js

gameObjects = 
{
    localPlayer: null,
    world: null,
    gameMode: null,
    gameActions: null,
    mines: null,
    flags: null,
    physicsComponent: null,
    healthComponent: null,
    camera: null,
    trackedChassis: null,
    speedCharacteristics: null,
    serverUpdates: null,
    strikerComponent: null
}

GameObjects.getWorld = function ()
{
    if (gameObjects.world)
    {
        return gameObjects.world;
    }  

    let rootObject = Utils.getRootObject();

    if (!rootObject)
    {
        return null;
    }  
    
    let subs = rootObject.store.subscribers.toArray();

    if (!subs)
    {
        return null;
    }

    let world = subs.find(element => element["tank"] != null && element["tank"].hasOwnProperty("world"));

    if (!world)
    {
        return null;
    }

    return gameObjects.world = world.tank.world;
}

GameObjects.getGameActions = function ()
{
    if (gameObjects.gameActions)
    {
        return Array.from(gameObjects.gameActions);
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return null;
    }

    return Array.from(gameObjects.gameActions = world.inputManager.input.gameActions_0.map);
}

GameObjects.getGameMode = function ()
{
    if (gameObjects.gameMode)
    {
        return gameObjects.gameMode;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.gameMode = world.entities_0.toArray().at(0).components_0.array;
}

GameObjects.getMines = function ()
{
    if (gameObjects.mines)
    {
        return gameObjects.mines;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }
    
    let gameMode_0 = GameObjects.getGameMode();

    if (!gameMode_0)
    {
        return null;
    }

    return gameObjects.mines = gameMode_0.at(15);
}

GameObjects.getFlags = function ()
{
    if (gameObjects.flags)
    {
        return gameObjects.flags;
    }

    let gameMode_0 = GameObjects.getGameMode();

    if (!gameMode_0)
    {
        return null;
    }

    for (let i = 0; i < gameMode_0.length; i++)
    {
        if (gameMode_0.at(i).hasOwnProperty("flags_0"))
        {
            if (gameMode_0.at(i).flags_0.internalMap_uxhen5$_0)
            {
                return gameObjects.flags = gameMode_0.at(i).flags_0.internalMap_uxhen5$_0.backingMap_0;
            }
        }
    }

    return null;
}

GameObjects.getLocalPlayer = function ()
{
    if (gameObjects.localPlayer)
    {
        return gameObjects.localPlayer;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return null;
    }

    let bodies = world.physicsScene_0.bodies_0.toArray();

    for (let i = 0; i < bodies.length; i++)
    {
        if (bodies.at(i).data.isPossessed == true)
        {
            return gameObjects.localPlayer = bodies.at(i).data.components_0.array;
        }
    }
    
    return null;
}

GameObjects.getPhysicsComponent = function ()
{
    if (gameObjects.physicsComponent)
    {
        return gameObjects.physicsComponent;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("tankPhysicsComponent_0"))
        {
            return gameObjects.physicsComponent = localPlayer.at(i).tankPhysicsComponent_0;
        }
    }

    return null;
}

GameObjects.getHealthComponent = function ()
{
    if (gameObjects.healthComponent)
    {
        return gameObjects.healthComponent;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("health"))
        {
            return gameObjects.healthComponent = localPlayer.at(i);
        }
    }

    return null;
}

GameObjects.getCamera = function ()
{
    if (gameObjects.camera)
    {
        return gameObjects.camera;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("followCamera_0"))
        {
            return gameObjects.camera = localPlayer.at(i).followCamera_0.currState_0;
        }
    }

    return null; 
}

GameObjects.getTrackedChassis = function ()
{
    if (gameObjects.trackedChassis)
    {
        return gameObjects.trackedChassis;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("trackedChassis_0"))
        {
            return gameObjects.trackedChassis = localPlayer.at(i).trackedChassis_0.params_0;
        }
    }

    return null; 
}

GameObjects.getSpeedCharacteristics = function ()
{
    if (gameObjects.speedCharacteristics)
    {
        return gameObjects.speedCharacteristics;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("speedCharacteristics_0") &&
        localPlayer.at(i).__proto__.hasOwnProperty("maxSpeedSmoother_0"))
        {
            return gameObjects.speedCharacteristics = localPlayer.at(i);
        }
    }

    return null; 
}

GameObjects.getServerUpdates = function ()
{
    if (gameObjects.serverUpdates)
    {
        return gameObjects.serverUpdates;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("needImmediateUpdate_0"))
        {
            return gameObjects.serverUpdates = localPlayer.at(i);
        }
    }

    return null; 
}

GameObjects.getStrikerComponent = function ()
{
    if (gameObjects.strikerComponent)
    {
        return gameObjects.strikerComponent;
    }

    let localPlayer = GameObjects.getLocalPlayer();

    if (!localPlayer)
    {
        return null;    
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).__proto__.hasOwnProperty("strikerWeapon_0"))
        {
            strikerData.type = "striker";
            return gameObjects.strikerComponent = localPlayer.at(i).strikerWeapon_0;
        }
        else if (localPlayer.at(i).hasOwnProperty("scorpioData_7x2wz0$_0"))
        {
            strikerData.type = "scorpion";
            return gameObjects.strikerComponent = localPlayer.at(i);
        }
    }

    return null;
}