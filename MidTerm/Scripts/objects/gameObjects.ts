module objects{
  export class GameObject extends createjs.Bitmap{
    // Variables
    public walkable:boolean;

    protected speedX: number;
    protected speedY: number;

    public width: number;
    public height: number;

    public halfW: number;
    public halfH: number;

    public isColliding:boolean;

    public isGravityAffected:boolean;
        
    public boxCollider : objects.BoxCollider;
    public lastPosition: math.Vec2;

    public isLeft;
    public isInverted;

    // Constructor
    constructor(assetManager: createjs.LoadQueue, imageString: string, walkable:boolean = false){
      super(assetManager.getResult(imageString));

      this.name = imageString;
      this.walkable = walkable;
      this.Init();
    }

    // Methods / Functions
    protected Init():void{
      this.isInverted = false;
      this.isLeft = false;
      this.width = this.GetWidthBounds();
      this.height = this.GetHeightBounds();
      this.halfW = this.width * 0.5;
      this.halfH = this.height * 0.5;

      /*this.regX = this.halfW;
      this.regY = this.halfH;*/

      this.regX = 0;
      this.regY = 0;
      this.isColliding = false;
      this.isGravityAffected = false;
      this.lastPosition = new math.Vec2();
      this.boxCollider = new objects.BoxCollider(0 , 0, this.x, this.y, this.width, this.height);
      
    }

    protected GetWidthBounds() : number {
      return this.getBounds().width;
    }

    protected GetHeightBounds() : number {
      return this.getBounds().height;
    }

    public Start(): void{
    }

    public Update(): void{
      this.boxCollider.Update(this.x, this.y);

      if (objects.Game.isDebug) {
        this.DrawDebugLine()
      }
    }
    
    public CheckNextWorldPosition(): boolean {
      return false;
    }

    public Reset(): void{

    }

    public CheckBounds(): void{

    }

    public Move(): void {

    }

    //called only when the function managers.Collision.CheckAABB is called
    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {

    }

    //called only when the function managers.Collision.CheckAABB is called
    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {

    }

    protected FlipHorizontally() : void
    {
        this.isLeft = !this.isLeft;
        this.scaleX = this.scaleX*-1;
        this.boxCollider.offset_x = this.width - this.boxCollider.width - this.boxCollider.offset_x;        
        if (this.isLeft) {
          this.regX = this.width;
        } else {
          this.regX = 0;
        }
    }

    protected FlipVertically() : void
    {
        this.isInverted = !this.isInverted;
        this.scaleY = this.scaleY*-1;
        if (this.isInverted) {
          this.regY = this.height;
        } else {
          this.regY = 0;
        }
        this.boxCollider.offset_y = this.height - this.boxCollider.height - this.boxCollider.offset_y;
    }

    private cached :createjs.Shape;
    public DrawDebugLine() :void {
      if (this.boxCollider != null) {          
        this.boxCollider.DebugLine();
      }

      if (this.cached !== null) {
        objects.Game.stage.removeChild(this.cached);
      }
      let graphics = new createjs.Graphics();
      let color:string = this.walkable?"#00721b":"#FF0099";
      graphics.beginStroke(color)
        .drawRect(this.x, this.y, this.width, this.height)
        .endStroke();
      this.cached = new createjs.Shape(graphics);
      objects.Game.stage.addChild(this.cached);
    }
  
  }
}
