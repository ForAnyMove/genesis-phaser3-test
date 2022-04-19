class Loose extends Phaser.Scene {
  constructor() {
    super("loose");
    this.timeDuration = 0;
    this.sizeDuration = 0.4;
    this.updateInterval = 100;
    this.size = 1;
    this.slideRight = true;
  }
  preload() {
    this.load.image("boy", "assets/img/boy.png");
    this.load.image("textBox", "assets/img/textBox.png");
    this.load.image("loose-text", "assets/img/loose-text.png");
    this.load.image("face-sad", "assets/img/face-sad.png");
    this.load.image("face-glass-sad", "assets/img/face-glass-sad.png");
    this.load.image("bg-evening", "assets/img/bg-evening.png");
    this.load.image("bg-morning", "assets/img/bg-morning.png");
    this.load.image("retry", "assets/img/retry.png");
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
    const timerDialog = this.time.delayedCall(400, () => {
      this.textBox = this.add
        .image(310, 440, "textBox")
        .setDepth(4)
        .setScale(this.sizeDuration);
      this.looseText = this.add
        .image(310, 450, "loose-text")
        .setDepth(5)
        .setScale(this.sizeDuration);
      const firstAnim = this.time.addEvent({
        delay: 10,
        callback: () => {
          this.sizeDuration += 0.01;
          this.textBox.setScale(this.sizeDuration);
          this.looseText.setScale(this.sizeDuration);
        },
        repeat: 40,
      });
    });
    const timerEmotion = this.time.delayedCall(800, () => {
      this.heroFace = this.add.image(
        210,
        530,
        this.scene.settings.data.glass ? "face-glass-sad" : "face-sad"
      );
      this.heroFace.setScale(1.5).setDepth(3);
    });
    const timerOverlay = this.time.delayedCall(1500, () => {
      this.textBox.destroy();
      this.looseText.destroy();
      this.background.setInteractive();
      this.overlay = this.add.image(0, 0, "overlay");
      this.overlay.setOrigin(0, 0).setDepth(6);
      this.retry = this.add.image(300, 820, "retry");
      this.retry.setDepth(7);
    });
    this.background.on("pointerdown", (pointer) => {
      window.location.assign (url);
    });
  }
  retrySize(button, speed) {
    button.scale += speed;
  }
  update() {
    if (this.retry) {
      if (this.retry.scale > 1.1) {
        this.slideRight = !this.slideRight;
      } else if (this.retry.scale < 0.9) {
        this.slideRight = !this.slideRight;
      }
      if (this.slideRight) {
        this.retrySize(this.retry, -0.005);
      } else {
        this.retrySize(this.retry, 0.005);
      }
    }
  }
}
