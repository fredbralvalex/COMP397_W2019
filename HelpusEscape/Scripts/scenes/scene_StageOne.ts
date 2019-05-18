module scenes {
    export class StageOne extends objects.Scene {
        //Audio

        //#region Stage Variables
 
        
        //#endregion
        
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            //this.currentLevel = config.Scene.INGAME;
            this.Start();
        }    

        CreateEnemies = () => {

            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 180);
            ghost.alpha = 0.8;
            ghost.y = ghost.y - ghost.height;
            ghost.scaleX = 0.7;
            ghost.scaleY = 0.7;
            this.enemies.push(ghost);
    
            var ghost2 = new objects.Enemy(this.assetManager, "ghost2", 250, 415);
            ghost2.alpha = 0.8;
            ghost2.y = ghost2.y - ghost2.height;
            ghost2.scaleX = 0.7;
            ghost2.scaleY = 0.7;
            this.enemies.push(ghost2);

        }

        public Start(): void {
            super.Start();
            if(objects.Game.isPlayingMusic==false){                
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic=true;
            }
            
            this.Main();
        }        

        public Update(): void {
            super.Update();
        }

        public Main(): void {
            super.Main();
        }

        //Player
        GetPositionP1 = ():math.Vec2 => {
            return new math.Vec2(400, 60);
        }
    
        GetPositionP2 = ():math.Vec2 => {
            return new math.Vec2(400, 280);
        }
    
        GetLevelName = ():string => {            
            return "Corridors!";
        }
    
        GetBackgroundAsset = ():string => {
            return "level_01_house";
        }
    
        GetBackgroundShadowAsset = ():string => {
            return "level_01_shadow";
        }

        CreateScenery = ():void =>  {
            var wall_l = new objects.EmptyGameObject(this.assetManager, "wall_l", 1, 600);
            wall_l.x = 220;
            wall_l.y = 10;
            this.addChild(wall_l);

            var wall_r = new objects.EmptyGameObject(this.assetManager, "wall_r", 1, 600);
            wall_r.x = 840;
            wall_r.y = 10;
            this.addChild(wall_r);

            this.gameSceneryStaticObjects.push(wall_l);
            this.gameSceneryStaticObjects.push(wall_r);

            this.CreateFloors();
            this.CreatePlatformsStairs();
            this.CreateObjects();

        }
        private CreateObjectsBasement(): void { 
        }
        private CreateObjectsFloorOne(): void { 
                         
            var floor_1_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_1_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_1_Crate.x, floor_1_Crate.y,
                floor_1_Crate.width, floor_1_Crate.height - 5);
            this.addChild(floor_1_Crate);
            floor_1_Crate.x = 555;
            floor_1_Crate.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Crate);
            

            var floor_1_Key = new objects.Key(this.assetManager);                
            this.addChild(floor_1_Key);            
            floor_1_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Key);
        
            var floor_1_Treasure = new objects.HandableObject(this.assetManager,"sack", 1000);                
            this.addChild(floor_1_Treasure);            
            floor_1_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Treasure);


            var floor_1_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_1_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_1_Desk.x, floor_1_Desk.y,
                floor_1_Desk.width, floor_1_Desk.height);
            this.addChild(floor_1_Desk);
            floor_1_Desk.x = 455;
            floor_1_Desk.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_1_Desk.AddObjectInside(floor_1_Key);

            var floor_2_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_2_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_2_Desk.x, floor_2_Desk.y,
                floor_2_Desk.width, floor_2_Desk.height);
            this.addChild(floor_2_Desk);
            floor_2_Desk.x = 315;
            floor_2_Desk.y = 390;
            this.gameSceneryDynamicObjects.push(floor_2_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_2_Desk.AddObjectInside(floor_1_Treasure);
        }

        private CreateObjectsFloorTwo(): void { 
            var floor_2_Door = new objects.Door(this.assetManager, true);
            floor_2_Door.isLocked = true;
            floor_2_Door.boxCollider = new objects.BoxCollider(0, 0, floor_2_Door.x, floor_2_Door.y,
                floor_2_Door.width, floor_2_Door.height+5);                
            floor_2_Door.AddEnterDoorAction(()=>{return this.timer},this.GoToNextLevel);
            this.addChild(floor_2_Door);
            floor_2_Door.x = 240;
            floor_2_Door.y = 280;
            this.gameSceneryDynamicObjects.push(floor_2_Door);

            
        }

        private CreateObjectsFloorThree(): void { 
            var floor_3_Treasure = new objects.HandableObject(this.assetManager,"sack", 1000);                
            this.addChild(floor_3_Treasure);            
            floor_3_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure);
            
            var floor_3_Key = new objects.Key(this.assetManager);                
            this.addChild(floor_3_Key);            
            floor_3_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Key);            
            
            var floor_3_Desk_2 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_2.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_2.x, floor_3_Desk_2.y,
                floor_3_Desk_2.width, floor_3_Desk_2.height);
            this.addChild(floor_3_Desk_2);
            floor_3_Desk_2.x = 615;
            floor_3_Desk_2.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_2);
            floor_3_Key.isGravityAffected = false;
            floor_3_Desk_2.AddObjectInside(floor_3_Key);
    
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y,
                floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);
            floor_3_Desk.x = 715;
            floor_3_Desk.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk);
            floor_3_Treasure.isGravityAffected = false;
            floor_3_Desk.AddObjectInside(floor_3_Treasure);
    
            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y,
                floor_3_Crate.width, floor_3_Crate.height - 5);
            this.addChild(floor_3_Crate);
            floor_3_Crate.x = 415;
            floor_3_Crate.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Crate);
        }

        private CreateObjectsFloorFour(): void { 
            var floor_4_Door = new objects.Door(this.assetManager, true);
            floor_4_Door.isLocked = true;
            floor_4_Door.boxCollider = new objects.BoxCollider(0, 0, floor_4_Door.x, floor_4_Door.y,
                floor_4_Door.width, floor_4_Door.height+5);                
            floor_4_Door.AddEnterDoorAction(()=>{return this.timer}, this.GoToNextLevel);
            this.addChild(floor_4_Door);
            floor_4_Door.x = 770;
            floor_4_Door.y = 50;
            this.gameSceneryDynamicObjects.push(floor_4_Door);
        }                  
        
        
        private CreateObjects(): void {            
            
            this.CreateObjectsFloorFour();
            this.CreateObjectsFloorTwo();
            this.CreateObjectsBasement();
            this.CreateObjectsFloorOne();
            this.CreateObjectsFloorThree();
        }

        private CreatePlatformsStairs(): void {
            var floor_3_stairs = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 30, 1);
            this.addChild(floor_3_stairs);
            this.gameSceneryStaticObjects.push(floor_3_stairs);
            floor_3_stairs.x = 320;
            floor_3_stairs.y = 184;

            var floor_1_stairs = new objects.EmptyGameObject(this.assetManager, "floor_1_stairs", 30, 1);
            this.addChild(floor_1_stairs);
            this.gameSceneryStaticObjects.push(floor_1_stairs);
            floor_1_stairs.x = 706;
            floor_1_stairs.y = 414;
        }
        

        private CreateFloorFour(platform_offset:number = 8): void {
            var floor_5 = new objects.EmptyGameObject(this.assetManager, "floor_5", 620, 1 + platform_offset);
            this.addChild(floor_5);
            this.gameSceneryStaticObjects.push(floor_5);
            floor_5.x = 220;
            floor_5.y = 12 + platform_offset;
    
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 60, 1 + platform_offset);
            this.addChild(floor_4_1);
            this.gameSceneryStaticObjects.push(floor_4_1);
            floor_4_1.x = 220;
            floor_4_1.y = 130 + platform_offset;
    
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 460, 1 + platform_offset);
            this.addChild(floor_4_2);
            this.gameSceneryStaticObjects.push(floor_4_2);
            floor_4_2.x = 380;
            floor_4_2.y = 130 + platform_offset;
        }
        private CreateFloorThree(platform_offset:number = 8): void {
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 620, 1 + platform_offset);
            this.addChild(floor_3);
            this.gameSceneryStaticObjects.push(floor_3);
            floor_3.x = 220;
            floor_3.y = 242 + platform_offset;
        }
        private CreateFloorTwo(platform_offset:number = 8): void {
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 60, 1 + platform_offset);
            this.addChild(floor_2_1);
            this.gameSceneryStaticObjects.push(floor_2_1);
            floor_2_1.x = 780;
            floor_2_1.y = 357 + platform_offset;

            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 455, 1 + platform_offset);
            this.addChild(floor_2_2);
            this.gameSceneryStaticObjects.push(floor_2_2);
            floor_2_2.x = 220;
            floor_2_2.y = 357 + platform_offset;
        }
        private CreateFloorOne(platform_offset:number = 8): void {

            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 620, 1 + platform_offset);
            this.addChild(floor_1);
            this.gameSceneryStaticObjects.push(floor_1);
            floor_1.x = 220;
            floor_1.y = 472 + platform_offset;
        }
        private CreateBasement(platform_offset:number = 8): void {
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 620, 1 + platform_offset);
            this.addChild(floor_0);
            this.gameSceneryStaticObjects.push(floor_0);
            floor_0.x = 220;
            floor_0.y = 580 + platform_offset;
        }
        private CreateFloors(): void {
            //Floors platforms
            this.CreateBasement();
            this.CreateFloorOne();
            this.CreateFloorTwo();
            this.CreateFloorThree();
            this.CreateFloorFour();
        }

    }
}