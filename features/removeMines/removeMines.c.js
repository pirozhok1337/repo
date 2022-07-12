// removeMines.c.js

let removeMines = new ImGui_Var(true);

RemoveMines.process = function (localPlayer)
{
    if (!removeMines.value)
    {
        return;
    }

    if (!localPlayer)
    {
        return;
    }

    let mines = GameObjects.getMines();

    if (!mines)
    {
        return;
    }

    var n;
    for (n = mines.minesByUser_0.keys.iterator(); n.hasNext();) 
    {
        var o = n.next();
        mines.removeAllMines_0(o)
    }
}