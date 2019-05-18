module objects{
    export class DynamicObject extends objects.GameObject {

        public aabbResultPlayer:managers.AABB;
        public alreadyHandled: boolean;
        public player:Player;

        constructor(assetManager: createjs.LoadQueue, imageString: string){
            super(assetManager, imageString);
            this.alreadyHandled = false;
          }

        public Action(): void {
            this.alreadyHandled = true;
            //console.log('ACTION');
        }

        protected CheckCollision: (x:number, y:number, g:boolean) => managers.AABB;

        public UpdateIfPossible(Check: (x:number, y:number, g:boolean) => managers.AABB): void {
            this.CheckCollision = Check;
            this.Update();
        }

        public Update():void{
            super.Update();
            this.DoGravityEffect();
            this.Move();
        }

        public DoGravityEffect():void {
          if (this.isGravityAffected) {
            this.Move_Vertically(false, config.Gravity.gravitySpeed*this.GetGravityFactor());
          }
        }

        public Move_Vertically(up:boolean, speed:number) :void {
            if (up) {
              if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
                this.y += speed;
              }
            } else {
              if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
                this.y -= speed;
              }          
            }
        }

        public Move_Horizontally(right:boolean, speed:number) :void {
          if (right) {
            if (this.CheckMovement(this.CheckCollision, false, speed)) {
              this.x += speed;
            }
          } else {
            if (this.CheckMovement(this.CheckCollision, true, speed)) {
              this.x -= speed;
            }          
          }
      }

        public CheckMovement(Check: (x:number, y:number, g:boolean) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
            let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y, true);
            return !md.isCollided;
        }
      
        public CheckVerticalMovement(Check: (x:number, y:number, g:boolean) => managers.AABB, isUp: boolean, speed:number): boolean {
            let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed), true);
            if (md.isCollided && md.objectCollided instanceof InformativePoint){
              return true;              
            }
            return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
        }
    }
}