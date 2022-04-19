class Gameplay3 extends Phaser.Scene {
    constructor() {
      super("gameplay3");
      this.timeDuration = 0;
      this.updateInterval = 100;
      this.size = 1;
      this.slideRight = true;
    }
    preload() {
      this.load.image("background", "assets/img/background.png");
      this.load.image("choose", "assets/img/choose.png");
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
      this.load.image("evening", "assets/img/evening.png");
      this.load.image("morning", "assets/img/morning.png");
      this.load.image("bg-evening", "assets/img/bg-evening.png");
      this.load.image("bg-morning", "assets/img/bg-morning.png");
      this.load.image("hand", "assets/img/hand.png");
      this.load.image("face-glass-default", "assets/img/face-glass-default.png");
      this.load.image("timeline4", "assets/img/timeline4.png");
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
      this.heroFace = this.add.image(300, 530, this.scene.settings.data.glass ? "face-glass-default" : "face-default");
      this.hero.setScale(this.size).setDepth(1);
      this.heroFace.setScale(1.5).setDepth(2);
      this.container = this.add.image(300, 30, "choose");
      this.container.setScale(0.8);
      this.evening = this.add.image(160, 700, "evening").setInteractive();
      this.evening.setDepth(3);
      this.morning = this.add
        .image(440, 700, "morning")
        .setInteractive();
      this.morning.setDepth(3);
  
      this.evening.on("pointerdown", (pointer) => {
        this.evening._events.pointerdown.fn = "";
        this.morning._events.pointerdown.fn = "";
        this.evening.setAlpha(0.6);
        this.container.destroy();
        this.heroFace = this.add.image(300, 530, this.scene.settings.data.glass ? "face-glass-fun" : "face-fun");
        this.heroFace.setScale(1.5).setDepth(2);
        this.background = this.add.image(0, 0, "bg-evening");
        this.background.setOrigin(0, 0);
        this.background.setDepth(0);
        const timerHero = this.time.addEvent({
          delay: 40,
          callback: () => {
            this.timeDuration += 0.1;
            this.background.setAlpha(this.timeDuration);
          },
          repeat: 10,
        });
        this.timeline = this.add.image(300, 30, "timeline4");
        this.timeline.setScale(0.8);
        setTimeout(() => {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            (cam, effect) => {
              this.scene.settings.data.win
              ? this.scene.start("amazing", {
                imgTag: this.scene.settings.data.imgTag,
                bg:"bg-evening",
                glass: this.scene.settings.data.glass,
              })
              : this.scene.start("loose", {
                imgTag: this.scene.settings.data.imgTag,
                bg:"bg-evening",
                glass: this.scene.settings.data.glass,
              })
            }
          );
        }, 1500);
      });
  
      this.evening.on("pointerout", (pointer) => {
        this.evening.setAlpha(1);
      });
  
      this.evening.on("pointerup", (pointer) => {
        this.evening.setAlpha(1);
      });
  
      this.morning.on("pointerdown", (pointer) => {
        this.evening._events.pointerdown.fn = "";
        this.morning._events.pointerdown.fn = "";
        this.morning.setAlpha(0.6);
        this.container.destroy();
        this.heroFace = this.add.image(300, 530, this.scene.settings.data.glass ? "face-glass-fun" : "face-fun");
        this.heroFace.setScale(1.5).setDepth(2);
        this.background = this.add.image(0, 0, "bg-morning");
        this.background.setOrigin(0, 0);
        this.background.setDepth(0);
        const timerHero = this.time.addEvent({
          delay: 40,
          callback: () => {
            this.timeDuration += 0.1;
            this.background.setAlpha(this.timeDuration);
          },
          repeat: 10,
        });
        this.timeline = this.add.image(300, 30, "timeline4");
        this.timeline.setScale(0.8);
        setTimeout(() => {
          this.cameras.main.fadeOut(200, 0, 0, 0);
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            (cam, effect) => {
              this.scene.settings.data.win
              ? this.scene.start("amazing", {
                imgTag: this.scene.settings.data.imgTag,
                bg:"bg-morning",
                glass: this.scene.settings.data.glass,
              })
              : this.scene.start("loose", {
                imgTag: this.scene.settings.data.imgTag,
                bg:"bg-morning",
                glass: this.scene.settings.data.glass,
              })
            }
          );
        }, 1500);
      });
  
      this.morning.on("pointerout", (pointer) => {
        this.morning.setAlpha(1);
      });
  
      this.morning.on("pointerup", (pointer) => {
        this.morning.setAlpha(1);
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
  