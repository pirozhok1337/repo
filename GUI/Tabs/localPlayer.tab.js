// localPlayer.tab.js

Tabs.localPlayer = function ()
{
    ImGui.Checkbox("AirBreak [R. Shift]", airBreak.enabled.access);
    ImGui.SameLine();
    ImGui.PushItemWidth(120);
    ImGui.SliderInt("Speed##airBreak.speed", airBreak.speed.access, 1, 300);
    ImGui.SameLine();
    ImGui.SliderInt("Smooth##airBreak.smooth", airBreak.smooth.access, 1, 20);
    ImGui.PopItemWidth(2);
    ImGui.SameLine();
    ImGui.Checkbox("AirWalk", airBreak.airWalk.access);

    ImGui.Checkbox("Sync", syncData.state.access);

    if (syncData.state.value)
    {
        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Anti Mine", syncData.antiMine.access);

        if (syncData.antiMine.value)
        {
            ImGui.SameLine();
            ImGui.InputInt("Height", syncData.antiMineHeight.access, 10, 10);
        }

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Spinner", syncData.spinner.access);

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Random Teleport", syncData.randomTeleport.access);

        if (syncData.randomTeleport.value)
        {
            syncData.deSyncData.state.value = false;
            syncData.fakeLagData.state.value = false;
            syncData.antiStrikerHackData.state.value = false;
            syncData.spinner.value = false;
            syncData.antiMine.value = false;
        }

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("deSync", syncData.deSyncData.state.access);

        if (syncData.deSyncData.state.value)
        {
            ImGui.SameLine();
            ImGui.Checkbox("Teleport to Real Position", syncData.deSyncData.teleportToRealPosition.access);

            syncData.randomTeleport.value = false;
            syncData.fakeLagData.state.value = false;
            syncData.antiStrikerHackData.state.value = false;
            syncData.spinner.value = false;
            syncData.antiMine.value = false;
        }

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Fake Lag", syncData.fakeLagData.state.access);

        if (syncData.fakeLagData.state.value)
        {
            ImGui.SameLine();
            ImGui.InputInt("Distance", syncData.fakeLagData.distance.access, 10, 100);

            if (syncData.fakeLagData.distance.value < 0)
            {
                syncData.fakeLagData.distance.value = 0;
            }

            syncData.randomTeleport.value = false;
            syncData.deSyncData.state.value = false;
            syncData.antiStrikerHackData.state.value = false;
        }

        ImGui.SetCursorPosX(ImGui.GetCursorPosX() + 15);
        ImGui.Checkbox("Avoid Striker Hack", syncData.antiStrikerHackData.state.access);

        if (syncData.antiStrikerHackData.state.value)
        {
            syncData.randomTeleport.value = false;
            syncData.deSyncData.state.value = false;
            syncData.fakeLagData.state.value = false;
        }
    }

    ImGui.Checkbox("Auto Healing", clickerData.autoHealingData.state.access);
    
    if (clickerData.autoHealingData.state.value)
    {
        ImGui.SameLine();
        ImGui.PushItemWidth(120);
        ImGui.SliderInt("Multiply##AHM", clickerData.autoHealingData.mply.access, 1, 5);
        ImGui.SameLine();
        ImGui.InputInt("Delay##AHD", clickerData.autoHealingData.delay.access, 10);
        ImGui.PopItemWidth(2);

        if (clickerData.autoHealingData.delay.value < 0)
        {
            clickerData.autoHealingData.delay.value = 0;
        }
    }

    ImGui.Checkbox("Auto Mining", clickerData.autoMining.access);
    ImGui.SameLine();
    ImGui.Checkbox("Auto Supplies", clickerData.autoSupplies.access);

    ImGui.Checkbox("No Collision", otherData.noCollision.access);

    ImGui.SliderInt("Gravity", otherData.gravity.access, -1000, 1000);

    ImGui.SliderFloat("No Knockback", noKnockbackMply.access, 0, 2);

    ImGui.Checkbox("Box Teleport", boxTeleport.access);

    ImGui.Checkbox("SpeedHack", otherData.speedHack.access);

    ImGui.Checkbox("Flag Teleport", flagTeleportData.state.access);

    ImGui.Checkbox("Rapid Update", otherData.rapidUpdateData.state.access);

    if (otherData.rapidUpdateData.state.value)
    {
        ImGui.SameLine();
        ImGui.PushItemWidth(120);
        ImGui.SliderInt("Multiply##RUM", otherData.rapidUpdateData.mply.access, 1, 5);
        ImGui.SameLine();
        ImGui.InputInt("Delay##RUD", otherData.rapidUpdateData.delay.access, 10);
        ImGui.PopItemWidth(2);

        if (otherData.rapidUpdateData.delay.value < 0)
        {
            otherData.rapidUpdateData.delay.value = 0;
        }
    }
}