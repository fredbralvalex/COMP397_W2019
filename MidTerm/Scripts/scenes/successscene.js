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
    var SuccessScene = /** @class */ (function (_super) {
        __extends(SuccessScene, _super);
        function SuccessScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.backgroundMusic = createjs.Sound.play("menu_music");
            _this.backgroundMusic.loop = -1; // Looping forever
            _this.backgroundMusic.volume = 0.2;
            _this.Start();
            return _this;
        }
        SuccessScene.prototype.Start = function () {
            console.log("End Game...");
            this.playAgain = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.5, true);
            this.playAgain.scaleX = 0.75;
            this.txtPlayAgain = new objects.Label("PLAY AGAIN", "20px", "Cambay", "#ff0000", this.playAgain.x, this.playAgain.y + 2, true);
            this.startScene = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.5 + 60, true);
            this.startScene.scaleX = 0.75;
            this.txtStartScene = new objects.Label("MENU", "20px", "Cambay", "#ff0000", this.startScene.x, this.startScene.y + 2, true);
            this.gameTitle = new objects.Label("AMAZING!", "bold 48px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 4, true);
            this.gameTitle.alpha = 1;
            this.gameTitleShadow = new objects.Label("AMAZING!", "bold 48px", "Cambay", "#828166", (objects.Game.width / 2) + 4, objects.Game.height / 4, true);
            this.gameTitleShadow.alpha = 0.75;
            this.gameSubtitle = new objects.Label("Thanks for Playing!", "bold 42px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 3, true);
            this.gameSubtitle.alpha = 1;
            this.gameSubtitleShadow = new objects.Label("Thanks for Playing!", "bold 42px", "Cambay", "#828166", (objects.Game.width / 2) + 4, objects.Game.height / 3, true);
            this.gameSubtitleShadow.alpha = 0.75;
            this.Main();
        };
        SuccessScene.prototype.Main = function () {
            var _this = this;
            this.InitializeLevel();
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);
            this.addChild(this.gameSubtitleShadow);
            this.addChild(this.gameSubtitle);
            this.addChild(this.playAgain);
            this.addChild(this.txtPlayAgain);
            this.addChild(this.startScene);
            this.addChild(this.txtStartScene);
            this.playAgain.on("click", function () {
                _this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.INGAME;
            });
            this.startScene.on("click", function () {
                _this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.START;
            });
        };
        SuccessScene.prototype.InitializeLevel = function () {
            var _this = this;
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, false);
            tiles.forEach(function (tile) {
                _this.addChild(tile);
            });
        };
        return SuccessScene;
    }(objects.Scene));
    scenes.SuccessScene = SuccessScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=successscene.js.map