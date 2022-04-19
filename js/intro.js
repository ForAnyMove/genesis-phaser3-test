class Intro extends Phaser.Scene {
  constructor() {
    super("intro");
    this.timeDuration = 0;
    this.updateInterval = 100;
    this.size = 1.55;
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("overlay", "assets/img/Rectangle.png");
    this.load.image("hero-default", "assets/img/intro-default.png");
    this.load.image("hero-fun", "assets/img/intro-fun.png");
    this.load.image("hero-happy", "assets/img/intro-happy.png");
    this.load.image("hero-oups", "assets/img/intro-oups.png");
    this.load.image("hero-shy", "assets/img/intro-shy.png");
    this.load.image("hero-sad", "assets/img/intro-sad.png");
    this.load.image("dialog1", "assets/img/Lexy1.png");
    this.load.image("dialog2", "assets/img/Lexy2.png");
  }
  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.background = this.add.image(0, 0, "overlay");
    this.background.setOrigin(0, 0);
    this.hero = this.add.image(300, 470, "hero-default");
    this.hero.setScale(this.size);
    const timerHero = this.time.addEvent({
      delay: 20,
      callback: () => {
        this.timeDuration += 0.1;
        this.hero.setAlpha(this.timeDuration);
      },
      repeat: 10,
    });
    const timerHero2 = this.time.delayedCall(200, () => {
      const timerHero3 = this.time.addEvent({
        delay: 25,
        callback: () => {
          this.size -= 0.05;
          this.hero.setScale(this.size);
        },
        repeat: 4,
      });
    });
    const timer2 = this.time.delayedCall(300, () => {
      this.hero.destroy();
      this.hero = this.add.image(300, 450, "hero-oups");
      this.hero.setScale(this.size);
      this.dialogContainer = this.add.image(300, 400, "dialog1");
      this.dialogContainer.setScale(0.25).setDepth(2);
      const firstAnim = this.time.addEvent({
        delay: 150,
        callback: () => {
          const repeatAnim = firstAnim.getRepeatCount();
          if (repeatAnim % 2 === 1) {
            this.hero.destroy();
            this.hero = this.add.image(300, 450, "hero-oups");
            this.hero.setScale(this.size);
          } else {
            this.hero.destroy();
            this.hero = this.add.image(300, 450, "hero-default");
            this.hero.setScale(this.size);
          }
        },
        repeat: 4,
      });
    });
    const timer3 = this.time.delayedCall(900, () => {
      this.hero.destroy();
      this.hero = this.add.image(300, 450, "hero-fun");
      this.hero.setScale(this.size);
      this.dialogContainer = this.add.image(300, 400, "dialog2");
      this.dialogContainer.setScale(0.25).setDepth(2);
      const firstAnim = this.time.addEvent({
        delay: 150,
        callback: () => {
          const repeatAnim = firstAnim.getRepeatCount();
          if (repeatAnim % 2 === 1) {
            this.hero.destroy();
            this.hero = this.add.image(300, 450, "hero-fun");
            this.hero.setScale(this.size);
          } else {
            this.hero.destroy();
            this.hero = this.add.image(300, 450, "hero-happy");
            this.hero.setScale(this.size);
          }
        },
        repeat: 4,
      });
    });
    const nextScene = this.time.delayedCall(1500, () => {
      this.cameras.main.fadeOut(200, 0, 0, 0);
      this.cameras.main.once(
        Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
        (cam, effect) => {
          this.scene.start("tutorial");
        }
      );
    });
  }
}
