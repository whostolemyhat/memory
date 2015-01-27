/* global game, Phaser */
/**
* Basic set up, show progress bar
*/
var pairs = pairs || {};

pairs.bootState = {
    preload: function() {
        game.load.image('progressBar', 'img/menu/progress.png');
    },

    create: function() {
        game.stage.backgroundColor = '#f2d8b3';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // trigger the loading screen
        game.state.start('load');
    }
};