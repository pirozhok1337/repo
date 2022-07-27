// content.c.js

// Data
let init = false;
let frameCounter = 0;
let pingKey = 74; /* key: J */

function reset()
{
    init = airBreak.state = stickData.state.value = menuShow = false;
    flagTeleportData.cooldown = true;

    let canvas = document.getElementById("canvas__imgui");
    canvas.style.visibility = "hidden";

    stickData.target = null;

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

    clickerData.autoHealingData.supplyData = 
    {
        firstAID: null,
        mine: null
    };
}

function mainEvent(time)
{
    if (!init && Utils.isGameReady())
    {
        let localPlayer = GameObjects.getLocalPlayer();

        if (localPlayer)
        {
            init = true;

            Sync.init(localPlayer);
            Striker.init(localPlayer);
            NoKnockback.init(localPlayer);
        }
    }
    else if (init && !Utils.isGameReady())
    {
        reset();
    }

    if (init)
    {
        let localPlayer = GameObjects.getLocalPlayer();

        Stick.process(localPlayer);
        AirBreak.process(localPlayer);
        BoxTeleport.process(localPlayer);
        FlagTeleport.process(localPlayer);
        Clicker.process(localPlayer);
        Other.process(localPlayer);

        frameCounter++;

        if (frameCounter >= 2)
        {
            Striker.process(localPlayer);
            RemoveMines.process(localPlayer);
            WallHack.process(localPlayer);
            
            frameCounter = 0;
        }

        CheatMenu.draw(time);
    }

    requestAnimationFrame(mainEvent);
}

Utils.getStates(); setInterval(Utils.saveStates, 5000); requestAnimationFrame(mainEvent);
console.clear();
    
alert(`Используйте только на тестовом сервере и только в режиме паркур!\n
Use only on the test server and only in parkour mode!`);