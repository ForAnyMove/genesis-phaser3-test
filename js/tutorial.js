class Tutorial extends Phaser.Scene {
  constructor() {
    super("tutorial");
    this.timeDuration = 0;
    this.updateInterval = 100;
    this.size = 1.45;
    this.altSize = 1;
    this.slideRight = true;
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("overlay", "assets/img/Rectangle.png");
    this.load.image("choose", "assets/img/choose.png");
    this.load.image("hero-shy", "assets/img/intro-shy.png");
    this.load.image("hero-happy", "assets/img/intro-happy.png");
    this.load.image("happy1-true", "assets/img/happy1-true.png");
    this.load.image("happy1-false", "assets/img/happy1-false.png");
    this.load.image("costume", "assets/img/costume.png");
    this.load.image("dress", "assets/img/dress.png");
    this.load.image("hand", "assets/img/hand.png");
    this.load.image("timeline", "assets/img/timeline1.png");
  }
  create() {
    this.cameras.main.fadeIn(200, 0, 0, 0)
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.background2 = this.add.image(0, 0, "overlay");
    this.background2.setOrigin(0, 0);
    this.hero = this.add.image(300, 490, "hero-shy");
    this.hero.setScale(this.size).setDepth(1);
    this.container = this.add.image(300, 30, "choose");
    this.dress = this.add.image(160, 700, "dress").setInteractive();
    this.dress.setScale(0.5).setDepth(3);
    this.costume = this.add.image(440, 700, "costume").setInteractive();
    this.costume.setScale(0.5).setDepth(3);

    this.dress.on("pointerdown", (pointer) => {
      this.dress._events.pointerdown.fn = "";
      this.costume._events.pointerdown.fn = "";
      this.costume.setAlpha(0.6);
      this.background2.destroy();
      this.container.destroy();
      this.heroAlt = this.add.image(300, 470, "happy1-true");
      this.heroAlt.setScale(this.altSize).setDepth(2);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1 - this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay1", {
              imgTag: "happy1-true",
              win: true,
            });
          }
        );
      }, 1500);
    });

    this.dress.on("pointerout", (pointer) => {
      this.dress.setAlpha(1);
    });

    this.dress.on("pointerup", (pointer) => {
      this.dress.setAlpha(1);
    });

    this.costume.on("pointerdown", (pointer) => {
      this.dress._events.pointerdown.fn = "";
      this.costume._events.pointerdown.fn = "";
      this.costume.setAlpha(0.6);
      this.background2.destroy();
      this.container.destroy();
      this.heroAlt = this.add.image(300, 470, "happy1-false");
      this.heroAlt.setScale(this.altSize).setDepth(2);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1 - this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay1", {
              imgTag: "happy1-false",
              win: false,
            });
          }
        );
      }, 1500);
    });

    this.costume.on("pointerout", (pointer) => {
      this.costume.setAlpha(1);
    });

    this.costume.on("pointerup", (pointer) => {
      this.costume.setAlpha(1);
    });
    const handPointer = this.time.delayedCall(2000, () => {
      this.hand = this.add.image(220, 750, "hand");
      this.hand.setScale(0.7).setDepth(4);
    });
  }

  moveHand(hand, speed) {
    hand.x += speed;
  }
  update() {
    if (this.hand) {
      if (this.hand.x > 440) {
        this.slideRight = !this.slideRight;
      } else if (this.hand.x < 200) {
        this.slideRight = !this.slideRight;
      }
      if (this.slideRight) {
        this.moveHand(this.hand, 3);
      } else {
        this.moveHand(this.hand, -3);
      }
    }
  }
}
