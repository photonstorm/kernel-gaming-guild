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
        this.load.image('coin', 'coin-small.png');
    }

    create ()
    {
        this.add.image(400, 300, 'background');

        const face = this.add.sprite(400, 300, 'face');

        face.setInteractive();

        //  1 - Move particle code inside own function and add 'this.'

        this.createParticles();

        face.on('pointerdown', (pointer) => {

            //  1 - add this
            this.particles.emitParticleAt(pointer.x, pointer.y);

        });
    }

    createParticles ()
    {
        this.particles = this.add.particles('coin');

        this.particles.createEmitter({
            angle: { min: 240, max: 300 },
            speed: { min: 400, max: 600 },
            gravityY: 800,
            lifespan: 4000,
            on: false,
            quantity: 10,
            scale: { min: 0.5, max: 1.0 },
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' }
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
