var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["INGAME"] = 1] = "INGAME";
        Scene[Scene["FINISH"] = 2] = "FINISH";
        Scene[Scene["GAMEOVER"] = 3] = "GAMEOVER";
        Scene[Scene["BUILDER"] = 4] = "BUILDER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
//# sourceMappingURL=scene.js.map