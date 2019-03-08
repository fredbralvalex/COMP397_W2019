module objects{
  export class Player extends objects.GameObject {

    // Variables
    private static speed:number = 5;
    private upImage: any;
    private downImage: any;
    private leftImage: any;
    private rightImage: any;
    
    // Constructor
    constructor(assetManager:createjs.LoadQueue){
      super(assetManager, "char_down");
      this.upImage = assetManager.getResult("char_up");
      this.downImage = assetManager.getResult("char_down");
      this.leftImage = assetManager.getResult("char_left");
      this.rightImage = assetManager.getResult("char_right");      

      this.Start();
    }

    // Methods / Functions
    public Start():void{
      this.x = 400;
      this.y = 45;       
    }

    private CheckCollision: (x:number, y:number) => managers.AABB;

    public UpdateIfPossible(Check: (x:number, y:number) => managers.AABB): void {
      this.CheckCollision = Check;
      this.Update();
    }

    public Update():void{
      super.Update();
      
      this.Move();
      
      this.CheckBounds();
      
      this.lastPosition.x = this.x;
      this.lastPosition.y = this.y;
    }

    public Reset(): void{

    }

    public Move_Vertically(up:boolean, speed:number) :void {
      if (up) {
        if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) { 
          this.image = this.upImage;
          this.y += speed;
        }
      } else {
        if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
          this.image = this.downImage;
          this.y -= speed;
        }          
      }
    }

    public Move() :void {
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
    }

    public CheckMovement(Check: (x:number, y:number) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y);
      return !md.isCollided;
    }

    public CheckVerticalMovement(Check: (x:number, y:number) => managers.AABB, isUp: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x, this.y + (isUp ? 0 - speed: speed));
      return !md.isCollided;// || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
    }

    public CheckBounds(): void {
      
    }

    //check if the tile is next to the player in order to check collision
    public TileBoundsNextTo(tile:objects.Tile): boolean {
      return (tile.x < (this.x + this.width)  + tile.width || tile.x > this.x  - tile.width)
      &&  (tile.y < (this.y + this.height) + tile.height || tile.y > this.y  - tile.height); 
    }
  }
}
