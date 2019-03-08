module managers {
    export class LevelBuilder{

        static w:number = 40;
        static h:number = 40;

        public static backgroundGame:any = [
            [{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true, e:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true, s:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false }]
        ];

        public static level:any = [
            [{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true, e:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:false }],
            [{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:true },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:true },{ w:false },{ w:true },{ w:false },{ w:false },{ w:false },{ w:true },{ w:true },{ w:false },{ w:false }],
            [{ w:false },{ w:true, s:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:true },{ w:true },{ w:true },{ w:true },{ w:false },{ w:true },{ w:false }],
            [{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false },{ w:false }]
        ];

        public static CreateLevel(assetManager:createjs.LoadQueue, isGame:boolean = false):objects.Tile[] {
            let gameTiles:objects.Tile[] = new Array<objects.Tile>();

            let x = 0;
            let y = 0;
            var tiles;
            if (isGame) {
                tiles = this.level;
            } else {
                tiles = this.backgroundGame;
            }
            tiles.forEach(row => {
                row.forEach(item => {
                    var tile = new objects.Tile(assetManager, 
                        item.s !== undefined && item.s, 
                        item.e !== undefined && item.e, 
                        item.w, this.w, this.h);

                    gameTiles.push(tile);
                    tile.x = x;
                    tile.y = y;
                    x += this.w;
                });
                x=0;
                y+=this.h;
            });
            return gameTiles;
        }        

        

    }
}