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
        function Player(assetManager, playerNum, inventory, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, assetManager, playerNum == 1 ? "player" : "player") || this;
            _this.timeToAction = 0.5;
            _this.animationState = "Jump";
            _this.fixed_flipOffsetX = 27;
            _this.flipOffsetX = 0;
            _this.fixed_flipOffsetY = 27;
            _this.flipOffsetY = 0;
            _this.playerNum = playerNum;
            _this.hasPassed = false;
            _this.actionObjects = new Array();
            if (playerNum == 1) {
                _this.spriteRenderer = new createjs.Sprite(objects.Game.player1TextureAtlas, "Idle");
                _this.picture = new objects.GameObject(assetManager, "p1");
            }
            else {
                _this.spriteRenderer = new createjs.Sprite(objects.Game.player2TextureAtlas, "Idle");
                _this.picture = new objects.GameObject(assetManager, "p2");
            }
            _this.spriteRenderer.scaleX = 0.1;
            _this.spriteRenderer.scaleY = 0.1;
            _this.Start();
            _this.picture.alpha = 0.5;
            _this.isGravityAffected = true;
            _this.inventory = inventory;
            _this.inventory.player = _this;
            _this.picture.x = inventory.x;
            _this.picture.y = inventory.y;
            _this.time = 0;
            _this.deltaTime = 0;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // Methods / Functions
        Player.prototype.Start = function () {
            this.isJumping = false;
        };
        Player.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            this.Update();
        };
        Player.prototype.Update = function () {
            if (this.hasPassed) {
                if (this.dialog != null) {
                    this.dialog.disposeDialog();
                }
                return;
            }
            this.spriteRenderer.x = this.flipOffsetX + this.x;
            this.spriteRenderer.y = this.flipOffsetY + this.y;
            _super.prototype.Update.call(this);
            this.CheckGrounded(this.CheckCollision);
            if (!this.isGrounded && !this.isJumping) {
                this.DoGravityEffect();
            }
            else if (this.isGrounded) {
                this.maxJumpHeight = this.y - (this.height * Player.maxHightRate) * this.GetGravityFactor();
                this.isJumping = false;
            }
            this.Jump();
            this.Down();
            this.Move();
            this.Action();
            this.CheckBounds();
            this.lastPosition.x = this.x;
            this.lastPosition.y = this.y;
            if (this.dialog != null) {
                this.dialog.dialog.Update(this.x + this.width, this.y - 0.3 * this.halfH);
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.OnColliderEnter = function (penetration, obj) {
            console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));
        };
        Player.prototype.OnColliderExit = function (penetration, obj) {
        };
        Player.prototype.cancelStopEvent = function (e) {
            this.spriteRenderer.stop();
            this.spriteRenderer.off("animationend", this.listener);
            this.animationState = "Waiting";
        };
        Player.prototype.CheckKeyboardPlayerDown = function () {
            return (objects.Game.keyboard.player1MoveDown && this.playerNum == 1) || (objects.Game.keyboard.player2MoveDown && this.playerNum == 2);
        };
        Player.prototype.Down = function () {
            if (this.isGrounded && this.CheckKeyboardPlayerDown()) {
                if (this.CheckDownStairs(this.CheckCollision, false, config.Gravity.gravityForce * this.GetGravityFactor() * this.halfH)) {
                    //this.y += config.Gravity.gravityForce*this.GetGravityFactor()*this.height;
                }
            }
        };
        Player.prototype.CheckKeyboardPlayerJump = function () {
            return (objects.Game.keyboard.player1MoveUp && this.playerNum == 1) || (objects.Game.keyboard.player2MoveUp && this.playerNum == 2);
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (this.CheckKeyboardPlayerJump() && !this.isJumping) {
                    this.isGrounded = false;
                    this.isJumping = true;
                    this.spriteRenderer.gotoAndPlay("Jump");
                    this.animationState = "Jump";
                    this.listener = this.on("animationend", this.cancelStopEvent);
                    //this.y += config.Gravity.gravityForce*this.height;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.GetGravityFactor() * this.height);
                    //this.jump_sound = createjs.Sound.play("ghost_wind");
                }
            }
            else if (this.isJumping) {
                if (this.maxJumpHeight * this.GetGravityFactor() <= this.y * this.GetGravityFactor()) {
                    //going higher
                    //this.y += config.Gravity.gravityForce*this.height/2;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.GetGravityFactor() * this.height / 2);
                }
                else {
                    //console.log('reach high');
                    this.isJumping = false;
                }
            }
        };
        Player.prototype.Move_Vertically = function (up, speed) {
            if (up) {
                if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
                    this.y += speed;
                }
            }
            else {
                if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
                    this.y -= speed;
                }
            }
        };
        Player.prototype.CheckKeyboardPlayerAction = function () {
            return (objects.Game.keyboard.player1Action && this.playerNum == 1) ||
                (objects.Game.keyboard.player2Action && this.playerNum == 2);
        };
        Player.prototype.Action = function () {
            if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
                this.deltaTime += 1 / 60;
                return;
            }
            if (this.animationState != "Idle" && this.animationState != "Run") {
                this.spriteRenderer.gotoAndPlay("Idle");
                this.animationState = "Idle";
            }
            this.deltaTime = 0;
            if (this.CheckKeyboardPlayerAction()) {
                this.spriteRenderer.gotoAndPlay("Action");
                this.animationState = "Action";
                this.listener = this.on("animationend", this.cancelStopEvent);
                var objectAction = this.getCloserObject();
                if (objectAction instanceof objects.InformativePoint) {
                    objectAction.Action();
                    if (!this.inventory.DropItem()) {
                        objectAction.alreadyHandled = false;
                    }
                    this.deltaTime += 1 / 60;
                }
                else if (objectAction == null || objectAction == undefined || !managers.Collision.CheckDistanceDoubled(this, objectAction)) {
                    if (this.inventory.DropItem()) {
                        createjs.Sound.play("wrench_drop").volume = 0.3;
                    }
                    this.deltaTime += 1 / 60;
                }
                else {
                    objectAction.Action();
                    this.deltaTime += 1 / 60;
                }
                this.CheckCollision(this.x, this.y, true);
            }
        };
        Player.prototype.getCloserObject = function () {
            var item = this.actionObjects.pop();
            var closest = 100;
            var closest_item = item;
            while (item) {
                if (item instanceof objects.Key) {
                    //forcing being the first to have an action
                    closest_item = item;
                    closest = -1;
                }
                else if (item instanceof objects.PushableObject) {
                    closest_item = item;
                    closest = -1;
                }
                else if (closest > -1 && item instanceof objects.Door) {
                    closest_item = item;
                    closest = -1;
                }
                var d = managers.Collision.GetDistance(this, item);
                if (d < closest) {
                    closest = d;
                    closest_item = item;
                }
                item = this.actionObjects.pop();
            }
            return closest_item;
        };
        Player.prototype.CheckKeyboardPlayerMoveLeft = function () {
            return (objects.Game.keyboard.player1MoveLeft && this.playerNum == 1) ||
                (objects.Game.keyboard.player2MoveLeft && this.playerNum == 2);
        };
        Player.prototype.CheckKeyboardPlayerMoveRight = function () {
            return (objects.Game.keyboard.player1MoveRight && this.playerNum == 1) ||
                (objects.Game.keyboard.player2MoveRight && this.playerNum == 2);
        };
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX;
            var isMovement = false;
            if (this.CheckKeyboardPlayerMoveLeft()) {
                if (this.CheckMovement(this.CheckCollision, true, Player.speed)) {
                    //this.scaleX *=-1;          
                    this.x -= Player.speed;
                    isMovement = true;
                }
                if (!this.isLeft) {
                    this.FlipHorizontally();
                }
            }
            if (this.CheckKeyboardPlayerMoveRight()) {
                if (this.CheckMovement(this.CheckCollision, false, Player.speed)) {
                    this.x += Player.speed;
                    isMovement = true;
                }
                if (this.isLeft) {
                    this.FlipHorizontally();
                }
            }
            if (this.isGrounded) {
                if (isMovement) {
                    if (this.animationState != "Run" && this.animationState != "Action") {
                        this.spriteRenderer.gotoAndPlay("Run");
                        this.animationState = "Run";
                    }
                }
                else {
                    if (this.animationState != "Idle" && this.animationState != "Action") {
                        this.spriteRenderer.gotoAndPlay("Idle");
                        this.animationState = "Idle";
                    }
                }
            }
        };
        Player.prototype.CheckGrounded = function (Check) {
            var md = Check(this.x, this.y - config.Gravity.gravitySpeed * this.GetGravityFactor(), true);
            if ((md.isCollided && (md.objectCollided instanceof objects.Door
                || md.objectCollided instanceof objects.HandableObject
                || md.objectCollided instanceof objects.ActionableObject
                || md.objectCollided instanceof objects.InformativePoint
                || md.objectCollided instanceof objects.Hatch))) {
                this.isGrounded = false;
                return;
            }
            //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            this.isGrounded = md.isCollided; // && (md.closestPointOnBoundsToPoint(math.Vec2.zero).y*this.GetGravityFactor() > 0);
        };
        Player.prototype.CheckMovement = function (Check, isLeftMovement, speed) {
            var md = Check(this.x + (isLeftMovement ? 0 - speed : speed), this.y, true);
            if (md.objectCollided instanceof objects.OpenableObject
                || md.objectCollided instanceof objects.HandableObject
                || md.objectCollided instanceof objects.ActionableObject
                || md.objectCollided instanceof objects.Hatch
                || md.objectCollided instanceof objects.InformativePoint
                || md.objectCollided instanceof objects.Stair) {
                return true;
            }
            return !md.isCollided; // && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
        };
        Player.prototype.CheckDownStairs = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? speed : 0 - speed), true);
            if (md.isCollided && md.objectCollided instanceof objects.Stair) {
                return true;
            }
            return false;
        };
        Player.prototype.CheckVerticalMovement = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? speed : 0 - speed), true);
            //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            if (md.isCollided && (md.objectCollided instanceof objects.Door
                || md.objectCollided instanceof objects.OpenableObject
                || md.objectCollided instanceof objects.HandableObject
                || md.objectCollided instanceof objects.ActionableObject
                || md.objectCollided instanceof objects.Hatch
                || md.objectCollided instanceof objects.InformativePoint
                || md.objectCollided instanceof objects.Stair)) {
                return true;
            }
            this.isJumping = !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
            return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
            //&& (md.closestPointOnBoundsToPoint(math.Vec2.zero).y > 0 || md.closestPointOnBoundsToPoint(math.Vec2.zero).y < 0));
        };
        Player.prototype.CheckBounds = function () {
            // hardcoding the play area for now
            /*if (this.x >= 837.5){
              this.x = 837.5;
            }
      
            if (this.x <= 235.5){
              this.x = 235.5;
            }*/
        };
        Player.speed = 5;
        Player.maxHightRate = 0.9; //the player can jump at highest 90% of the height
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map