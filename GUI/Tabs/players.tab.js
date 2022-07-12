// players.tab.js

let selected = new ImGui_Var(-1);
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

        if (ImGui.Selectable(Utils.getPlayerName(playersArray.at(i)), selected.value === i))
        {
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

        ImGui.Text(`Selected player: ${Utils.getPlayerName(playersArray.at(selected.value))}`);
    
        let playerBody = Utils.getPlayerBody(playersArray.at(selected.value));

        if (!playerBody)
        {
            return;
        }

        if (ImGui.Button("Teleport to Selected Player"))
        {
            if (!playerBody)
            {
                return;
            }

            let position = playerBody.state.position;

            if (position)
            {
                physicsComponent.body.state.position.x = position.x;
                physicsComponent.body.state.position.y = position.y;
                physicsComponent.body.state.position.z = position.z;

                physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
                physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
                physicsComponent.body.state.orientation.x = 0;
                physicsComponent.body.state.orientation.y = 0;
                        
                physicsComponent.body.state.angularVelocity.x = 0;
                physicsComponent.body.state.angularVelocity.y = 0;
                physicsComponent.body.state.angularVelocity.z = 0;
        
                physicsComponent.body.state.velocity.x = 0;
                physicsComponent.body.state.velocity.y = 0;
                physicsComponent.body.state.velocity.z = 0;
            }
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

        ImGui.Checkbox("Stick", stickData.state.access);

        if (stickData.state.access)
        {
            stickData.target = playerBody;
        }
    }
}