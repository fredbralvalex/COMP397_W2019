module objects
{
    export class Game
    {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static keyboard: managers.Keyboard;
        public static isDebug: boolean;

        public static width: number = 1060;
        public static height: number = 600;

    }
}