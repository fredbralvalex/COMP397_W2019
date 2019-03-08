var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // Constructor
        function Keyboard() {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }
        // Methods
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                    this.moveUp = true;
                    break;
                case config.Keys.A:
                    this.moveLeft = true;
                    break;
                case config.Keys.S:
                    this.moveDown = true;
                    break;
                case config.Keys.D:
                    this.moveRight = true;
                    break;
                case config.Keys.ESCAPE:
                    console.log("Pause!!");
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                    this.moveUp = false;
                    break;
                case config.Keys.A:
                    this.moveLeft = false;
                    break;
                case config.Keys.S:
                    this.moveDown = false;
                    break;
                case config.Keys.D:
                    this.moveRight = false;
                    break;
                case config.Keys.ESCAPE:
                    //  this.pause = false;
                    this.pause = !this.pause;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map