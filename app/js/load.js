/* global game, Phaser */

/**
* load all the assets
*/
var app = app || {};

app.loadState = {
    preload: function() {
        var loadingLabel = game.add.text(
            game.world.centerX,
            game.world.centerY - 40,
            'loading...',
            {
                font: '30px Arial',
                fill: '#fff'
            }
        );
        loadingLabel.anchor.setTo(0.5, 0.5);

        // progress bar
        var progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        // load all assets
        game.load.spritesheet('mute', 'img/menu/muteButton.png', 28, 22);
        game.load.spritesheet('play', 'img/menu/play.png', 300, 50);

        game.load.image('box', 'img/box.png');
        game.load.image('pixel', 'img/pixel.png');
        game.load.image('circle', 'img/icons/circle.png');
        game.load.image('diamond', 'img/icons/diamond.png');
        game.load.image('hex', 'img/icons/hex.png');
        game.load.image('rings', 'img/icons/rings.png');
        game.load.image('square', 'img/icons/square.png');
        game.load.image('star', 'img/icons/star.png');
        game.load.image('lines', 'img/icons/lines.png');
    },

    create: function() {
        game.state.start('menu');
    }
};
