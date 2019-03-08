// IIFE - Immediate Invoked Fucntion Expression
/*
    Closure
    Calls an anonympous self-executing function
    Anything in braces is in a closure. Won't go to global namespace.
*/
(function () {
    //Global Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    //let helloLabel: createjs.Text;
    var helloLabel;
    //let clickablebutton:createjs.Bitmap;
    var clickablebutton;
    var assetManager;
    var assetManifest; // Basically a "struct". Placeholder for now.\
    var currentScene;
    var currentState;
    function Init() {
        console.log("Initialization start");
        Start();
    }
    function Start() {
        console.log("Starting Application...");
        //Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); //frequency of checks. Computationally expensive function.
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function Update() {
        stage.update();
        //helloLabel.rotation += 5;
    }
    /* BUTTON EVENT LISTENER FUNCTIONS */
    function clickableButtonMouseOver() {
        clickablebutton.alpha = 0.7;
    }
    function clickableButtonMouseOut() {
        clickablebutton.alpha = 1.0;
    }
    function clickableButtonClick() {
        helloLabel.text = "Clicked!";
        //helloLabel.updatePosition();
        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    }
    function Main() {
        console.log("Game start...");
        /*
        helloLabel = new createjs.Text("Bye bye  World", "40px Consolate", "#000000");
        helloLabel.x = 100;
        helloLabel.y = 100;

        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;

        */
        helloLabel = new objects.Label("Hello World!", "40px", "Consolate", "#000000", 320, 240, true);
        stage.addChild(helloLabel);
        /*
                clickablebutton = new createjs.Bitmap("./Assets/Sprites/clickablebutton.png");
                clickablebutton.regX = clickablebutton.getBounds().width * 0.5;
                clickablebutton.regY = clickablebutton.getBounds().height * 0.5;
                clickablebutton.x = 320;
                clickablebutton.y = 340;
                stage.addChild(clickablebutton);
        
                clickablebutton.on("mouseover", clickableButtonMouseOver);
                clickablebutton.on("mouseout", clickableButtonMouseOut);
                */
        clickablebutton = new objects.Button("./Assets/Sprites/clickablebutton.png", 320, 340);
        //clickablebutton.regX = clickablebutton.getBounds().width * 0.5;
        //clickablebutton.regY = clickablebutton.getBounds().height * 0.5;
        clickablebutton.on("click", clickableButtonClick);
        stage.addChild(clickablebutton);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map