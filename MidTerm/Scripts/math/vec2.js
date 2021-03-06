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
var math;
(function (math) {
    var Vec2 = /** @class */ (function (_super) {
        __extends(Vec2, _super);
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        // Methods
        Vec2.Distance = function (P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        };
        Vec2.Difference = function (P1, P2) {
            return new math.Vec2(P2.x - P1.x, P2.y - P1.y);
        };
        Vec2.Sum = function (P1, P2) {
            return new math.Vec2(P2.x + P1.x, P2.y + P1.y);
        };
        Vec2.Divide = function (P, d) {
            return new math.Vec2(P.x / d, P.y / d);
        };
        Vec2.Print = function (P) {
            return "x: " + P.x + " y: " + P.y;
        };
        Vec2.zero = new Vec2(0, 0);
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
//# sourceMappingURL=vec2.js.map