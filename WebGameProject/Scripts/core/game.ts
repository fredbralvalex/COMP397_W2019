// IIFE - Immediate Invoked Fucntion Expression
/*
    Closure
    Calls an anonympous self-executing function
    Anything in braces is in a closure. Won't go to global namespace.
*/
(function() {


    //Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    //let helloLabel: createjs.Text;
    let helloLabel: objects.Label;
    //let clickablebutton:createjs.Bitmap;
    let clickablebutton:objects.Button;


    let assetManager: createjs.LoadQueue;
    let assetManifest: any[];                         // Basically a "struct". Placeholder for now.\

    let currentScene: objects.Scene;
    let currentState:number;
    
    function Init(): void {
        console.log("Initialization start");

        Start();
    
    }

    function Start (): void {
        console.log("Starting Application...");
        //Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);//frequency of checks. Computationally expensive function.
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        Main();
    }

    function Update (): void {
        stage.update();
        //helloLabel.rotation += 5;
    }

    /* BUTTON EVENT LISTENER FUNCTIONS */

    function clickableButtonMouseOver():void {
        clickablebutton.alpha = 0.7;
    }

    function clickableButtonMouseOut():void {
        clickablebutton.alpha = 1.0;
    }
    
    function clickableButtonClick():void {
        helloLabel.text = "Clicked!";
        //helloLabel.updatePosition();
        helloLabel.regX = helloLabel.getMeasuredWidth() * 0.5;
        helloLabel.regY = helloLabel.getMeasuredHeight() * 0.5;
    }

    function Main (): void {
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