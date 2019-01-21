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

    function Init(): void {
        console.log("Initialization start");

        Start();
    
    }

    function Start (): void {
        console.log("Starting Application...");
        //Initialize CreateJS
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        Main();
    }

    function Update (): void {
        stage.update();
        //helloLabel.rotation += 5;
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
    }

    window.onload = Init;
})();