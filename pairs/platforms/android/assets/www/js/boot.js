/* global game, Phaser */
/**
* Basic set up, show progress bar
*/
var app = app || {};

app.bootState = {
    preload: function() {
        game.load.image('progressBar', '/static/pairs/img/menu/progress.png');
    },

    create: function() {
        game.stage.backgroundColor = '#591F00';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // trigger the loading screen
        game.state.start('load');
    }
};
