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
        this.load.image('coin', 'coin-small.png'); // 1
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        const face = this.add.sprite(400, 300, 'face');

        face.setInteractive();

        //  1
        const particles = this.add.particles('coin');

        particles.createEmitter({
            angle: { min: 240, max: 300 },
            speed: { min: 400, max: 600 },
            gravityY: 800,
            lifespan: 4000,
            on: false,
            quantity: 10, // 2
            scale: { min: 0.5, max: 1.0 }, // 3
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' } // 4
        });

        //  1
        face.on('pointerdown', (pointer) => {

            particles.emitParticleAt(pointer.x, pointer.y);

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
