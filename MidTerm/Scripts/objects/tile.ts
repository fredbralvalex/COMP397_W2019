module objects{
    export class Tile extends EmptyGameObject {
      // Variables
        public startTile:boolean;
        public endTile:boolean;

      // Constructor
      constructor(assetManager: createjs.LoadQueue, start:boolean, end:boolean, walkable:boolean, width:number = 1, height:number = 1) {
        super(assetManager, start?"start": end?"end":walkable?"path":"wall");
        this.walkable = walkable;
        this.width = width;
        this.height = height;
        this.startTile = start;
        this.endTile = end;
        this.Init();
      }

      public toString():string {
        return "{ w:"+ this.walkable +        
          (this.startTile ? ", s:true":"") + 
          (this.endTile ? ", e:true":"") +
          " }";
      }

      protected GetWidthBounds() : number {
        return this.width;
      }
  
      protected GetHeightBounds() : number {
        return this.height;
      }

      public Update() {
        super.Update();
      }
    }
  }