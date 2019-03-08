module scenes
{
    export class SuccessScene extends objects.Scene
    {

        private gameTitle: objects.Label;
        private gameTitleShadow: objects.Label;

        private gameSubtitle: objects.Label;
        private gameSubtitleShadow: objects.Label;

        private playAgain: objects.Button;
        private startScene: objects.Button;

        private txtPlayAgain: objects.Label;
        private txtStartScene: objects.Label;

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
            console.log("End Game...");        
                   
            this.playAgain = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.5, true);
            this.playAgain.scaleX = 0.75;
            this.txtPlayAgain = new objects.Label("PLAY AGAIN", "20px", "Cambay", "#ff0000",this.playAgain.x,this.playAgain.y + 2, true);     

            this.startScene = new objects.Button(this.assetManager, "startButton", objects.Game.width * 0.5, objects.Game.height * 0.5 + 60, true);
            this.startScene.scaleX = 0.75;
            this.txtStartScene = new objects.Label("MENU", "20px", "Cambay", "#ff0000",this.startScene.x,this.startScene.y + 2, true);     

            this.gameTitle = new objects.Label("AMAZING!", "bold 48px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 4, true);
            this.gameTitle.alpha = 1;

            this.gameTitleShadow = new objects.Label("AMAZING!", "bold 48px", "Cambay", "#828166", (objects.Game.width / 2)+4, objects.Game.height / 4, true);
            this.gameTitleShadow.alpha = 0.75;

            this.gameSubtitle = new objects.Label("Thanks for Playing!", "bold 42px", "Cambay", "#960000", objects.Game.width / 2, objects.Game.height / 3, true);
            this.gameSubtitle.alpha = 1;

            this.gameSubtitleShadow = new objects.Label("Thanks for Playing!", "bold 42px", "Cambay", "#828166", (objects.Game.width / 2)+4, objects.Game.height / 3, true);
            this.gameSubtitleShadow.alpha = 0.75;

            this.Main();
        }

        public Main():void
        {
            this.InitializeLevel();
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);

            this.addChild(this.gameSubtitleShadow);
            this.addChild(this.gameSubtitle);

            this.addChild(this.playAgain);
            this.addChild(this.txtPlayAgain);
            
            this.addChild(this.startScene);
            this.addChild(this.txtStartScene);

            this.playAgain.on("click", ()=>{
                this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.INGAME;});
            this.startScene.on("click", ()=>{
                this.backgroundMusic.stop();
                objects.Game.currentScene = config.Scene.START;});
        }

        private InitializeLevel():void {
            var tiles = managers.LevelBuilder.CreateLevel(this.assetManager, false);
            tiles.forEach(tile => {
                this.addChild(tile);
            });
        }
    }
}