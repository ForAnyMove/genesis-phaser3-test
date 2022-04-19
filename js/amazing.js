class Amazing extends Phaser.Scene {
    constructor() {
      super("amazing");
      this.timeDuration = 0;
      this.sizeDuration = 0.4;
      this.updateInterval = 100;
      this.size = 1;
      this.slideRight = true;
    }
    preload() {
      this.load.image("boy", "assets/img/boy.png");
      this.load.image("bg-evening", "assets/img/bg-evening.png");
      this.load.image("bg-morning", "assets/img/bg-morning.png");
      this.load.image("win-text", "assets/img/win-text.png");
      this.load.image("swipe", "assets/img/swipe.png");
      this.load.image("textBox", "assets/img/textBox.png");
      this.load.image("arrow", "assets/img/arrow.png");
      this.load.image("face-fun", "assets/img/face-fun.png");
      this.load.image("face-glass-fun", "assets/img/face-glass-fun.png");
    }
    create() {
      this.cameras.main.fadeIn(200, 0, 0, 0)
      const url = "https://apps.apple.com/us/app/id1491717191"
      this.background = this.add.image(0, 0, this.scene.settings.data.bg);
      this.background.setOrigin(0, 0);
      this.heroBoy = this.add.image(390, 440, "boy");
      this.hero = this.add.image(210, 490, this.scene.settings.data.imgTag);
      this.heroFace = this.add.image(
        210,
        530,
        this.scene.settings.data.glass ? "face-glass-default" : "face-default"
      );
      this.hero.setScale(this.size).setDepth(2);
      this.heroFace.setScale(1.5).setDepth(3);
      const timerDialogWin = this.time.delayedCall(400, () => {
        this.textBox = this.add
          .image(310, 440, "textBox")
          .setDepth(4)
          .setScale(this.sizeDuration);
        this.winText = this.add
          .image(310, 450, "win-text")
          .setDepth(5)
          .setScale(this.sizeDuration);
        const firstAnimWin = this.time.addEvent({
          delay: 10,
          callback: () => {
            this.sizeDuration += 0.01;
            this.textBox.setScale(this.sizeDuration);
            this.winText.setScale(this.sizeDuration);
          },
          repeat: 40,
        });
      });
      const timerEmotionWin = this.time.delayedCall(800, () => {
        this.heroFace = this.add.image(
          210,
          530,
          this.scene.settings.data.glass ? "face-glass-fun" : "face-fun"
        );
        this.heroFace.setScale(1.5).setDepth(3);
      });
      const timerOverlay = this.time.delayedCall(1500, () => {
        this.background.setInteractive();
        this.swipe = this.add.image(300, 820, "swipe");
        this.swipe.setDepth(7);
        this.arrow = this.add.image(300, 680, "arrow").setDepth(7);
      });
      this.background.on("pointerdown", (pointer) => {
        window.location.assign (url);
      });
    }
    swipeSize(button, speed) {
      button.scale += speed;
    }
    update() {
      if (this.swipe) {
        if (this.swipe.scale > 1.1) {
          this.slideRight = !this.slideRight;
        } else if (this.swipe.scale < 0.9) {
          this.slideRight = !this.slideRight;
        }
        if (this.slideRight) {
          this.swipeSize(this.swipe, -0.005);
          this.arrow.alpha += 0.02;
        } else {
          this.swipeSize(this.swipe, 0.005);
          this.arrow.alpha -= 0.02;
        }
      }
    }
  }
  