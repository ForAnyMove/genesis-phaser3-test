class Gameplay1 extends Phaser.Scene {
  constructor() {
    super("gameplay1");
    this.timeDuration = 0;
    this.updateInterval = 100;
    this.size = 1;
    this.slideRight = true;
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("hero-shy", "assets/img/intro-shy.png");
    this.load.image("hero-happy", "assets/img/intro-happy.png");
    this.load.image("fun2-bag1-true", `assets/img/fun2-bag1-true.png`);
    this.load.image("fun2-bag2-true", `assets/img/fun2-bag2-true.png`);
    this.load.image("fun2-bag1-false", `assets/img/fun2-bag1-false.png`);
    this.load.image("fun2-bag2-false", `assets/img/fun2-bag2-false.png`);
    this.load.image("bag2", "assets/img/bag2.png");
    this.load.image("bag1", "assets/img/bag1.png");
    this.load.image("hand", "assets/img/hand.png");
    this.load.image("face-default", "assets/img/face-default.png");
    this.load.image("face-fun", "assets/img/face-fun.png");
    this.load.image("timeline2", "assets/img/timeline2.png");
  }
  create() {
    this.cameras.main.fadeIn(200, 0, 0, 0)
    this.heroWithBag1 =
      this.scene.settings.data.imgTag === "happy1-true"
        ? "fun2-bag1-true"
        : "fun2-bag1-false";
    this.heroWithBag2 =
      this.scene.settings.data.imgTag === "happy1-true"
        ? "fun2-bag2-true"
        : "fun2-bag2-false";
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.hero = this.add.image(300, 490, this.scene.settings.data.imgTag);
    this.heroFace = this.add.image(300, 530, "face-default");
    this.hero.setScale(this.size).setDepth(1);
    this.heroFace.setScale(1.5).setDepth(2);
    this.container = this.add.image(300, 30, "choose");
    this.bag1 = this.add.image(160, 700, "bag1").setInteractive();
    this.bag1.setDepth(3);
    this.bag2 = this.add.image(440, 700, "bag2").setInteractive();
    this.bag2.setDepth(3);

    this.bag1.on("pointerdown", (pointer) => {
      this.bag1._events.pointerdown.fn = ''
      this.bag2._events.pointerdown.fn = ''
      this.bag1.setAlpha(0.6);
      this.container.destroy();
      this.heroAlt = this.add.image(300, 490, this.heroWithBag1);
      this.heroAlt.setScale(this.size).setDepth(2);
      this.heroFace = this.add.image(300, 530, "face-fun");
      this.heroFace.setScale(1.5).setDepth(3);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1-this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline2");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay2", {
              imgTag: this.heroWithBag1,
              win: this.scene.settings.data.win,
            });
          }
        );
      }, 1500);
    });

    this.bag1.on("pointerout", (pointer) => {
      this.bag1.setAlpha(1);
    });

    this.bag1.on("pointerup", (pointer) => {
      this.bag1.setAlpha(1);
    });

    this.bag2.on("pointerdown", (pointer) => {
      this.bag1._events.pointerdown.fn = ''
      this.bag2._events.pointerdown.fn = ''
      this.bag2.setAlpha(0.6);
      this.container.destroy();
      this.heroAlt = this.add.image(300, 490, this.heroWithBag2);
      this.heroAlt.setScale(this.size).setDepth(2);
      this.heroFace = this.add.image(300, 530, "face-fun");
      this.heroFace.setScale(1.5).setDepth(3);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1-this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline2");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay2", {
              imgTag: this.heroWithBag2,
              win: this.scene.settings.data.win,
            });
          }
        );
      }, 1500);
    });

    this.bag2.on("pointerout", (pointer) => {
      this.bag2.setAlpha(1);
    });

    this.bag2.on("pointerup", (pointer) => {
      this.bag2.setAlpha(1);
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
