// airBreak.h.js

class AirBreak
{
    process = null; // args: 1 - localPlayer
}

airBreak =
{
    enabled: new ImGui_Var(true),
    isShiftPressed: false,
    state: false,
    airWalk: new ImGui_Var(false),
    speed: new ImGui_Var(70),
    position: { x: 0, y: 0, z: 0 }
}