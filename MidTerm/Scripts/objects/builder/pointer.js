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
    var Pointer = /** @class */ (function (_super) {
        __extends(Pointer, _super);
        function Pointer(assetManager, borderSize) {
            var _this = _super.call(this, assetManager, "path") || this;
            //this.regX = this.halfW;
            //this.regY = this.halfH;
            _this.type = 0;
            _this.borderSize = borderSize;
            _this.walkableImage = assetManager.getResult("path");
            _this.notwalkable = assetManager.getResult("wall");
            _this.start = assetManager.getResult("start");
            _this.end = assetManager.getResult("end");
            return _this;
        }
        Pointer.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if ((objects.Game.stage.mouseX > 0 + this.borderSize + this.halfW
                && objects.Game.stage.mouseX < objects.Game.width - (this.borderSize + this.width))) {
                this.x = objects.Game.stage.mouseX - this.halfW;
            }
            if ((objects.Game.stage.mouseY > 0 + this.borderSize + this.halfW
                && objects.Game.stage.mouseY < objects.Game.height - (this.borderSize + this.halfH))) {
                this.y = objects.Game.stage.mouseY - this.halfH;
            }
        };
        Pointer.prototype.isWalkable = function () {
            return this.type == 0 || this.isStart() || this.isEnd();
        };
        Pointer.prototype.isStart = function () {
            return this.type == 2;
        };
        Pointer.prototype.isEnd = function () {
            return this.type == 3;
        };
        Pointer.prototype.ChangePointer = function () {
            switch (this.type) {
                case 0:
                    this.type = 1;
                    this.image = this.notwalkable;
                    break;
                case 1:
                    this.type = 2;
                    this.image = this.start;
                    break;
                case 2:
                    this.type = 3;
                    this.image = this.end;
                    break;
                case 3:
                    this.type = 0;
                    this.image = this.walkableImage;
                    break;
                default:
                    this.type = 0;
                    this.image = this.walkableImage;
                    break;
            }
        };
        return Pointer;
    }(objects.GameObject));
    objects.Pointer = Pointer;
})(objects || (objects = {}));
//# sourceMappingURL=pointer.js.map