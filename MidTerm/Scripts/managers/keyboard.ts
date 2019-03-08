module managers {
    export class Keyboard {
        public moveUp: boolean;
        public moveLeft: boolean;
        public moveRight: boolean;
        public moveDown: boolean;
        public enabled: boolean;
        public pause: boolean;

        // Constructor
        constructor() {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }

        // Methods
        public onKeyDown(event:KeyboardEvent):void {
            switch(event.keyCode) {
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
        }

        public onKeyUp(event:KeyboardEvent):void {
            switch(event.keyCode) {
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
        }
    }
}