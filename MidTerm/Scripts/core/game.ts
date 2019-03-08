/// <reference path="_references.ts"/>
// IIFE - Immediate Invoked Fucntion Expression
/*
    Closure
    Calls an anonympous self-executing function
    Anything in braces is in a closure. Won't go to global namespace.
*/
(function() {
console.log('code ran');
    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;
    //let nextStage:createjs.Stage;

    let assetManager: createjs.LoadQueue;
    let assetManifest: any[];

    let currentScene: objects.Scene;
    let currentState: number;

    assetManifest = [
        {id: "empty", src:"../Assets/Sprites/empty.png"},
        {id: "start", src:"../Assets/Background/start.png"},
        {id: "end", src:"../Assets/Background/end.png"},
        {id: "path", src:"../Assets/Background/path.png"},
        {id: "wall", src:"../Assets/Background/wall.png"},
        {id: "startButton", src:"../Assets/Sprites/startButton.png"},
        {id: "smallButton", src:"../Assets/Sprites/smallButton.png"},
        {id: "char_up", src:"../Assets/Sprites/char_2.png"},
        {id: "char_down", src:"../Assets/Sprites/char_1.png"},
        {id: "char_left", src:"../Assets/Sprites/char_3.png"},
        {id: "play_music", src:"../Assets/Audio/Ove_Melaa_They_Ate_My_Family.mp3"},   
        {id: "menu_music", src:"../Assets/Audio/Ove_Melaa_DrumLoop_64BPM.mp3"},
        {id: "char_right", src:"../Assets/Sprites/char_4.png"}
    ];
    function Init():void {
        console.log("Initialization start");

        assetManager = new createjs.LoadQueue;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }

    function Start():void {
        console.log("Starting Application...");

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);

        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        console.log(objects.Game.currentScene);
        Main();
    }

    function Update():void {
        
        if(currentState != objects.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update();
        
    }

    function Main():void {
        switch(objects.Game.currentScene)
        {
            case config.Scene.START:
            stage.removeAllChildren();
            currentScene = new scenes.StartScene(assetManager);
            stage.addChild(currentScene);
            break;
            case config.Scene.INGAME:
            stage.removeAllChildren();
            currentScene = new scenes.GameScene(assetManager);
            stage.addChild(currentScene);
            break;
            case config.Scene.FINISH:
            stage.removeAllChildren();
            currentScene = new scenes.SuccessScene(assetManager);
            stage.addChild(currentScene);
            break;
            case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.EndScene(assetManager);
            stage.addChild(currentScene);
            break;
            case config.Scene.BUILDER:
            stage.removeAllChildren();
            currentScene = new scenes.BuildScene(assetManager);
            stage.addChild(currentScene);
            break;
        }
        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
    }


    window.onload = Init;
})();
