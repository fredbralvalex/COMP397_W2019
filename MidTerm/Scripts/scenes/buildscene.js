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
    var BuildScene = /** @class */ (function (_super) {
        __extends(BuildScene, _super);
        function BuildScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        BuildScene.prototype.Start = function () {
            objects.Game.isDebug = true;
            this.isPaused = false;
            objects.Game.keyboard = new managers.Keyboard();
            console.log("GAME SCENE(S)...");
            this.title = new objects.Label("Build a map!", "bold 48px", "Cambay", "#960000", (objects.Game.width / 2), objects.Game.height / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Build a map!", "bold 48px", "Cambay", "#843e3e", (objects.Game.width / 2) + 2, objects.Game.height / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.drawTypeButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.2, objects.Game.height * 0.97, true);
            this.drawTypeButton.scaleX = 0.75;
            this.txtType = new objects.Label("Type", "20px", "Cambay", "#960000", this.drawTypeButton.x, this.drawTypeButton.y + 2, true);
            this.txtType.alpha = 1;
            this.printMapButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.4, objects.Game.height * 0.97, true);
            this.printMapButton.scaleX = 0.75;
            this.txtPrint = new objects.Label("Print Map", "20px", "Cambay", "#960000", this.printMapButton.x, this.printMapButton.y + 2, true);
            this.txtPrint.alpha = 1;
            this.playButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.6, objects.Game.height * 0.97, true);
            this.playButton.scaleX = 0.75;
            this.txtBack = new objects.Label("Play", "20px", "Cambay", "#960000", this.playButton.x, this.playButton.y + 2, true);
            this.txtBack.alpha = 1;
            this.cancelButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.8, objects.Game.height * 0.97, true);
            this.cancelButton.scaleX = 0.75;
            this.txtCancel = new objects.Label("Cancel", "20px", "Cambay", "#960000", this.cancelButton.x, this.cancelButton.y + 2, true);
            this.txtCancel.alpha = 1;
            this.pointer = new objects.Pointer(this.assetManager, managers.LevelBuilder.h);
            this.InitializeLevel();
            this.Main();
        };
        BuildScene.prototype.InitializeLevel = function () {
            var _this = this;
            this.tiles = managers.LevelBuilder.CreateLevel(this.assetManager, true);
            this.tiles.forEach(function (tile) {
                tile.on("mousedown", function () {
                    if (_this.CanEdit(tile)) {
                        if ((!_this.pointer.isStart() && !_this.pointer.isEnd()) &&
                            (tile.startTile || tile.endTile)) {
                            //cant erase an end point or a start point
                            return;
                        }
                        // can only be one start and one end
                        if (_this.pointer.isEnd()) {
                            if (tile.startTile) {
                                var et = _this.endTile;
                                et.startTile = true;
                                et.endTile = false;
                                et.image = _this.pointer.start;
                                tile.walkable = true;
                                _this.startTile = et;
                                tile.startTile = false;
                                tile.endTile = true;
                                tile.image = _this.pointer.image;
                                tile.walkable = _this.pointer.isWalkable();
                                _this.endTile = tile;
                            }
                            else {
                                var et = _this.endTile;
                                et.startTile = false;
                                et.endTile = false;
                                et.image = _this.pointer.walkableImage;
                                _this.endTile = tile;
                            }
                        }
                        else if (_this.pointer.isStart()) {
                            if (tile.endTile) {
                                var st = _this.startTile;
                                st.endTile = true;
                                st.startTile = false;
                                st.image = _this.pointer.end;
                                tile.walkable = true;
                                _this.endTile = st;
                                tile.endTile = false;
                                tile.startTile = true;
                                tile.image = _this.pointer.image;
                                tile.walkable = _this.pointer.isWalkable();
                                _this.startTile = tile;
                            }
                            else {
                                var st = _this.startTile;
                                st.endTile = false;
                                st.startTile = false;
                                st.image = _this.pointer.walkableImage;
                                _this.startTile = tile;
                            }
                        }
                        tile.endTile = _this.pointer.isEnd();
                        tile.startTile = _this.pointer.isStart();
                        tile.walkable = _this.pointer.isWalkable();
                        tile.image = _this.pointer.image;
                    }
                });
                if (tile.startTile) {
                    _this.startTile = tile;
                }
                else if (tile.endTile) {
                    _this.endTile = tile;
                }
                _this.addChild(tile);
            });
        };
        BuildScene.prototype.CanEdit = function (tile) {
            return ((tile.x > 0 && tile.x < objects.Game.width - tile.width - tile.halfW)
                && (tile.y > 0 && tile.y < objects.Game.height - tile.height));
        };
        BuildScene.prototype.Main = function () {
            var _this = this;
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            this.addChild(this.drawTypeButton);
            this.addChild(this.printMapButton);
            this.addChild(this.playButton);
            this.addChild(this.cancelButton);
            this.addChild(this.txtPrint);
            this.addChild(this.txtType);
            this.addChild(this.txtBack);
            this.addChild(this.txtCancel);
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);
            this.addChild(this.pointer);
            this.playButton.on("click", function () {
                var row = new Array();
                var level = new Array();
                var i = 0;
                var j = 0;
                _this.tiles.forEach(function (tile) {
                    i++;
                    if (i == managers.LevelBuilder.level[0].length) {
                        console.log(i);
                        j++;
                        i = 0;
                        row.push({ w: tile.walkable, e: tile.endTile, s: tile.startTile });
                        level.push(row);
                        row = new Array();
                    }
                    else {
                        row.push({ w: tile.walkable, e: tile.endTile, s: tile.startTile });
                    }
                });
                console.log(j);
                managers.LevelBuilder.level = level;
                objects.Game.currentScene = config.Scene.INGAME;
            });
            this.drawTypeButton.on("click", function () { _this.pointer.ChangePointer(); });
            this.cancelButton.on("click", function () { objects.Game.currentScene = config.Scene.START; });
            this.printMapButton.on("click", function () {
                var mapString = "";
                var i = 0;
                var j = 0;
                _this.tiles.forEach(function (tile) {
                    i++;
                    if (i == 1) {
                        mapString += "[";
                    }
                    if (i == managers.LevelBuilder.level[0].length) {
                        console.log(i);
                        j++;
                        i = 0;
                        mapString += tile.toString() + "]," + '\n';
                    }
                    else {
                        mapString += tile.toString();
                        mapString += ",";
                    }
                });
                console.log(j);
                mapString += "";
                console.log(mapString);
            });
        };
        BuildScene.prototype.Update = function () {
            for (var i = 0; i < this.tiles.length; i++) {
                var tile = this.tiles[i];
                tile.Update();
            }
            this.pointer.Update();
        };
        return BuildScene;
    }(objects.Scene));
    scenes.BuildScene = BuildScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=buildscene.js.map