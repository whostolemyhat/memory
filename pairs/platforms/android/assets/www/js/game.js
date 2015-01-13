/* global Phaser */

var pairs = pairs || {};

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

document.onreadystatechange = function () {

    // check the value - if it's 'interactive' then the DOM has loaded
    if (document.readyState === 'interactive') {
        console.log('pairs: dom ready');
    }
};