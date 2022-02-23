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
    }

    create ()
    {
        this.add.image(400, 300, 'background');
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
