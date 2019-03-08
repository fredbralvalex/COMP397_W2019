module scenes
{
    export class GameScene extends objects.Scene
    {

        private title: objects.Label;
        private titleShadow: objects.Label;

        private tiles: objects.Tile[];
        private player: objects.Player;

        private backgroundMusic:createjs.AbstractSoundInstance;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);

            this.backgroundMusic = createjs.Sound.play("play_music");
            this.backgroundMusic.loop = -1; // Looping forever
            this.backgroundMusic.volume = 0.2;

            this.Start();
        }

        public Start():void
        {
            
            objects.Game.isDebug = false;
            this.isPaused = false;
            
            objects.Game.keyboard = new managers.Keyboard();
            
            console.log("GAME SCENE(S)...");
            
            this.title = new objects.Label("Find an a maze ing way out!", "bold 48px", "Cambay", "#960000", ( objects.Game.width / 2),  objects.Game.height / 8, true);
            this.title.alpha = 1;
            
            this.titleShadow = new objects.Label("Find an a maze ing way out!", "bold 48px", "Cambay", "#843e3e", ( objects.Game.width / 2) + 2,  objects.Game.height / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(2, 2, this.player.x, 
                this.player.y, 
                this.player.width - 4, this.player.height - 4);

            this.InitializeLevel();
            this.Main();
        }

        private InitializeLevel():void {
            this.tiles = new Array<objects.Tile>();
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, true);

            tiles.forEach(tile => {
                if (!tile.walkable || tile.endTile) {
                    this.tiles.push(tile);
                }

                if (tile.startTile) {
                    this.player.x = tile.x;
                    this.player.y = tile.y;
                }

                this.addChild(tile);
            });
        }

        public CreateFunctionCheck(gameObject:objects.GameObject) {
            let boxCollider:objects.BoxCollider = gameObject.boxCollider;
            return (x:number, y:number) : managers.AABB => {
                let collided = false;                                
                let aabbCollider = boxCollider.GetAABB(x, y);
                let result: managers.AABB;


                for(let i = 0; i < this.tiles.length; i++) {
                    var tile = this.tiles[i];               
                    if (this.player.TileBoundsNextTo(tile) && (!tile.walkable || tile.endTile)) {
                        result = managers.Collision.CheckAABBCollision(aabbCollider, tile.boxCollider.aabb);
                        if (result.CheckCollided()) {
                            collided = true;
                            break;
                        } 
                    }
                }
                
                
                if (collided && tile.endTile) {
                    console.log("end game");
                    this.backgroundMusic.stop();
                    objects.Game.currentScene = config.Scene.FINISH;
                }
                return result;
            };
        }

        public Main():void
        {        
            
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            
            this.addChild(this.player);

            //create the empties gameobjects to be the stage boundaries

            var callback = () : void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);
            }
            this.StartCountdown(3, callback);

        }

        public Update():void
        {
            this.CheckPaused();
            if (this.isPaused){
                return;
            } 

            let CheckMovement = this.CreateFunctionCheck(this.player);
            this.player.UpdateIfPossible(CheckMovement);            

            for(let i = 0; i < this.tiles.length; i++) {
                var tile = this.tiles[i];
                tile.Update();
            }

        }
    }
}