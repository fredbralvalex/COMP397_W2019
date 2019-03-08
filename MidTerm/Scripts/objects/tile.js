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
var objects;
(function (objects) {
    var Tile = /** @class */ (function (_super) {
        __extends(Tile, _super);
        // Constructor
        function Tile(assetManager, start, end, walkable, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            var _this = _super.call(this, assetManager, start ? "start" : end ? "end" : walkable ? "path" : "wall") || this;
            _this.walkable = walkable;
            _this.width = width;
            _this.height = height;
            _this.startTile = start;
            _this.endTile = end;
            _this.Init();
            return _this;
        }
        Tile.prototype.toString = function () {
            return "{ w:" + this.walkable +
                (this.startTile ? ", s:true" : "") +
                (this.endTile ? ", e:true" : "") +
                " }";
        };
        Tile.prototype.GetWidthBounds = function () {
            return this.width;
        };
        Tile.prototype.GetHeightBounds = function () {
            return this.height;
        };
        Tile.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        return Tile;
    }(objects.EmptyGameObject));
    objects.Tile = Tile;
})(objects || (objects = {}));
//# sourceMappingURL=tile.js.map