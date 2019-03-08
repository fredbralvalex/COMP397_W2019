module scenes
{
    export class StartScene extends objects.Scene
    {
        private gameTitle: objects.Label;
        private gameDeveloper: objects.Label;
        private gameTitleShadow: objects.Label;
        private startButton: objects.Button;
        private buildButton: objects.Button;

        private subTitle: objects.Label;

        private txtStartButton: objects.Label;
        private txtBuildButton: objects.Label;

        private backgroundMusic:createjs.AbstractSoundInstance;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.backgroundMusic = createjs.Sound.play("menu_music");
            this.backgroundMusic.loop = -1; // Looping forever
            this.backgroundMusic.volume = 0.2;
            this.Start();
        }

        public Start():void
        {
            console.log("Main Menu/Start Menu...");        
                   
            this.startButton = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.6, true);
            this.startButton.scaleX = 0.75;
            this.txtStartButton = new objects.Label("PLAY", "20px", "Cambay", "#ff0000",this.startButton.x,this.startButton.y + 2, true);     

            this.buildButton = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.6 + 60, true);
            this.buildButton.scaleX = 0.75;
            this.txtBuildButton = new objects.Label("BUILD LEVEL", "20px", "Cambay", "#ff0000",this.buildButton.x,this.buildButton.y + 2, true);     

            this.gameTitle = new objects.Label("A - MAZE - ING!", "bold 64px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 4, true);
            this.gameTitle.alpha = 1;

            this.gameTitleShadow = new objects.Label("A - MAZE - ING!", "bold 64px", "Cambay", "#828166", (objects.Game.width / 2)+4, objects.Game.height / 4, true);
            this.gameTitleShadow.alpha = 0.75;

            this.gameDeveloper = new objects.Label("Frederico Alexandre", "bold 32px", "Cambay", "#960000", objects.Game.width / 2, (objects.Game.height / 2.2) , true);
            this.gameDeveloper.alpha = 1;

            this.subTitle = new objects.Label("And I really thought this name would be original!", "bold 24px", "Cambay", "#960000", objects.Game.width / 2, (objects.Game.height / 3) , true);
            this.subTitle.alpha = 1;

            this.Main();
        }

        public Main():void
        {
            this.InitializeLevel();
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);
            this.addChild(this.startButton);
            this.addChild(this.txtStartButton);
            
            this.addChild(this.buildButton);
            this.addChild(this.subTitle);
            this.addChild(this.txtBuildButton);

            this.addChild(this.gameDeveloper);
            this.startButton.on("click", ()=>{
                this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.INGAME;
            });
            this.buildButton.on("click", ()=>{
                this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.BUILDER;
            });
        }

        private InitializeLevel():void {
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, false);
            tiles.forEach(tile => {
                this.addChild(tile);
            });
        }
    }
}