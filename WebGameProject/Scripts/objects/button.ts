module objects {//module = namespace
    export class Button extends  createjs.Bitmap {//export = public
        //Variables
        //Constructor
        constructor (imagePath:string, 
            x:number = 0,
            y:number = 0) {
            super(imagePath);
            this.x = x;
            this.y = y;

            //Setup event handlers
            this.on("mouseover", this.mouseOver);
            this.on("mouseout", this.mouseOut);
        }
        //Methods

        private mouseOver():void {
            this.alpha = 0.7;
        }

        private mouseOut():void {
            this.alpha = 1;
        }
    }
}

S - UI - format the time
S - Inventory (side)
S - pre-stageOne (Story)

C - Players - Animation
C - Players - Add the second player

A - Colliders in the enemy (Dying)

M - Sounds (update document)

F - Score system / completition status / Star (plus Stats) - treasures
F - Game - Finding the key (go to inventory)
F - Event - open the door

L - Pop Up
L - Instructions(buttons) - First scene/ pause

N - Update Document
