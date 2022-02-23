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

        this.faces = this.add.container();

        //  1 - plus: demonstrate calling with 100 faces!
        this.createRandomFaces(10);

        this.createParticles();
    }

    createRandomFaces (qty)
    {
        //  1
        for (let i = 0; i < qty; i++)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = Phaser.Math.Between(50, 550);
            // const scale = Phaser.Math.FloatBetween(0.5, 1); // 1 - too large
            const scale = Phaser.Math.FloatBetween(0.25, 0.5); // 2 - better

            const face = this.add.sprite(x, y, 'face');

            face.setScale(scale);

            this.faces.add(face);

            //  3
            face.setInteractive();

            face.once('pointerdown', pointer => this.clickFace(pointer, face));
        }
    }

    //  3
    clickFace (pointer, face)
    {
        //  4 - Test and coins too large, so change scale in createParticles
        this.particles.emitParticleAt(pointer.x, pointer.y);

        // 3
        // face.setVisible(false);

        // 5
        this.tweens.add({
            targets: face,
            scaleX: 0,
            scaleY: 0,
            duration: 500,
            ease: 'Power3'
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
            // scale: { min: 0.5, max: 1.0 },
            scale: { min: 0.2, max: 0.5 }, // 4
            rotate: { start: 0, end: 360, ease: 'Back.easeOut' }
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
