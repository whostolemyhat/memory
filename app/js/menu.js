/* global game,Phaser */

/**
* Show the menu which allows the game to start
*/
var app = app || {};

app.menuState = {
    create: function() {
        game.stage.backgroundColor = '#f2d8b3';

        this.finalEmitter = game.add.emitter(0, 0, 15);
        this.finalEmitter.width = game.world.width / 2;
        this.finalEmitter.makeParticles(app.allShapes);
        this.finalEmitter.x = game.world.centerX;
        this.finalEmitter.y = -20;
        this.finalEmitter.forEach(function(particle) {
            var colour = app.pickColour();
            particle.tint = Phaser.Color.getColor(colour.r, colour.g, colour.b);
        });

        // explode, lifespan, frequency, quantity
        this.finalEmitter.start(false, 5000);

        var nameLabel = game.add.text(
            game.world.centerX,
            -50,
            'Memory Game',
            {
                font: '40px Arial',
                fill: '#fff',
                align: 'center'
            }
        );
        nameLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(nameLabel).to({ y: game.world.centerY - 70 }, 1000).easing(Phaser.Easing.Bounce.Out).start();

        if(!localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', 0);
        }

        // if(localStorage.getItem('highScore') !== 0) {
        //     if(game.global.totalMoves < localStorage.getItem('highScore')) {
        //         localStorage.setItem('highScore', game.global.totalMoves);
        //     }
        // }


        // start text
        // var startLabel = game.add.text(
        //     game.world.centerX,
        //     game.world.centerY + 60,
        //     'press up to start',
        //     {
        //         font: '20px Arial',
        //         fill: '#fff'
        //     }
        // );
        // startLabel.anchor.setTo(0.5, 0.5);

        var playLink = game.add.button(
            game.world.centerX,
            game.world.centerY + 100,
            'play',
            this.start,
            this,
            1,
            0
        );
        playLink.anchor.setTo(0.5, 0.5);

        // game.add.tween(playLink).to({ angle: -2 }, 500).to({ angle: 2 }, 500).loop().start();
        game.add.tween(playLink.scale).to({ x: 1.2, y: 1.2 }, 300).to({ x: 1, y: 1 }, 300).delay(1500).loop().start();

        // var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        // upKey.onDown.addOnce(this.start, this);

        // Debug - just start
        // game.state.start('play');

        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        if(game.sound.mute) {
            this.muteButton.frame = 1;
        }
    },

    start: function() {
        game.state.start('play');
    },

    toggleSound: function() {
        game.sound.mute = !game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    }
};
