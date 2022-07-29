// style.c.js

ImGui.StyleColorsDark = function()
{
    let colors = ImGui.GetStyle().Colors;

    ImGui.GetStyle().WindowPadding = new ImGui.ImVec2(5, 5);
    ImGui.GetStyle().FramePadding = new ImGui.ImVec2(5, 5);
    ImGui.GetStyle().ItemSpacing = new ImGui.ImVec2(5, 5);
    ImGui.GetStyle().ItemInnerSpacing = new ImGui.ImVec2(2, 2);
    ImGui.GetStyle().TouchExtraPadding = new ImGui.ImVec2(0, 0);
    ImGui.GetStyle().IndentSpacing = 0;
    ImGui.GetStyle().ScrollbarSize = 10;
    ImGui.GetStyle().GrabMinSize = 10;

    ImGui.GetStyle().WindowBorderSize = 1;
    ImGui.GetStyle().ChildBorderSize = 1;
    ImGui.GetStyle().PopupBorderSize = 1;
    ImGui.GetStyle().FrameBorderSize = 1;
    ImGui.GetStyle().TabBorderSize = 1;

    ImGui.GetStyle().WindowRounding = 5;
    ImGui.GetStyle().ChildRounding = 5;
    ImGui.GetStyle().FrameRounding = 5;
    ImGui.GetStyle().PopupRounding = 5;
    ImGui.GetStyle().ScrollbarRounding = 5;
    ImGui.GetStyle().GrabRounding = 5;
    ImGui.GetStyle().TabRounding = 5;

    ImGui.GetStyle().WindowTitleAlign.x = 0.5;
    ImGui.GetStyle().WindowTitleAlign.y = 0.5;
    ImGui.GetStyle().ButtonTextAlign.x = 0.5;
    ImGui.GetStyle().ButtonTextAlign.y = 0.5;
    ImGui.GetStyle().SelectableTextAlign.x = 0.5;
    ImGui.GetStyle().SelectableTextAlign.y = 0.5;
    ImGui.GetStyle().WindowPadding.x = 5;
    ImGui.GetStyle().WindowPadding.y = 5;
    ImGui.GetStyle().FramePadding.x = 5;
    ImGui.GetStyle().FramePadding.y = 5;
    ImGui.GetStyle().ItemSpacing.x = 5;
    ImGui.GetStyle().ItemSpacing.y = 5;
    ImGui.GetStyle().ItemSpacing.x = 2;
    ImGui.GetStyle().ItemSpacing.y = 2;
    ImGui.GetStyle().TouchExtraPadding.x = 0;
    ImGui.GetStyle().TouchExtraPadding.y = 0;

    colors[ImGui.Col.Text] = new ImGui.Vec4(1.00, 1.00, 1.00, 1.00);
    colors[ImGui.Col.TextDisabled] = new ImGui.Vec4(0.50, 0.50, 0.50, 1.00);
    colors[ImGui.Col.WindowBg] = new ImGui.Vec4(0.07, 0.07, 0.07, 1.00);
    colors[ImGui.Col.ChildBg] = new ImGui.Vec4(0.07, 0.07, 0.07, 1.00);
    colors[ImGui.Col.PopupBg] = new ImGui.Vec4(0.07, 0.07, 0.07, 1.00);
    colors[ImGui.Col.Border] = new ImGui.Vec4(0.25, 0.25, 0.26, 0.54);
    colors[ImGui.Col.BorderShadow] = new ImGui.Vec4(0.00, 0.00, 0.00, 0.00);
    colors[ImGui.Col.FrameBg] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.FrameBgHovered] = new ImGui.Vec4(0.25, 0.25, 0.26, 1.00);
    colors[ImGui.Col.FrameBgActive] = new ImGui.Vec4(0.25, 0.25, 0.26, 1.00);
    colors[ImGui.Col.TitleBg] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.TitleBgActive] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.TitleBgCollapsed] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.MenuBarBg] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.ScrollbarBg] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.ScrollbarGrab] = new ImGui.Vec4(0.00, 0.00, 0.00, 1.00);
    colors[ImGui.Col.ScrollbarGrabHovered] = new ImGui.Vec4(0.41, 0.41, 0.41, 1.00);
    colors[ImGui.Col.ScrollbarGrabActive] = new ImGui.Vec4(0.51, 0.51, 0.51, 1.00);
    colors[ImGui.Col.CheckMark] = new ImGui.Vec4(1.00, 1.00, 1.00, 1.00);
    colors[ImGui.Col.SliderGrab] = new ImGui.Vec4(0.21, 0.20, 0.20, 1.00);
    colors[ImGui.Col.SliderGrabActive] = new ImGui.Vec4(0.21, 0.20, 0.20, 1.00);
    colors[ImGui.Col.Button] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.ButtonHovered] = new ImGui.Vec4(0.21, 0.20, 0.20, 1.00);
    colors[ImGui.Col.ButtonActive] = new ImGui.Vec4(0.41, 0.41, 0.41, 1.00);
    colors[ImGui.Col.Header] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.HeaderHovered] = new ImGui.Vec4(0.20, 0.20, 0.20, 1.00);
    colors[ImGui.Col.HeaderActive] = new ImGui.Vec4(0.47, 0.47, 0.47, 1.00);
    colors[ImGui.Col.Separator] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.SeparatorHovered] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.SeparatorActive] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.ResizeGrip] = new ImGui.Vec4(1.00, 1.00, 1.00, 0.25);
    colors[ImGui.Col.ResizeGripHovered] = new ImGui.Vec4(1.00, 1.00, 1.00, 0.67);
    colors[ImGui.Col.ResizeGripActive] = new ImGui.Vec4(1.00, 1.00, 1.00, 0.95);
    colors[ImGui.Col.Tab] = new ImGui.Vec4(0.12, 0.12, 0.12, 1.00);
    colors[ImGui.Col.TabHovered] = new ImGui.Vec4(0.28, 0.28, 0.28, 1.00);
    colors[ImGui.Col.TabActive] = new ImGui.Vec4(0.30, 0.30, 0.30, 1.00);
    colors[ImGui.Col.TabUnfocused] = new ImGui.Vec4(0.07, 0.10, 0.15, 0.97);
    colors[ImGui.Col.TabUnfocusedActive] = new ImGui.Vec4(0.14, 0.26, 0.42, 1.00);
    colors[ImGui.Col.PlotLines] = new ImGui.Vec4(0.61, 0.61, 0.61, 1.00);
    colors[ImGui.Col.PlotLinesHovered] = new ImGui.Vec4(1.00, 0.43, 0.35, 1.00);
    colors[ImGui.Col.PlotHistogram] = new ImGui.Vec4(0.90, 0.70, 0.00, 1.00);
    colors[ImGui.Col.PlotHistogramHovered] = new ImGui.Vec4(1.00, 0.60, 0.00, 1.00);
    colors[ImGui.Col.TextSelectedBg] = new ImGui.Vec4(1.00, 0.00, 0.00, 0.35);
    colors[ImGui.Col.DragDropTarget] = new ImGui.Vec4(1.00, 1.00, 0.00, 0.90);
    colors[ImGui.Col.NavHighlight] = new ImGui.Vec4(0.26, 0.59, 0.98, 1.00);
    colors[ImGui.Col.NavWindowingHighlight] = new ImGui.Vec4(1.00, 1.00, 1.00, 0.70);
    colors[ImGui.Col.NavWindowingDimBg] = new ImGui.Vec4(0.80, 0.80, 0.80, 0.20);
    colors[ImGui.Col.ModalWindowDimBg] = new ImGui.Vec4(0.00, 0.00, 0.00, 0.70);
}