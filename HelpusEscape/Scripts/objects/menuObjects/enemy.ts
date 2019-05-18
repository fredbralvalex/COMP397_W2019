module objects {
    export class Enemy extends objects.GameObject {
        // Variables
        leftSide:Boolean = true;
        upperPosition:number;
        lowerPosition:number;
        // Constructor
       
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,)
        {
            super(assetManager, imageString); 
            this.x = x;
            this.y = y;   
            
            this.upperPosition = this.y - 20;
            this.lowerPosition = this.y + 10;

            this.Start();          
        }
        
        public Start():void{
            console.log('In Enemy');
           
        }

        public Update():void {
            super.Update();
            if(this.x!=0 && this.y!=0)
            {
            this.Move();}
        }        
        
        public Reset():void {}

        public Move():void {
            if (Game.easyMode) {
                this.x -= 0.5;
            } else {
                this.x -= 1.5;
            }
            
            if((this.x>200 && this.x<350) || (this.x>500 && this.x<650))
            {
                this.y = this.upperPosition;
            }
            else if((this.x>350 && this.x<500) || (this.x > 650))
            {
                this.y = this.lowerPosition;
            }

            else if(this.x < 200)
                this.x = 800;
        }

        public Update2():void {
            super.Update();
            if(this.x!=0 && this.y!=0)
            {
            this.Move2();}
        }        
        

        public Move2():void {
                
            this.x -= 2;
            if((this.x>200 && this.x<350) || (this.x>500 && this.x<650))
            {
                this.y +=1 ;
            }
            else if((this.x>350 && this.x<500) || (this.x > 650))
            {
                this.y -= 1;
            }            
            else if(this.x < 200)
                this.x = 800;
        }
    }
}