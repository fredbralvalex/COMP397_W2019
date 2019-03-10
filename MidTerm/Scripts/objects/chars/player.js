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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // Constructor
        function Player(assetManager) {
            var _this = _super.call(this, assetManager, "char_down") || this;
            _this.upImage = assetManager.getResult("char_up");
            _this.downImage = assetManager.getResult("char_down");
            _this.leftImage = assetManager.getResult("char_left");
            _this.rightImage = assetManager.getResult("char_right");
            _this.Start();
            return _this;
        }
        // Methods / Functions
        Player.prototype.Start = function () {
            this.x = 400;
            this.y = 45;
        };
        Player.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            this.Update();
        };
        Player.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.Move();
            this.CheckBounds();
            this.lastPosition.x = this.x;
            this.lastPosition.y = this.y;
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Move_Vertically = function (up, speed) {
            if (up) {
                if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
                    this.image = this.upImage;
                    this.y += speed;
                }
            }
            else {
                if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
                    this.image = this.downImage;
                    this.y -= speed;
                }
            }
        };
        Player.prototype.Move = function () {
            if (objects.Game.keyboard.moveLeft) {
                if (this.CheckMovement(this.CheckCollision, true, Player.speed)) {
                    this.x -= Player.speed;
                }
                this.image = this.leftImage;
            }
            if (objects.Game.keyboard.moveRight) {
                if (this.CheckMovement(this.CheckCollision, false, Player.speed)) {
                    this.x += Player.speed;
                }
                this.image = this.rightImage;
            }
            if (objects.Game.keyboard.moveUp) {
                if (this.CheckVerticalMovement(this.CheckCollision, true, Player.speed)) {
                    this.y -= Player.speed;
                }
                this.image = this.upImage;
            }
            if (objects.Game.keyboard.moveDown) {
                if (this.CheckVerticalMovement(this.CheckCollision, false, Player.speed)) {
                    this.y += Player.speed;
                }
                this.image = this.downImage;
            }
        };
        Player.prototype.CheckMovement = function (Check, isLeftMovement, speed) {
            var md = Check(this.x + (isLeftMovement ? 0 - speed : speed), this.y);
            return !md.isCollided;
        };
        Player.prototype.CheckVerticalMovement = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? 0 - speed : speed));
            return !md.isCollided;
        };
        Player.prototype.CheckBounds = function () {
        };
        //check if the tile is next to the player in order to check collision
        Player.prototype.TileBoundsNextTo = function (tile) {
            return (tile.x < (this.x + this.width) + tile.width || tile.x > this.x - tile.width)
                && (tile.y < (this.y + this.height) + tile.height || tile.y > this.y - tile.height);
        };
        // Variables
        Player.speed = 5;
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map