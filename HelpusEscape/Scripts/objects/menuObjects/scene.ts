module objects {
  export class Scene extends createjs.Container {
    //Audio
    protected backgroundMusic:createjs.AbstractSoundInstance;
    protected isPlaying: boolean=false;
    public assetManager;
    public isPaused: boolean;
    public timer:number;
    private dead_sound:createjs.AbstractSoundInstance;

    protected title: objects.Label;
    protected titleShadow: objects.Label;

    //private backButton: objects.Button;
    protected pauseButton: objects.Button;

    //it must be a list each level can have the amount of ghost desired
    // each level must be responsibe to create its own ghosts
    protected enemies: objects.Enemy[];

    
    protected menuButton: objects.Button;
    protected menuTxtButton: objects.Label;
    
    //private ghost: objects.Enemy;


    protected timeRemaining: objects.Label;
    protected timerCounter: number = 0;

    protected pauseBackground: objects.Background;
    protected resumeText: objects.Label;
    protected gamePausedText: objects.Label;

    protected overTitle: objects.Label;
    protected timesUp: objects.Label;


    protected positionInventoryP2: math.Vec2 = new math.Vec2(25, 350);
    protected positionInventoryP1: math.Vec2 = new math.Vec2(970, 50);

    protected player1: objects.Player;
    protected player2: objects.Player;

    protected pauseTxtButton: objects.Label;

    protected background_main: objects.Background;
    protected background_shadow: objects.Background;
    protected background_shadow_1: objects.Background;

    protected gameBoundaries: objects.EmptyGameObject[];
    protected gameSceneryStaticObjects: objects.EmptyGameObject[];
    protected gameSceneryDynamicObjects: objects.DynamicObject[];

    constructor(assetManager: createjs.LoadQueue) {
      super();
      this.assetManager = assetManager;
    }

    public createDialog(scene:objects.Scene, text: string): any {
      return new function() {
          
          this.dialog = new objects.Dialog(scene.assetManager, text);

          this.showDialog = function ():void{
              this.dialog.showDialog(scene);
          };
          this.disposeDialog = function ():void{
              this.dialog.hideDialog(scene);
          };
      };
  }

  public CreateFunctionCheck(gameObject: objects.GameObject) {
      let boxCollider: objects.BoxCollider = gameObject.boxCollider;
      return (x:number, y:number, g:boolean): managers.AABB => {
          let collided = false;
          let aabbCollider = boxCollider.GetAABB(x, y);
          let result: managers.AABB;

          //let col = false;
          for (let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
              var platform = this.gameSceneryStaticObjects[i];
              result = managers.Collision.CheckAABBCollision(aabbCollider, platform.boxCollider.aabb);
              if (result.CheckCollided()) {
                result.objectCollided = platform;
                collided = true;
                
                break;
              }
          }
          //collided = col;
          if (!collided) {
              for (let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
                  var object = this.gameSceneryDynamicObjects[i];
                  if (object.name !== gameObject.name) {

                      result = managers.Collision.CheckAABBCollision(aabbCollider, object.boxCollider.aabb);

                      if (result.CheckCollided()) {
                          collided = true;
                          result.objectCollided = object;
                          if (gameObject instanceof objects.Player) {
                              object.player = <objects.Player>gameObject;//informing which player did the action

                              object.aabbResultPlayer = result;
                              
                              gameObject.actionObjects.push(object);
                              if (!object.alreadyHandled && !gameObject.hasPassed && !gameObject.isDead) {
                                  //show Dialog
                                  if (gameObject.dialog != null) {
                                      gameObject.dialog.showDialog();
                                  }
                              }
                              if (g && (object instanceof PushableObject || object instanceof OpenableObject || object instanceof HatchPlatform)) {
                                break;
                              }
                          } else if (object instanceof InformativePoint) {

                          } else {
                            break;
                          }                
                      }
                  }
              }
          }

          if (!collided && gameObject instanceof objects.Player) {
              if (gameObject.dialog != null || gameObject.hasPassed || gameObject.isDead) {
                  gameObject.dialog.disposeDialog();
              }
              gameObject.actionObjects.pop();
          }
          return result;
      };
  }

  protected fn_pauseButtonClick():void
  {
      console.log("called");     
            
      objects.Game.keyboard.pause = !objects.Game.keyboard.pause;      
  }

  protected fn_menuButtonClick():void
  {
            
      objects.Game.keyboard.pause = false;
      objects.Game.currentScene = config.Scene.START;
  }

  protected GetPositionE1():math.Vec2 {
    return null;
  }

  protected GetPositionE2():math.Vec2 {
    return null;
  }

    protected GetPositionP1():math.Vec2 {
      return null;
    }

    protected GetPositionP2():math.Vec2 {
      return null;
    }

    protected GetLevelName():string {
      return null;
    }

    protected GetBackgroundAsset():string {
      return null;
    }

    protected GetBackgroundShadowAsset():string {
      return null;
    }

    public Start(): void {
      //objects.Game.isDebug = true;
      objects.Game.playerDead = false;
      objects.Game.keyboard = new managers.Keyboard();
      objects.Player.onePlayerGone = false;
      this.isPaused = false;
      this.gameBoundaries = new Array<objects.EmptyGameObject>();
      this.gameSceneryStaticObjects = new Array<objects.EmptyGameObject>();
      this.gameSceneryDynamicObjects = new Array<objects.DynamicObject>();

      this.enemies = new Array<objects.Enemy>();

      this.CreateEnemies();
      
      
      console.log("GAME SCENE(S)...");

      this.timeRemaining = new objects.Label(objects.Game.stageTimer.toString(), "bold 32px", "Cambay", "#000000", 50, 65, true);

      this.background_main = new objects.Background(this.assetManager, this.GetBackgroundAsset());
      this.background_shadow = new objects.Background(this.assetManager, this.GetBackgroundShadowAsset());

      objects.Game.controlsImage = new objects.UIHelper(this.assetManager, "controls", 1066 * 0.5, 600 * 0.5);
      objects.Game.controlsImage.visible = false ;


      //#region pause button
      this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", 0, 0, true);
      this.resumeText = new objects.Label("Resume", "20px", "Cambay", "#ffffff", 0, 0, true);
      this.pauseButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.088, 600 * 0.95, this.pauseTxtButton, true);
      this.pauseButton.scaleX = 0.75;
      this.gamePausedText = new objects.Label("Game Paused", "bold 48px", "Cambay", "#ffffff", 1066 / 2, 600 / 4, true);
      this.gamePausedText.visible = false;


      
      this.menuTxtButton = new objects.Label("Start Menu", "20px", "Cambay", "#ffffff", 0, 0, true);
      this.menuButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.088, 600 * 0.95, this.menuTxtButton, true);
      this.menuButton.on("click",this.fn_menuButtonClick)
      this.menuButton.scaleX = 0.75;
      this.menuButton.x = 1066 * 0.5;
      this.menuButton.y = 600 * 0.85;
      this.menuButton.text.x = 1066 * 0.5;
      this.menuButton.text.y = 600 * 0.85;
      this.menuButton.visible = false;
      this.menuButton.text.visible = false;

      //#endregion

      this.title = new objects.Label(this.GetLevelName(), "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
      this.title.alpha = 1;

      //this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550, this.title);

      this.titleShadow = new objects.Label(this.GetLevelName(), "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
      this.titleShadow.alpha = 0.5;

      //#region Player Init
      let inventory = new objects.Inventory(this.assetManager);
      inventory.x = this.positionInventoryP1.x;
      inventory.y = this.positionInventoryP1.y;
      let pp1 = this.GetPositionP1();
      this.player1 = new objects.Player(this.assetManager, 1, inventory, pp1.x, pp1.y);            
      //for using bitmap
      //this.player1.boxCollider = new objects.BoxCollider(18, 16, this.player1.x, this.player1.y, this.player1.width - 45, this.player1.height - 20);
      this.player1.boxCollider = new objects.BoxCollider(0, 16, this.player1.x, this.player1.y, this.player1.width - 40, this.player1.height - 29);
      this.player1.dialog = this.createDialog(this, "...");

      let inventory2 = new objects.Inventory(this.assetManager);
      inventory2.x = this.positionInventoryP2.x;
      inventory2.y = this.positionInventoryP2.y;
      let pp2 = this.GetPositionP2();
      this.player2 = new objects.Player(this.assetManager, 2, inventory2, pp2.x, pp2.y);            
      //for using bitmap
      //this.player2.boxCollider = new objects.BoxCollider(18, 16, this.player2.x, this.player2.y, this.player2.width - 45, this.player2.height - 20);
      this.player2.boxCollider = new objects.BoxCollider(0, 16, this.player2.x, this.player2.y, this.player2.width - 40, this.player2.height - 29);            
      this.player2.dialog = this.createDialog(this, "...");
      //#endregion

      //#region PauseMenu
      this.pauseBackground = new objects.Background(this.assetManager, "pauseBackground");
      this.pauseBackground.alpha = 0.8;
      this.pauseBackground.regX = this.pauseBackground.getBounds().width * 0.5;
      this.pauseBackground.regY = this.pauseBackground.getBounds().height * 0.5;
      this.pauseBackground.x = 1066 / 2;
      this.pauseBackground.y = 600 / 2;
      this.pauseBackground.scaleX = 0.9;
      this.pauseBackground.scaleY = 0.9;
      this.pauseBackground.visible = false;
      //#endregion

      this.overTitle = new objects.Label("Player dead...", "bold 50px", "Cambay", "#960000", (1066 / 2), 600 *0.35, true);
      this.timesUp = new objects.Label("Time is up...", "bold 50px", "Cambay", "#960000", (1066 / 2), 600 *0.35, true);
    }

    public Update(): void {
      this.CheckBoundaries();
      this.CheckPaused();
      this.pauseBackground.visible = this.isPaused;
      this.gamePausedText.visible = this.isPaused;
      if (this.isPaused) {
          this.pauseButton.text = this.resumeText;
          this.addChild(this.resumeText);
          this.removeChild(this.pauseTxtButton);
          this.pauseButton.x = 1066 / 2;
          this.pauseButton.y = 600 * 0.75;
          this.pauseButton.text.x = 1066 / 2;
          this.pauseButton.text.y = 600 * 0.75;

          this.menuButton.visible = true;
          this.menuButton.text.visible = true;

          return;
      }
      else {
          this.pauseButton.text = this.pauseTxtButton;
          this.addChild(this.pauseTxtButton);
          this.removeChild(this.resumeText);
          this.pauseButton.x = 1066 * 0.088;
          this.pauseButton.y = 600 * 0.95;
          this.pauseButton.text.x = 1066 * 0.088;
          this.pauseButton.text.y = 600 * 0.95;

          this.menuButton.visible = false;
          this.menuButton.text.visible = false;

      }

      this.timerCounter++;
      //double the speed of the timer in the case the first player reach the end without the second player
      let speedTimer = Player.onePlayerGone?1/2:1;
      if (this.timerCounter >= objects.Game.frameRate*speedTimer) {
        this.timer--;
        this.timerCounter = 0;
      }      
      
      if (this.timer <= 0) {
          this.timer = 0;
          this.GoDie();
      }

      this.timeRemaining.text = this.timeRemaining.fn_ChangeLabel(this.timer);

      let CheckMovementP1 = this.CreateFunctionCheck(this.player1);
      let CheckMovementP2 = this.CreateFunctionCheck(this.player2);

      this.player1.UpdateIfPossible(CheckMovementP1);
      this.player2.UpdateIfPossible(CheckMovementP2);

      this.enemies.forEach(enemy => {
        enemy.Update();

        if (!this.player1.hasPassed) {
          this.player1.isDead = managers.Collision.CheckDistance(this.player1, enemy);
        }

        if (!this.player2.hasPassed) {
          this.player2.isDead = managers.Collision.CheckDistance(this.player2, enemy);
        }

        if(this.player1.isDead || this.player2.isDead){ 
                    
           this.GoDie();      
           this.removeChild(enemy);    
        }
      });
      
      for (let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
          var platform = this.gameSceneryStaticObjects[i];
          platform.Update();
      }

      for (let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
          var object = this.gameSceneryDynamicObjects[i];
          object.UpdateIfPossible(this.CreateFunctionCheck(object));
      }
    }

    
    protected GoToNextLevel (): void {      
      objects.Game.currentScene = config.Scene.REWARD;
    }

    protected GoDie():void {
      this.player1.isDead = true;
      this.player2.isDead = true;

      if (!this.dead_sound) {
        if (objects.Game.isPlayingMusic == true) {
          if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            objects.Game.isPlayingMusic=false;
          }
        }
        this.dead_sound = createjs.Sound.play("dying");  
        this.dead_sound.volume = 0.3
      }
      this.player1.visible = false;
      this.player2.visible = false;
      this.player1.spriteRenderer.visible = false;
      this.player2.spriteRenderer.visible = false;
      this.player2.dialog.showDialog = () =>{};
      this.player1.dialog.showDialog = () =>{};
      
      var overNote = (): void => {        
        objects.Game.playerDead = true;
        objects.Game.currentScene = config.Scene.FINISH;
      }

      this.StartCount(2, overNote);
      if (this.timer<= 0) {

      } else {
        this.overTitle.visible = true;
      }
    }
    
    protected CreateBoundaries () :void {
      var boundary_1 = new objects.EmptyGameObject(this.assetManager, "wall_l", 1066, 1);
      boundary_1.x = 0;
      boundary_1.y = 0;
      this.addChild(boundary_1);

      var boundary_2 = new objects.EmptyGameObject(this.assetManager, "wall_r", 1, 650);
      boundary_2.x = 1050;
      boundary_2.y = 0;
      this.addChild(boundary_2);

      var boundary_3 = new objects.EmptyGameObject(this.assetManager, "wall_l", 210, 1);
      boundary_3.x = 840;
      boundary_3.y = 510;
      this.addChild(boundary_3);

      this.gameBoundaries.push(boundary_1);
      this.gameBoundaries.push(boundary_2);
      this.gameBoundaries.push(boundary_3);

    };

    protected CreateScenery: () => void;
    protected CreateEnemies: () => void;
    protected CreateBackgroundEffects ():void { };
    protected ChangeBackground : () => void;

    public Main(): void {
      this.timer = objects.Game.stageTimer;
      this.addChild(this.background_main);

      this.addChild(this.timeRemaining);

      this.addChild(this.titleShadow);
      this.addChild(this.title);

      //this.addChild(this.backButton);
      //this.addChild(this.txtButton);

      this.addChild(this.player1.inventory);
      this.addChild(this.player1.picture);

      this.addChild(this.player2.inventory);
      this.addChild(this.player2.picture);

      this.CreateScenery();
      this.CreateBoundaries();

      this.addChild(this.player1.spriteRenderer);
      this.addChild(this.player2.spriteRenderer);

      this.enemies.forEach(ghost => {
        this.addChild(ghost);
      });     

      this.CreateBackgroundEffects();            
      this.addChild(this.background_shadow);


      //create the empties gameobjects to be the stage boundaries

      //this.backButton.on("click", this.fn_ButtonClick);

      var callback = (): void => {
          this.removeChild(this.title);
          this.removeChild(this.titleShadow);
      }
      this.StartCountdown(3, callback);
      
      this.addChild(this.overTitle);
      this.overTitle.visible = false;

      this.addChild(this.timesUp);
      this.timesUp.visible = false;

      this.addChild(this.pauseBackground);

      this.addChild(this.pauseButton);
      this.addChild(this.pauseButton.text);

      this.addChild(this.gamePausedText);

      //this.backButton.on("click", this.fn_ButtonClick);
      this.pauseButton.on("click", this.fn_pauseButtonClick);
                  
      this.addChild(this.pauseTxtButton);

      this.addChild(this.menuButton);
      this.addChild(this.menuButton.text);
      this.addChild(objects.Game.controlsImage);
      
      //this.backButton.on("click", this.fn_ButtonClick);
      
      //this.menuButton.on("click", this.fn_controlsButtonClick);
    }

    public CheckPaused(): void {   
      if (this instanceof scenes.StageOne
        || this instanceof scenes.StageTwo
        || this instanceof scenes.StageThree) {

        this.isPaused = objects.Game.keyboard.pause;
      }   

      if (this.isPaused) {
        objects.Game.controlsImage.visible = true;            
      } else {
        objects.Game.controlsImage.visible = false;
      }
    }

    public StartCountdown(seconds, callback: () => any): void {
      var counter = seconds;

      var interval = setInterval(() => {
        //console.log(counter);
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          callback();
          //console.log('Ding!');
        };
      }, 1000);
    };


    public StartCount(seconds, overNote: () => any): void {
      var counter = seconds;

      var interval = setInterval(() => {
        //console.log(counter);
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          overNote();
          //console.log('Ding!');
        };
      }, 1000);
    };

    public CheckBoundaries(): void {

        this.gameBoundaries.forEach(deadEnd => {
          deadEnd.Update();

          let result_1 = managers.Collision.CheckAABBCollision(this.player1.boxCollider.aabb, deadEnd.boxCollider.aabb);
          let result_2 = managers.Collision.CheckAABBCollision(this.player2.boxCollider.aabb, deadEnd.boxCollider.aabb);

          this.player1.isDead = result_1.CheckCollided();
          this.player2.isDead = result_2.CheckCollided();
         
          if(this.player1.isDead || this.player2.isDead){             
             this.GoDie();
          }          
        });    
    }
  }
}