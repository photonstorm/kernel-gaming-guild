class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setPath('../assets');
        this.load.image('paul', 'face.png')
        this.load.image('bg', 'gradient8.png')
        // this.load.image('grid', 'grid.png')
    }

    create ()
    {
        this.add.image(400, 300, 'bg');
        // this.add.image(400, 600, 'grid').setOrigin(0.5, 1);

        const a = this.add.sprite(400, 300, 'paul');

        //  0.6 - 1.4
        //  1.8 - 0.4
        //  1.6 - 0.8
        //  1.3 - 0.7

        this.tweens.add({
            targets: a,
            props: {
                scaleX: { value: 1.3, duration: 250 },
                scaleY: { value: 0.7, duration: 250 },
                angle: { value: -20, duration: 500, delay: 250 },
                y: { value: "+=100", duration: 250 }
            },
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
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
