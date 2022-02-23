class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setPath('../assets');
        this.load.image('background', 'gradient8.png');
        this.load.image('face', 'face.png');
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        const face = this.add.sprite(400, 300, 'face');

        const scaleX = 1.3;
        const scaleY = 0.7;

        // const scaleX = 1.8;
        // const scaleY = 0.4;

        //  1 - 3
        // this.tweens.add({
        //     targets: face,
        //     scaleX, // 1
        //     duration: 250, // 1
        //     ease: 'Sine.easeInOut', // 1
        //     repeat: -1, // 2
        //     yoyo: true // 3
        // });

        //  4 - 5
        this.tweens.add({
            targets: face,
            scaleX,
            scaleY, // 4
            y: "+=100", // 5
            duration: 250,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        //  Copy the above, then add angle and change duration + add delay
        this.tweens.add({
            targets: face,
            angle: -20,
            duration: 500,
            delay: 250,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        //  Finally, change scaleX/Y to 1.8 and 0.4
    }
}

const config = {
    parent: 'container',
    scaleMode: Phaser.Scale.FIT,
    width: 800,
    height: 600,
    scene: Example
}

new Phaser.Game(config);
