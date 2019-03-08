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
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        function GameScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.backgroundMusic = createjs.Sound.play("play_music");
            _this.backgroundMusic.loop = -1; // Looping forever
            _this.backgroundMusic.volume = 0.2;
            _this.Start();
            return _this;
        }
        GameScene.prototype.Start = function () {
            objects.Game.isDebug = false;
            this.isPaused = false;
            objects.Game.keyboard = new managers.Keyboard();
            console.log("GAME SCENE(S)...");
            this.title = new objects.Label("Find an a maze ing way out!", "bold 48px", "Cambay", "#960000", (objects.Game.width / 2), objects.Game.height / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Find an a maze ing way out!", "bold 48px", "Cambay", "#843e3e", (objects.Game.width / 2) + 2, objects.Game.height / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(2, 2, this.player.x, this.player.y, this.player.width - 4, this.player.height - 4);
            this.InitializeLevel();
            this.Main();
        };
        GameScene.prototype.InitializeLevel = function () {
            var _this = this;
            this.tiles = new Array();
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, true);
            tiles.forEach(function (tile) {
                if (!tile.walkable || tile.endTile) {
                    _this.tiles.push(tile);
                }
                if (tile.startTile) {
                    _this.player.x = tile.x;
                    _this.player.y = tile.y;
                }
                _this.addChild(tile);
            });
        };
        GameScene.prototype.CreateFunctionCheck = function (gameObject) {
            var _this = this;
            var boxCollider = gameObject.boxCollider;
            return function (x, y) {
                var collided = false;
                var aabbCollider = boxCollider.GetAABB(x, y);
                var result;
                for (var i = 0; i < _this.tiles.length; i++) {
                    var tile = _this.tiles[i];
                    if (_this.player.TileBoundsNextTo(tile) && (!tile.walkable || tile.endTile)) {
                        result = managers.Collision.CheckAABBCollision(aabbCollider, tile.boxCollider.aabb);
                        if (result.CheckCollided()) {
                            collided = true;
                            break;
                        }
                    }
                }
                if (collided && tile.endTile) {
                    console.log("end game");
                    _this.backgroundMusic.stop();
                    objects.Game.currentScene = config.Scene.FINISH;
                }
                return result;
            };
        };
        GameScene.prototype.Main = function () {
            var _this = this;
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            this.addChild(this.player);
            //create the empties gameobjects to be the stage boundaries
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);
        };
        GameScene.prototype.Update = function () {
            this.CheckPaused();
            if (this.isPaused) {
                return;
            }
            var CheckMovement = this.CreateFunctionCheck(this.player);
            this.player.UpdateIfPossible(CheckMovement);
            for (var i = 0; i < this.tiles.length; i++) {
                var tile = this.tiles[i];
                tile.Update();
            }
        };
        return GameScene;
    }(objects.Scene));
    scenes.GameScene = GameScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=gamescene.js.map