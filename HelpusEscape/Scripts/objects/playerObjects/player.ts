module objects{
    export class Player extends objects.GameObject {
  
      // Variables
      public playerNum:number;
      private static speed:number = 5;
      private static maxHightRate:number = 0.9 ; //the player can jump at highest 90% of the height
      public isDead:boolean;
      public hasPassed:boolean;
      public maxJumpHeight: number;
      public isJumping: boolean;
      private jump_sound:createjs.AbstractSoundInstance;

      public actionObjects:DynamicObject[];
      public time: number;
      private timeToAction:number = 0.5;
      public deltaTime: number;
      
      public dialog: any;
      public inventory:Inventory;
  
      public picture:GameObject;
      public timeScore:number;

      public listener: any;
      public animationState = "Jump";
      public spriteRenderer:createjs.Sprite;
      public fixed_flipOffsetX:number = 27;
      public flipOffsetX:number = 0;

      public fixed_flipOffsetY:number = 27;
      public flipOffsetY:number = 0;

      public static onePlayerGone:boolean;
       
      // Constructor
      constructor(assetManager:createjs.LoadQueue, playerNum:number, inventory:Inventory, x:number = 0, y:number = 0){
         super(assetManager, playerNum ==1?"player":"player");
         this.playerNum = playerNum;
         this.hasPassed = false;
         this.actionObjects = new Array<DynamicObject>();
        if (playerNum == 1) {          
            this.spriteRenderer = new createjs.Sprite(objects.Game.player1TextureAtlas, "Idle");
            this.picture = new GameObject(assetManager, "p1");
        } else {
            this.spriteRenderer = new createjs.Sprite(objects.Game.player2TextureAtlas, "Idle");
            this.picture = new GameObject(assetManager, "p2");

        }
        this.spriteRenderer.scaleX = 0.1;
        this.spriteRenderer.scaleY = 0.1;

        this.Start();
        this.picture.alpha = 0.5;
        this.isGravityAffected = true;
        
        this.inventory = inventory;      
        this.inventory.player = this;
        this.picture.x = inventory.x;
        this.picture.y = inventory.y;
  
        this.time = 0;
        this.deltaTime = 0;
        this.x = x;
        this.y = y;
      }
  
      // Methods / Functions
      public Start():void{        
        this.isJumping = false;      
      }
  
      private CheckCollision: (x:number, y:number, g:boolean) => managers.AABB;
  
      public UpdateIfPossible(Check: (x:number, y:number, g:boolean) => managers.AABB): void {
        this.CheckCollision = Check;
        this.Update();
      }
  
      protected Update():void {
        if (this.hasPassed) {
          if (this.dialog != null) {
            this.dialog.disposeDialog();
          }
          return;
        }
        this.spriteRenderer.x = this.flipOffsetX + this.x;
        this.spriteRenderer.y = this.flipOffsetY +this.y;
        super.Update();
        
        this.CheckGrounded(this.CheckCollision);
  
        if (!this.isGrounded && !this.isJumping) {
          this.DoGravityEffect();
        } else if (this.isGrounded){
          this.maxJumpHeight = this.y - (this.height * Player.maxHightRate)*this.GetGravityFactor();
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
          this.dialog.dialog.Update(this.x + this.width, this.y - 0.3*this.halfH)
        }
      }
  
      public Reset(): void{
  
      }
  
      public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {
        console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));  
      }
  
      public OnColliderExit(penetration: math.Vec2, obj: GameObject) {
      }
  
      public cancelStopEvent(e){
        this.spriteRenderer.stop();
        this.spriteRenderer.off("animationend", this.listener);
        this.animationState = "Waiting";
      }

      private CheckKeyboardPlayerDown() {
        return (objects.Game.keyboard.player1MoveDown && this.playerNum == 1) || (objects.Game.keyboard.player2MoveDown && this.playerNum == 2);
      }

      public Down() : void {
        if (this.isGrounded && this.CheckKeyboardPlayerDown()){
          if (this.CheckDownStairs( this.CheckCollision,false, config.Gravity.gravityForce*this.GetGravityFactor()*this.halfH)) {
            //this.y += config.Gravity.gravityForce*this.GetGravityFactor()*this.height;
          }
        }          
      }

      private CheckKeyboardPlayerJump() {
          return (objects.Game.keyboard.player1MoveUp && this.playerNum == 1) || (objects.Game.keyboard.player2MoveUp && this.playerNum == 2);
      }

      public Jump() : void {
        if (this.isGrounded) {
          if (this.CheckKeyboardPlayerJump() && !this.isJumping) {
            this.isGrounded = false;
            this.isJumping = true;
            this.spriteRenderer.gotoAndPlay("Jump");
            this.animationState = "Jump";
            this.listener =  this.on("animationend", this.cancelStopEvent);
            //this.y += config.Gravity.gravityForce*this.height;
            this.Move_Vertically(true, config.Gravity.gravityForce*this.GetGravityFactor()*this.height);
            //this.jump_sound = createjs.Sound.play("ghost_wind");
          }
        } else if(this.isJumping) {
          if (this.maxJumpHeight*this.GetGravityFactor() <= this.y*this.GetGravityFactor()){
            //going higher
            //this.y += config.Gravity.gravityForce*this.height/2;
            this.Move_Vertically(true, config.Gravity.gravityForce*this.GetGravityFactor()*this.height/2);
          } else {
            //console.log('reach high');
            this.isJumping = false;
          }
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
  
      private CheckKeyboardPlayerAction() {
          return (objects.Game.keyboard.player1Action && this.playerNum == 1) || 
          (objects.Game.keyboard.player2Action && this.playerNum == 2);
      }
      public Action() :void {
        
        if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
          this.deltaTime+=1/60;
          return;
        }        
        if (this.animationState != "Idle" && this.animationState != "Run"){
            this.spriteRenderer.gotoAndPlay("Idle");
            this.animationState = "Idle";
        }
        this.deltaTime=0;
  
        if (this.CheckKeyboardPlayerAction()) {
            this.spriteRenderer.gotoAndPlay("Action");
            this.animationState = "Action";
            this.listener =  this.on("animationend", this.cancelStopEvent);
          
          let objectAction = this.getCloserObject();

          if (objectAction instanceof InformativePoint) {

            objectAction.Action();

            if (!this.inventory.DropItem()) {
              objectAction.alreadyHandled = false;
            }
            
            this.deltaTime+=1/60;
          } else if (objectAction == null || objectAction == undefined || !managers.Collision.CheckDistanceDoubled(this, objectAction)) {
            
            if (this.inventory.DropItem()) {

              createjs.Sound.play("wrench_drop").volume = 0.3;
            }
            
            this.deltaTime+=1/60;
          } else {
            objectAction.Action();
            this.deltaTime+=1/60;
          }
          this.CheckCollision(this.x, this.y, true);
        }            
      }

      private getCloserObject() : DynamicObject {
        
        let item = this.actionObjects.pop();
        let closest = 100;
        let closest_item = item;
        while(item) {
          if (item instanceof Key) {
            //forcing being the first to have an action
            closest_item = item;
            closest = -1;
          } else if(item instanceof PushableObject) {
            closest_item = item;
            closest = -1;
          } else if (closest > -1 && item instanceof Door) {
            closest_item = item;
            closest = -1;            
          }

          let d = managers.Collision.GetDistance(this, item);
          if( d < closest) {
              closest = d;
              closest_item = item
          }
          item = this.actionObjects.pop();
        }        
        return closest_item;
      }
  
      private CheckKeyboardPlayerMoveLeft() {
        return (objects.Game.keyboard.player1MoveLeft && this.playerNum == 1) || 
        (objects.Game.keyboard.player2MoveLeft && this.playerNum == 2);    
      }
      private CheckKeyboardPlayerMoveRight() {
        return (objects.Game.keyboard.player1MoveRight && this.playerNum == 1) || 
        (objects.Game.keyboard.player2MoveRight && this.playerNum == 2);    
      }
      public Move() :void {
        //this.x = objects.Game.stage.mouseX;
        let isMovement = false;
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
        
        if (this.isGrounded){
            if (isMovement) {
                if (this.animationState != "Run" && this.animationState != "Action"){
                    this.spriteRenderer.gotoAndPlay("Run");
                    this.animationState = "Run";
                }
            } else {            
                if (this.animationState != "Idle" && this.animationState != "Action"){
                    this.spriteRenderer.gotoAndPlay("Idle");
                    this.animationState = "Idle";
                }            
            }  
        } 
      }
  
      public CheckGrounded(Check: (x:number, y:number, g:boolean) => managers.AABB): void {
        let md:managers.AABB = Check(this.x, this.y - config.Gravity.gravitySpeed*this.GetGravityFactor(), true);      
  
        if (
          (md.isCollided && (md.objectCollided instanceof Door 
            || md.objectCollided instanceof HandableObject 
            || md.objectCollided instanceof ActionableObject
            || md.objectCollided instanceof InformativePoint 
            || md.objectCollided instanceof Hatch))
          ) {
          this.isGrounded = false;
          return;
        }
        //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
        this.isGrounded = md.isCollided;// && (md.closestPointOnBoundsToPoint(math.Vec2.zero).y*this.GetGravityFactor() > 0);
  
      }
  
      public CheckMovement(Check: (x:number, y:number, g:boolean) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
        let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y, true);
        if (md.objectCollided instanceof OpenableObject 
            || md.objectCollided instanceof HandableObject
            || md.objectCollided instanceof ActionableObject
            || md.objectCollided instanceof Hatch
            || md.objectCollided instanceof InformativePoint
            || md.objectCollided instanceof Stair) {
          return true;
        }
  
        return !md.isCollided;// && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
      }
  
      public CheckDownStairs(Check: (x:number, y:number, g:boolean) => managers.AABB, isUp: boolean, speed:number): boolean {
        let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed), true);
        if (md.isCollided && md.objectCollided instanceof Stair) {
          return true;
        }
        return false;
      }

      public CheckVerticalMovement(Check: (x:number, y:number, g:boolean) => managers.AABB, isUp: boolean, speed:number): boolean {
        let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed), true);
        //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
        
        if (md.isCollided && (md.objectCollided instanceof Door 
            || md.objectCollided instanceof OpenableObject 
            || md.objectCollided instanceof HandableObject
            || md.objectCollided instanceof ActionableObject
            || md.objectCollided instanceof Hatch
            || md.objectCollided instanceof InformativePoint
            || md.objectCollided instanceof Stair)) {
          return true;
        }
        this.isJumping = !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
  
        return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
        //&& (md.closestPointOnBoundsToPoint(math.Vec2.zero).y > 0 || md.closestPointOnBoundsToPoint(math.Vec2.zero).y < 0));
      }
  
      public CheckBounds(): void {
        // hardcoding the play area for now
        /*if (this.x >= 837.5){
          this.x = 837.5;
        }
  
        if (this.x <= 235.5){
          this.x = 235.5;
        }*/
      }
    }
  }