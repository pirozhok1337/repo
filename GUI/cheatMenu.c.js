// cheatMenu.c.js

document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;

let menuShow = false;

(async function()
{ 
    await ImGui.default();

    ImGui.CreateContext();
    ImGui.StyleColorsDark();

    const output = document.getElementById("output") || document.body;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", { alpha: true }) || canvas.getContext("webgl", { alpha: true });

    output.appendChild(canvas);

    canvas.tabIndex = 1000;
    canvas.id = "canvas__imgui";

    canvas.style.position = "absolute";
    canvas.style.left = "0px";
    canvas.style.right = "0px";
    canvas.style.top = "0px";
    canvas.style.bottom = "0px";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.userSelect = "none";
    canvas.style.visibility = "hidden";

    ImGui_Impl.Init(canvas);
    ImGui_Impl.gl = context;
})();

document.addEventListener('keyup', (e) => 
{
    if (e.keyCode == 45 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        menuShow = !menuShow;

        let canvas = document.getElementById("canvas__imgui");

        menuShow ? canvas.style.visibility = "" : canvas.style.visibility = "hidden";

        if (menuShow)
        {
            document.exitPointerLock();
        }
    }
})

CheatMenu.draw = function (time)
{
    if (!menuShow)
    {
        return;
    }

    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();
    
    ImGui.SetNextWindowSize(new ImGui.ImVec2(650, 370), ImGui.Cond.FirstUseEver);
    ImGui.Begin("shizoval", null, ImGui.WindowFlags.NoCollapse);

    if (ImGui.BeginTabBar("##tabbar", ImGui.TabBarFlags.None)) 
    {
        if (ImGui.BeginTabItem("Local Player")) 
        {
            Tabs.localPlayer();

            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Weapon")) 
        {
            Tabs.weapon();

            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Visuals")) 
        {
            Tabs.visuals();

            ImGui.EndTabItem();
        }

        if (ImGui.BeginTabItem("Players")) 
        {
            Tabs.players();
                
            ImGui.EndTabItem();
        }

        ImGui.EndTabBar();
    }

    ImGui.End();

    ImGui.EndFrame();
    ImGui.Render();

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());
}