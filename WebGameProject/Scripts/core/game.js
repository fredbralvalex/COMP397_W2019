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
    function Init() {
        console.log("Initialization start");
        Start();
    }
    function Start() {
        console.log("Starting Application...");
        //Initialize CreateJS
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function Update() {
        stage.update();
        helloLabel.rotation += 2;
    }
    function Main() {
        console.log("Game start...");
        /*
        helloLabel = new createjs.Text("Bye bye  World!", "40px Consolate", "#000000");
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
//# sourceMappingURL=game.js.map