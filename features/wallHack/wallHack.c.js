// wallHack.c.js

let espData = 
{
    enabled: new ImGui_Var(true),
    colorEnemy: 10027085,
    colorTarget: 6750054,
    colorTeam: 10066431,
    onlyEnemy: new ImGui_Var(false),
    boxGlow: new ImGui_Var(true)
};

function drawEsp(player, color)
{
    if (!player)
    {
        return;
    }

    if (player.length == 0)
    {
        return;
    }

    let weaponSkin;
    let weaponChildren;
    let hull;
    let hullChildren;

    for (let i = 0; i < player.length; i++)
    {
        if (player.at(i).__proto__.hasOwnProperty("weaponSkin_0"))
        {
            weaponSkin = player.at(i).weaponSkin_0.root;
            weaponChildren = weaponSkin.children_ich852$_0.array;
            hull = player.at(i).weaponSkin_0.hullSkinComponent_0.hull;
            hullChildren = hull.children_ich852$_0.array;
            break;
        }
    }

    if (!weaponSkin || !hull || !weaponChildren || !hullChildren)
    {
        return;
    }

    if (color == 0)
    {
        weaponSkin.outlined = false;
        hull.outlined = false;

        for (let i = 0; i < weaponChildren.length; i++)
        {
            weaponChildren.at(i).outlined = false;
        }

        for (let i = 0; i < hullChildren.length; i++)
        {
            hullChildren.at(i).outlined = false;
        }

        return;
    }

    weaponSkin.outlined = true;
    weaponSkin.outlineBold = false;
    weaponSkin.outlineColor = color;

    hull.outlined = true;
    hull.outlineBold = false;
    hull.outlineColor = color;

    for (let i = 0; i < weaponChildren.length; i++)
    {
        weaponChildren.at(i).outlined = true;
        weaponChildren.at(i).outlineBold = false;
        weaponChildren.at(i).outlineColor = color;
    }

    for (let i = 0; i < hullChildren.length; i++)
    {
        hullChildren.at(i).outlined = true;
        hullChildren.at(i).outlineBold = false;
        hullChildren.at(i).outlineColor = color;
    }
}

WallHack.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
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
        if (!espData.enabled.value)
        {
            drawEsp(playersArray.at(i), 0);
            continue;
        }

        if (Utils.getPlayerById(world, localPlayer, targetId) == playersArray.at(i))
        {
            drawEsp(playersArray.at(i), espData.colorTarget);
            continue;
        }

        if (Utils.isPlayerEnemy(localPlayer, playersArray.at(i)))
        {
            drawEsp(playersArray.at(i), espData.colorEnemy);
            continue;
        }
        
        if (!espData.onlyEnemy.value)
        {
            drawEsp(playersArray.at(i), espData.colorTeam);
        }
        else
        {
            drawEsp(playersArray.at(i), 0);
        }
    }

    let triggers = world.triggers_0.triggers_0.array;

    if (triggers && triggers.length != 0)
    {
        for (let i = 0; i < triggers.length; i++)
        {
            if (!triggers.at(i).enabled)
            {
                continue;
            }

            if (!triggers.at(i).bonus_0)
            {
                continue;
            }

            let bonusMesh = triggers.at(i).bonus_0.bonusMesh;

            if (!bonusMesh)
            {
                continue;
            }

            let object3d = bonusMesh.object3d;

            if (!object3d)
            {
                continue;
            }

            let bonusData_0 = triggers.at(i).bonus_0.bonusData_0;

            if (!bonusData_0)
            {
                continue;
            }

            object3d.outlineColor = bonusData_0.bonusLight.lightColor.color;

            if (!espData.boxGlow.value || !espData.enabled.value)
            {
                object3d.outlined = false;
                continue;
            }

            object3d.outlineBold = false;
            object3d.outlined = true;
        }
    }
}