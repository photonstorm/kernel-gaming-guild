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

        //  1)
        // face.setScale(0.5);

        //  2)
        // face.setScale(2.5);

        //  3)
        // face.setAngle(90);

        //  4)
        // face.setAngle(180);

        //  5)
        // face.setAngle(180);
        // face.y = 0;

        //  6)
        face.setAngle(180);
        face.y = -200;

        //  7)
        this.tweens.add({
            targets: face,
            y: 100, // 8
            duration: 500, // 9
            delay: 200, // 10
            ease: 'Bounce.out', // 11
        });
    }
}

const config = {
    parent: 'container',
    width: 800,
    height: 600,
    scene: Example
}

new Phaser.Game(config);
