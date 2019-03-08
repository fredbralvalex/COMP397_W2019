var managers;
(function (managers) {
    var LevelBuilder = /** @class */ (function () {
        function LevelBuilder() {
        }
        LevelBuilder.CreateLevel = function (assetManager, isGame) {
            var _this = this;
            if (isGame === void 0) { isGame = false; }
            var gameTiles = new Array();
            var x = 0;
            var y = 0;
            var tiles;
            if (isGame) {
                tiles = this.level;
            }
            else {
                tiles = this.backgroundGame;
            }
            tiles.forEach(function (row) {
                row.forEach(function (item) {
                    var tile = new objects.Tile(assetManager, item.s !== undefined && item.s, item.e !== undefined && item.e, item.w, _this.w, _this.h);
                    gameTiles.push(tile);
                    tile.x = x;
                    tile.y = y;
                    x += _this.w;
                });
                x = 0;
                y += _this.h;
            });
            return gameTiles;
        };
        LevelBuilder.w = 40;
        LevelBuilder.h = 40;
        LevelBuilder.backgroundGame = [
            [{ w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true, e: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true, s: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }]
        ];
        LevelBuilder.level = [
            [{ w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true, e: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: false }],
            [{ w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: true }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: true }, { w: false }, { w: true }, { w: false }, { w: false }, { w: false }, { w: true }, { w: true }, { w: false }, { w: false }],
            [{ w: false }, { w: true, s: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: true }, { w: true }, { w: true }, { w: true }, { w: false }, { w: true }, { w: false }],
            [{ w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }, { w: false }]
        ];
        return LevelBuilder;
    }());
    managers.LevelBuilder = LevelBuilder;
})(managers || (managers = {}));
//# sourceMappingURL=builder.js.map