module objects
{
    export class Pointer extends objects.GameObject
    {

        public walkableImage: any;
        public notwalkable: any;
        public start: any;
        public end: any;

        borderSize:number;
        private type: number;

        constructor(assetManager: createjs.LoadQueue, borderSize:number)
        {
            super(assetManager, "path");
            //this.regX = this.halfW;
            //this.regY = this.halfH;
            this.type = 0;
            this.borderSize = borderSize;

            this.walkableImage = assetManager.getResult("path");
            this.notwalkable = assetManager.getResult("wall");
            this.start = assetManager.getResult("start");
            this.end = assetManager.getResult("end");                        
        }       

        public Update ():void  {
            super.Update();
            if ((objects.Game.stage.mouseX > 0 + this.borderSize + this.halfW 
                && objects.Game.stage.mouseX <  objects.Game.width - (this.borderSize + this.width))) {
                this.x = objects.Game.stage.mouseX - this.halfW;

            }
            if ((objects.Game.stage.mouseY > 0 + this.borderSize  + this.halfW
                && objects.Game.stage.mouseY <  objects.Game.height - (this.borderSize + this.halfH))) {
                this.y = objects.Game.stage.mouseY - this.halfH;

            }
        }

        public isWalkable():boolean {
            return this.type == 0 || this.isStart() || this.isEnd();
        }

        public isStart():boolean {
            return this.type == 2;
        }

        public isEnd():boolean {
            return this.type == 3;
        }

        public ChangePointer() {

            switch (this.type){
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
          
        }       
    }
}