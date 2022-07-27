// clicker.c.js

clickerData = 
{
    autoMining: new ImGui_Var(false),
    autoSupplies: new ImGui_Var(false),

    autoHealingData:
    {
        delay: new ImGui_Var(0),
        timeout: null,
        state: new ImGui_Var(false),
        mply: new ImGui_Var(1),

        supplyData:
        {
            firstAID: null,
            mine: null
        }
    }
};

Clicker.process = function (localPlayer)
{
    if (!clickerData.autoSupplies.value && !clickerData.autoMining.value && !clickerData.autoHealingData.state.value)
    {
        return;
    }

    if (KeyPressing.isKeyPressed(pingKey) && Utils.isNotOpenChat())
    {
        return;
    }

    if (!localPlayer)
    {
        return;
    }

    let gameActions = GameObjects.getGameActions();

    if (!gameActions)
    {
        return;
    }

    if (!clickerData.autoHealingData.supplyData.firstAID || !clickerData.autoHealingData.supplyData.mine)
    {
        for (let i = 0; i < localPlayer.length; i++)
        {
            if (localPlayer.at(i).hasOwnProperty("supplyTypeConfigs_0"))
            {
                let map = localPlayer.at(i).supplyTypeConfigs_0.map_97q5dv$_0.
                    internalMap_uxhen5$_0.backingMap_0;

                for (let key in map)
                {
                    if (map[key].key_5xhq3d$_0.name$ == "FIRST_AID")
                    {
                        clickerData.autoHealingData.supplyData.firstAID = map[key]._value_0._value_0;
                    }

                    if (map[key].key_5xhq3d$_0.name$ == "MINE")
                    {
                        clickerData.autoHealingData.supplyData.mine = map[key]._value_0._value_0;
                    }
                }

                break;
            }
        }
    }

    if (clickerData.autoSupplies.value)
    {
        gameActions.at(6).at(1).wasPressed = true;
        gameActions.at(6).at(1).wasReleased = true;
    
        gameActions.at(7).at(1).wasPressed = true;
        gameActions.at(7).at(1).wasReleased = true;
    
        gameActions.at(8).at(1).wasPressed = true;
        gameActions.at(8).at(1).wasReleased = true;
    }

    if (clickerData.autoMining.value)
    {
        gameActions.at(9).at(1).wasPressed = true;
        gameActions.at(9).at(1).wasReleased = true;
    }

    if (!clickerData.autoHealingData.state.value || !clickerData.autoHealingData.supplyData.firstAID || !clickerData.autoHealingData.supplyData.mine)
    {
        return;
    }

    if (clickerData.autoHealingData.delay.value === 0)
    {
        for (let i = 0; i < clickerData.autoHealingData.mply.value; i++)
        {
            clickerData.autoHealingData.supplyData.firstAID.onUserActivatedSupply();
            clickerData.autoHealingData.supplyData.mine.onUserActivatedSupply();
        }
    }
    else if (!clickerData.autoHealingData.timeout)
    {
        clickerData.autoHealingData.timeout = setTimeout(() => 
        {
            for (let i = 0; i < clickerData.autoHealingData.mply.value; i++)
            {
                clickerData.autoHealingData.supplyData.firstAID.onUserActivatedSupply();
                clickerData.autoHealingData.supplyData.mine.onUserActivatedSupply();
            }

            clickerData.autoHealingData.timeout = null;
        }, clickerData.autoHealingData.delay.value);
    }
}