/* global Phaser */

var pairs = pairs || {};

pairs.SCREEN_WIDTH = $(window).width();
pairs.SCREEN_HEIGHT = $(window).height();
pairs.MAX_WIDTH = 600;
pairs.MAX_HEIGHT = 800;

var game = new Phaser.Game(320, 480, Phaser.AUTO, 'game');

game.global = {
    score: 0
};

// add all the states here
// all states should be in the pairs namespace
game.state.add('boot', pairs.bootState);
game.state.add('load', pairs.loadState);
game.state.add('menu', pairs.menuState);
game.state.add('play', pairs.playState);

// start everything!
document.addEventListener('deviceready', function() {
    game.state.start('boot');
});
