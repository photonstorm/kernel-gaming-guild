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

        face.setInteractive();

        face.on('pointerdown', () => {

            //  1
            // face.setVisible(false);

            //  2
            // face.setTint(0xff0000);

            //  3
            face.setTint(0xff0000);

            this.tweens.add({
                targets: face,
                alpha: 0
            });

        });
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
