// players.tab.js

let selected = new ImGui_Var(-1);
let selectedPlayerName = "none";
let targetId;
let onlyEnemy = new ImGui_Var(false);

Tabs.players = function ()
{
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

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }

    ImGui.Checkbox("Only enemy", onlyEnemy.access);

    let playersArray = Utils.getPlayers(world, localPlayer, onlyEnemy.value);

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
        if (!playersArray.at(i))
        {
            continue;
        }

        if (playersArray.at(i).length == 0)
        {
            continue;
        }

        let playerName = Utils.getPlayerName(playersArray.at(i));

        if (ImGui.Selectable(playerName, selected.value === i))
        {
            selectedPlayerName = playerName;
            selected.value = i;
        }
    }

    ImGui.Separator();

    if (selected.value >= 0)
    {
        if (!playersArray.at(selected.value))
        {
            return;
        }

        if (playersArray.at(selected.value).length == 0)
        {
            return;
        }

        ImGui.Text(`Selected player: ${selectedPlayerName}`);
    
        let playerBody = Utils.getPlayerBody(playersArray.at(selected.value));

        if (!playerBody)
        {
            return;
        }

        if (ImGui.Button("Set target"))
        {
            for (let i = 0; i < playersArray.at(selected.value).length; i++)
            {
                if (playersArray.at(selected.value).at(i).__proto__.hasOwnProperty("userId"))
                {
                    targetId = playersArray.at(selected.value).at(i).userId;
                    break;
                }
            }
        }

        ImGui.SameLine();

        ImGui.Checkbox("Stick", stickData.state.access);

        if (stickData.state.access)
        {
            stickData.target = playerBody;
        }
    }
}