window.onload = function() {
    function resize() {
        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = game.config.width / game.config.height;
    
        if(windowRatio < gameRatio){
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }
    const config = {
        width: 600,
        height: 900,
        backgroundColor: 0xffffff,
        scene: [Intro, Tutorial, Gameplay1, Gameplay2, Gameplay3, Loose, Amazing]
    }
    const game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}
