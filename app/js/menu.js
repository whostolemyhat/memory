/* global game,Phaser */

/**
* Show the menu which allows the game to start
*/
var app = app || {};

app.menuState = {
    create: function() {
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
        var startLabel = game.add.text(
            game.world.centerX,
            game.world.centerY + 60,
            'press up to start',
            {
                font: '20px Arial',
                fill: '#fff'
            }
        );
        startLabel.anchor.setTo(0.5, 0.5);
        game.add.tween(startLabel).to({ angle: -2 }, 500).to({ angle: 2 }, 500).loop().start();

        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);

        // Debug - just start
        game.state.start('play');

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
