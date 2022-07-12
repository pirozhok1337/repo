// style.c.js

ImGui.StyleColorsDark = function()
{
    let colors = ImGui.GetStyle().Colors;

    ImGui.GetStyle().WindowTitleAlign.x = 0.5;

    colors[ImGui.Col.Text] = new ImGui.Vec4(0.95, 0.96, 0.98, 1.00);
    colors[ImGui.Col.TextDisabled] = new ImGui.Vec4(0.36, 0.42, 0.47, 1.00);
    colors[ImGui.Col.WindowBg] = new ImGui.Vec4(0.11, 0.15, 0.17, 1.00);
    colors[ImGui.Col.ChildBg] = new ImGui.Vec4(0.15, 0.18, 0.22, 1.00);
    colors[ImGui.Col.PopupBg] = new ImGui.Vec4(0.08, 0.08, 0.08, 0.94);
    colors[ImGui.Col.Border] = new ImGui.Vec4(0.08, 0.10, 0.12, 1.00);
    colors[ImGui.Col.BorderShadow] = new ImGui.Vec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.FrameBg] = new ImGui.Vec4(0.20, 0.25, 0.29, 1.00);
    colors[ImGui.Col.FrameBgHovered] = new ImGui.Vec4(0.12, 0.20, 0.28, 1.00);
    colors[ImGui.Col.FrameBgActive] = new ImGui.Vec4(0.09, 0.12, 0.14, 1.00);
    colors[ImGui.Col.TitleBg] = new ImGui.Vec4(0.09, 0.12, 0.14, 0.65);
    colors[ImGui.Col.TitleBgActive] = new ImGui.Vec4(0.08, 0.10, 0.12, 1.00);
    colors[ImGui.Col.TitleBgCollapsed] = new ImGui.Vec4(0.00, 0.00, 0.00, 0.51);
    colors[ImGui.Col.MenuBarBg] = new ImGui.Vec4(0.15, 0.18, 0.22, 1.00);
    colors[ImGui.Col.ScrollbarBg] = new ImGui.Vec4(0.02, 0.02, 0.02, 0.39);
    colors[ImGui.Col.ScrollbarGrab] = new ImGui.Vec4(0.20, 0.25, 0.29, 1.00);
    colors[ImGui.Col.ScrollbarGrabHovered] = new ImGui.Vec4(0.18, 0.22, 0.25, 1.00);
    colors[ImGui.Col.ScrollbarGrabActive] = new ImGui.Vec4(0.09, 0.21, 0.31, 1.00);
    colors[ImGui.Col.CheckMark] = new ImGui.Vec4(0.28, 0.56, 1.00, 1.00);
    colors[ImGui.Col.SliderGrab] = new ImGui.Vec4(0.28, 0.56, 1.00, 1.00);
    colors[ImGui.Col.SliderGrabActive] = new ImGui.Vec4(0.37, 0.61, 1.00, 1.00);
    colors[ImGui.Col.Button] = new ImGui.Vec4(0.20, 0.25, 0.29, 1.00);
    colors[ImGui.Col.ButtonHovered] = new ImGui.Vec4(0.28, 0.56, 1.00, 1.00);
    colors[ImGui.Col.ButtonActive] = new ImGui.Vec4(0.06, 0.53, 0.98, 1.00);
    colors[ImGui.Col.Header] = new ImGui.Vec4(0.20, 0.25, 0.29, 0.55);
    colors[ImGui.Col.HeaderHovered] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.80);
    colors[ImGui.Col.HeaderActive] = new ImGui.Vec4(0.26, 0.59, 0.98, 1.00);
    colors[ImGui.Col.Separator] = new ImGui.Vec4(0.20, 0.25, 0.29, 1.00);
    colors[ImGui.Col.SeparatorHovered] = new ImGui.Vec4(0.10, 0.40, 0.75, 0.78);
    colors[ImGui.Col.SeparatorActive] = new ImGui.Vec4(0.10, 0.40, 0.75, 1.00);
    colors[ImGui.Col.ResizeGrip] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.25);
    colors[ImGui.Col.ResizeGripHovered] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.67);
    colors[ImGui.Col.ResizeGripActive] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.95);
    colors[ImGui.Col.Tab] = new ImGui.Vec4(0.11, 0.15, 0.17, 1.00);
    colors[ImGui.Col.TabHovered] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.80);
    colors[ImGui.Col.TabActive] = new ImGui.Vec4(0.20, 0.25, 0.29, 1.00);
    colors[ImGui.Col.TabUnfocused] = new ImGui.Vec4(0.11, 0.15, 0.17, 1.00);
    colors[ImGui.Col.TabUnfocusedActive] = new ImGui.Vec4(0.11, 0.15, 0.17, 1.00);
    colors[ImGui.Col.PlotLines] = new ImGui.Vec4(0.61, 0.61, 0.61, 1.00);
    colors[ImGui.Col.PlotLinesHovered] = new ImGui.Vec4(1.00, 0.43, 0.35, 1.00);
    colors[ImGui.Col.PlotHistogram] = new ImGui.Vec4(0.90, 0.70, 0.00, 1.00);
    colors[ImGui.Col.PlotHistogramHovered] = new ImGui.Vec4(1.00, 0.60, 0.00, 1.00);
    colors[ImGui.Col.TextSelectedBg] = new ImGui.Vec4(0.26, 0.59, 0.98, 0.35);
    colors[ImGui.Col.DragDropTarget] = new ImGui.Vec4(1.00, 1.00, 0.00, 0.90);
    colors[ImGui.Col.NavHighlight] = new ImGui.Vec4(0.26, 0.59, 0.98, 1.00);
    colors[ImGui.Col.NavWindowingHighlight] = new ImGui.Vec4(1.00, 1.00, 1.00, 0.70);
    colors[ImGui.Col.NavWindowingDimBg] = new ImGui.Vec4(0.80, 0.80, 0.80, 0.20);
    colors[ImGui.Col.ModalWindowDimBg] = new ImGui.Vec4(0.80, 0.80, 0.80, 0.35);
}