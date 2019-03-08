var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.backgroundMusic = createjs.Sound.play("menu_music");
            _this.backgroundMusic.loop = -1; // Looping forever
            _this.backgroundMusic.volume = 0.2;
            _this.Start();
            return _this;
        }
        StartScene.prototype.Start = function () {
            console.log("Main Menu/Start Menu...");
            this.startButton = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.6, true);
            this.startButton.scaleX = 0.75;
            this.txtStartButton = new objects.Label("PLAY", "20px", "Cambay", "#ff0000", this.startButton.x, this.startButton.y + 2, true);
            this.buildButton = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.6 + 60, true);
            this.buildButton.scaleX = 0.75;
            this.txtBuildButton = new objects.Label("BUILD LEVEL", "20px", "Cambay", "#ff0000", this.buildButton.x, this.buildButton.y + 2, true);
            this.gameTitle = new objects.Label("A - MAZE - ING!", "bold 64px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 4, true);
            this.gameTitle.alpha = 1;
            this.gameTitleShadow = new objects.Label("A - MAZE - ING!", "bold 64px", "Cambay", "#828166", (objects.Game.width / 2) + 4, objects.Game.height / 4, true);
            this.gameTitleShadow.alpha = 0.75;
            this.gameDeveloper = new objects.Label("Frederico Alexandre", "bold 32px", "Cambay", "#960000", objects.Game.width / 2, (objects.Game.height / 2.2), true);
            this.gameDeveloper.alpha = 1;
            this.subTitle = new objects.Label("And I really thought this name would be original!", "bold 24px", "Cambay", "#960000", objects.Game.width / 2, (objects.Game.height / 3), true);
            this.subTitle.alpha = 1;
            this.Main();
        };
        StartScene.prototype.Main = function () {
            var _this = this;
            this.InitializeLevel();
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);
            this.addChild(this.startButton);
            this.addChild(this.txtStartButton);
            this.addChild(this.buildButton);
            this.addChild(this.subTitle);
            this.addChild(this.txtBuildButton);
            this.addChild(this.gameDeveloper);
            this.startButton.on("click", function () {
                _this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.INGAME;
            });
            this.buildButton.on("click", function () {
                _this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.BUILDER;
            });
        };
        StartScene.prototype.InitializeLevel = function () {
            var _this = this;
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, false);
            tiles.forEach(function (tile) {
                _this.addChild(tile);
            });
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=startscene.js.map