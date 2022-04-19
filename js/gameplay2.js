class Gameplay2 extends Phaser.Scene {
  constructor() {
    super("gameplay2");
    this.timeDuration = 0;
    this.updateInterval = 100;
    this.size = 1;
    this.slideRight = true;
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("hero-shy", "assets/img/intro-shy.png");
    this.load.image("hero-happy", "assets/img/intro-happy.png");
    this.load.image(
      "fun3-bag1-true-glass",
      "assets/img/fun3-bag1-true-glass.png"
    );
    this.load.image(
      "fun3-bag1-true-choker",
      "assets/img/fun3-bag1-true-choker.png"
    );
    this.load.image(
      "fun3-bag2-true-glass",
      "assets/img/fun3-bag2-true-glass.png"
    );
    this.load.image(
      "fun3-bag2-true-choker",
      "assets/img/fun3-bag2-true-choker.png"
    );
    this.load.image(
      "fun3-bag1-false-glass",
      "assets/img/fun3-bag1-false-glass.png"
    );
    this.load.image(
      "fun3-bag1-false-necklace",
      "assets/img/fun3-bag1-false-necklace.png"
    );
    this.load.image(
      "fun3-bag2-false-glass",
      "assets/img/fun3-bag2-false-glass.png"
    );
    this.load.image(
      "fun3-bag2-false-necklace",
      "assets/img/fun3-bag2-false-necklace.png"
    );
    this.load.image("glass", "assets/img/glass.png");
    this.load.image("necklace", "assets/img/necklace.png");
    this.load.image("choker", "assets/img/choker.png");
    this.load.image("hand", "assets/img/hand.png");
    this.load.image("face-fun", "assets/img/face-fun.png");
    this.load.image("face-glass-fun", "assets/img/face-glass-fun.png");
    this.load.image("timeline3", "assets/img/timeline3.png");
  }
  create() {
    this.cameras.main.fadeIn(200, 0, 0, 0)
    const checkDress =
      this.scene.settings.data.imgTag === "fun2-bag1-true" ||
      this.scene.settings.data.imgTag === "fun2-bag2-true";
    let leftChoise;
    let rightChoise;
    switch (this.scene.settings.data.imgTag) {
      case "fun2-bag1-true":
        leftChoise = "fun3-bag1-true-glass";
        rightChoise = "fun3-bag1-true-choker";
        break;
      case "fun2-bag1-false":
        leftChoise = "fun3-bag1-false-glass";
        rightChoise = "fun3-bag1-false-necklace";
        break;
      case "fun2-bag2-true":
        leftChoise = "fun3-bag2-true-glass";
        rightChoise = "fun3-bag2-true-choker";
        break;
      case "fun2-bag2-false":
        leftChoise = "fun3-bag2-false-glass";
        rightChoise = "fun3-bag2-false-necklace";
        break;

      default:
        break;
    }
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.hero = this.add.image(300, 490, this.scene.settings.data.imgTag);
    this.heroFace = this.add.image(300, 530, "face-default");
    this.hero.setScale(this.size).setDepth(1);
    this.heroFace.setScale(1.5).setDepth(2);
    this.container = this.add.image(300, 30, "choose");
    this.container.setScale(0.8);
    this.glass = this.add.image(160, 700, "glass").setInteractive();
    this.glass.setDepth(3);
    this.secondChoise = this.add
      .image(440, 700, checkDress ? "choker" : "necklace")
      .setInteractive();
    this.secondChoise.setDepth(3);

    this.glass.on("pointerdown", (pointer) => {
      this.glass._events.pointerdown.fn = "";
      this.secondChoise._events.pointerdown.fn = "";
      this.glass.setAlpha(0.6);
      this.container.destroy();
      this.heroFace.destroy();
      this.heroAlt = this.add.image(300, 490, leftChoise);
      this.heroAlt.setScale(this.size).setDepth(2);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1-this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline3");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay3", {
              imgTag: leftChoise,
              win: this.scene.settings.data.win,
              glass: true,
            });
          }
        );
      }, 1500);
    });

    this.glass.on("pointerout", (pointer) => {
      this.glass.setAlpha(1);
    });

    this.glass.on("pointerup", (pointer) => {
      this.glass.setAlpha(1);
    });

    this.secondChoise.on("pointerdown", (pointer) => {
      this.glass._events.pointerdown.fn = "";
      this.secondChoise._events.pointerdown.fn = "";
      this.secondChoise.setAlpha(0.6);
      this.container.destroy();
      this.heroFace.destroy();
      this.heroAlt = this.add.image(300, 490, rightChoise);
      this.heroAlt.setScale(this.size).setDepth(2);
      const timerHero = this.time.addEvent({
        delay: 40,
        callback: () => {
          this.timeDuration += 0.1;
          this.heroAlt.setAlpha(this.timeDuration);
          this.hero.setAlpha(1-this.timeDuration);
        },
        repeat: 10,
      });
      this.timeline = this.add.image(300, 30, "timeline3");
      this.timeline.setScale(0.8);
      setTimeout(() => {
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          (cam, effect) => {
            this.scene.start("gameplay3", {
              imgTag: rightChoise,
              win: this.scene.settings.data.win,
              glass: false,
            });
          }
        );
      }, 1500);
    });

    this.secondChoise.on("pointerout", (pointer) => {
      this.secondChoise.setAlpha(1);
    });

    this.secondChoise.on("pointerup", (pointer) => {
      this.secondChoise.setAlpha(1);
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
