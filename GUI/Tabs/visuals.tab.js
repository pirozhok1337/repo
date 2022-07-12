// visuals.tab.js

const rgbToHex = (v) => [parseInt((255 * v[0]).toFixed(1)),
    parseInt((255 * v[1]).toFixed(1)), parseInt((255 * v[2]).toFixed(1))].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')

let colorEnemyRGB = new ImGui_Var([0.6, 0, 0.3]);
let colorTeamRGB = new ImGui_Var([0.6, 0.6, 1]);
let colorTargetRGB = new ImGui_Var([0.4, 1, 0.4]);

Tabs.visuals = function ()
{
    ImGui.Checkbox("Glow ESP", espData.enabled.access);

    if (espData.enabled.value)
    {   
        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Only Enemy", espData.onlyEnemy.access);
        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Box ESP", espData.boxGlow.access);

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.ColorEdit3("Color Enemy", colorEnemyRGB.value);
        espData.colorEnemy = parseInt(rgbToHex(colorEnemyRGB.value), 16);

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.ColorEdit3("Color Team", colorTeamRGB.value);
        espData.colorTeam = parseInt(rgbToHex(colorTeamRGB.value), 16);

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.ColorEdit3("Color Target", colorTargetRGB.value);
        espData.colorTarget = parseInt(rgbToHex(colorTargetRGB.value), 16);
    }

    ImGui.Checkbox("Remove Mines", removeMines.access);
}