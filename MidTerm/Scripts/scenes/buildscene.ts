module scenes
{
    export class BuildScene extends objects.Scene
    {

        private title: objects.Label;
        private titleShadow: objects.Label;
        
        private tiles: objects.Tile[];
        private startTile: objects.Tile;
        private endTile: objects.Tile;


        private drawTypeButton: objects.Button;
        private txtType: objects.Label;

        private printMapButton: objects.Button;
        private txtPrint: objects.Label;

        private playButton: objects.Button;
        private txtBack: objects.Label;

        private cancelButton: objects.Button;
        private txtCancel: objects.Label;

        private pointer: objects.Pointer;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        public Start():void
        {
            objects.Game.isDebug = true;
            this.isPaused = false;
            
            objects.Game.keyboard = new managers.Keyboard();
            
            console.log("GAME SCENE(S)...");
            
            this.title = new objects.Label("Build a map!", "bold 48px", "Cambay", "#960000", ( objects.Game.width / 2),  objects.Game.height / 8, true);
            this.title.alpha = 1;
            
            this.titleShadow = new objects.Label("Build a map!", "bold 48px", "Cambay", "#843e3e", ( objects.Game.width / 2) + 2,  objects.Game.height / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
                        
            this.drawTypeButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.2, objects.Game.height * 0.97, true);
            this.drawTypeButton.scaleX = 0.75;
            this.txtType = new objects.Label("Type", "20px", "Cambay", "#960000",this.drawTypeButton.x, this.drawTypeButton.y + 2, true);
            this.txtType.alpha = 1;

            this.printMapButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.4, objects.Game.height * 0.97, true);
            this.printMapButton.scaleX = 0.75;
            this.txtPrint = new objects.Label("Console log", "20px", "Cambay", "#960000",this.printMapButton.x, this.printMapButton.y + 2, true);
            this.txtPrint.alpha = 1;

            this.playButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.6, objects.Game.height * 0.97, true);
            this.playButton.scaleX = 0.75;
            this.txtBack = new objects.Label("Play", "20px", "Cambay", "#960000",this.playButton.x, this.playButton.y + 2, true);
            this.txtBack.alpha = 1;

            this.cancelButton = new objects.Button(this.assetManager, "smallButton", objects.Game.width * 0.8, objects.Game.height * 0.97, true);
            this.cancelButton.scaleX = 0.75;
            this.txtCancel = new objects.Label("Cancel", "20px", "Cambay", "#960000",this.cancelButton.x, this.cancelButton.y + 2, true);
            this.txtCancel.alpha = 1;

            this.pointer = new objects.Pointer(this.assetManager, managers.LevelBuilder.h);

            this.InitializeLevel();
            this.Main();
        }

        private InitializeLevel():void {
            this.tiles = managers.LevelBuilder.CreateLevel(this.assetManager, true);

            this.tiles.forEach(tile => {
                tile.on("mousedown", () =>{
                    if (this.CanEdit(tile)) {
                        if ((!this.pointer.isStart() && !this.pointer.isEnd()) &&
                        (tile.startTile || tile.endTile)) {
                            //cant erase an end point or a start point
                            return;
                        }
                        
                        // can only be one start and one end
                        if (this.pointer.isEnd()) {

                            if (tile.startTile) {
                                
                                let et:objects.Tile = this.endTile;
                                et.startTile = true;
                                et.endTile = false;
                                et.image = this.pointer.start;
                                tile.walkable = true;   
                                this.startTile = et;                             

                                tile.startTile = false;
                                tile.endTile = true;
                                tile.image = this.pointer.image;
                                tile.walkable = this.pointer.isWalkable();
                                this.endTile = tile;
                            } else {
                                let et:objects.Tile = this.endTile;
                                et.startTile = false;
                                et.endTile = false;
                                et.image = this.pointer.walkableImage;                                
                                 
                                this.endTile = tile;
                            }
                        } else  if (this.pointer.isStart()) {
                            if (tile.endTile) {
                                
                                let st:objects.Tile = this.startTile;
                                st.endTile = true;
                                st.startTile = false;
                                st.image = this.pointer.end;
                                tile.walkable = true;   
                                this.endTile = st;                             

                                tile.endTile = false;
                                tile.startTile = true;
                                tile.image = this.pointer.image;
                                tile.walkable = this.pointer.isWalkable();
                                this.startTile = tile;
                            } else {
                                let st:objects.Tile = this.startTile;
                                st.endTile = false;
                                st.startTile = false;
                                st.image = this.pointer.walkableImage;                                
                                 
                                this.startTile = tile;
                            }
                        }
                         
                        tile.endTile = this.pointer.isEnd();
                        tile.startTile = this.pointer.isStart();
                        tile.walkable = this.pointer.isWalkable();
                        tile.image = this.pointer.image;
                    }
                });
                if (tile.startTile) {
                    this.startTile = tile;
                } else if (tile.endTile) {
                    this.endTile = tile;

                }
                this.addChild(tile);
            });
        }

        private CanEdit(tile: objects.Tile) :boolean {
            return ((tile.x > 0 && tile.x < objects.Game.width - tile.width - tile.halfW)
                && (tile.y > 0 && tile.y < objects.Game.height - tile.height ));
        }

        public Main():void
        {        
            
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            
            this.addChild(this.drawTypeButton);
            this.addChild(this.printMapButton);
            this.addChild(this.playButton);
            this.addChild(this.cancelButton);


            this.addChild(this.txtPrint);
            this.addChild(this.txtType);
            this.addChild(this.txtBack);
            this.addChild(this.txtCancel);



            var callback = () : void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);
            }
            this.StartCountdown(3, callback);

            this.addChild(this.pointer);
            this.playButton.on("click", ()=>{
                var row = new Array<any>();
                var level = new Array<any>();

                let i = 0;
                let j = 0;
                this.tiles.forEach(tile => {
                    i++;
                    if (i == managers.LevelBuilder.level[0].length) {
                        console.log(i);
                        j++;
                        i = 0;
                        row.push({w:tile.walkable, e:tile.endTile, s:tile.startTile});
                        level.push(row);
                        row = new Array<any>();
                    } else {
                        row.push({w:tile.walkable, e:tile.endTile, s:tile.startTile});
                    }
                });
                console.log(j);
                managers.LevelBuilder.level = level;
                objects.Game.currentScene = config.Scene.INGAME;
            });
            this.drawTypeButton.on("click", ()=>{this.pointer.ChangePointer()});
            this.cancelButton.on("click", ()=>{objects.Game.currentScene = config.Scene.START;});
            this.printMapButton.on("click", ()=>{

                let mapString = "";
                let i = 0;
                let j = 0;
                this.tiles.forEach(tile => {
                    i++;
                    if (i == 1){
                        mapString += "[";
                    }
                    if (i == managers.LevelBuilder.level[0].length) {
                        console.log(i);
                        j++;
                        i = 0;
                        mapString += tile.toString() + "]," + '\n';
                    } else {
                        mapString += tile.toString();                        
                        mapString+= ",";
                    }
                });
                console.log(j);
                mapString += "";
                console.log(mapString);
            });
        }

        public Update():void
        {

            for(let i = 0; i < this.tiles.length; i++) {
                var tile = this.tiles[i];
                tile.Update();
            }
            this.pointer.Update();

        }
    }
}