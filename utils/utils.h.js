if (GM_info.script.version != 0.52)
{
    alert(`У вас установлена устаревшая версия скрипта!\n
You have an outdated version of the script installed!`);
    window.open("https://raw.githubusercontent.com/sheezzmee/shizoval/main/shizoval.user.js", '_blank').focus();
    throw new Error("stop");
}

// utils.h.js

class Utils
{
    getRootElement      = null; // args: void 
    getRootObject       = null; // args: void
    getRenderElement    = null; // args: void
    getRandomArbitrary  = null; // args: void

    isNotOpenChat       = null; // args: void
    isNotKillZone       = null; // args: 1 - world, 2 - position {x, y, z}
    isGameReady         = null; // args: void
    isPlayerEnemy       = null; // args: 1 - localPlayer, 2 - player
    
    getPlayers          = null; // args: 1 - world, 2 - localPlayer, 3 - isOnlyEnemy (= false)
    getPlayerById       = null; // args: 1 - world, 2 - localPlayer, 3 - playerId
    getPlayerName       = null; // args: 1 - player

    getBodyById         = null; // args: 1 - world, 2 - localPlayer, 3 - playerId
    getPlayerBody       = null; // args: 1 - player

    saveStates          = null; // args: void
    getStates           = null; // args: void
}

utilsObjects = 
{
    rootElement: null,
    rootObject: null
}

class ImGui_Var
{
    constructor(value)
    {
        this.value = value;
        this.access = (value = this.value) => this.value = value;
    };
}