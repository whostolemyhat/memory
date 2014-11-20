/* global Phaser */

var app = app || {};

var game = new Phaser.Game(320, 480, Phaser.AUTO, 'game');

// add all the states here
// all states should be in the app namespace
game.state.add('boot', app.bootState);
game.state.add('load', app.loadState);
game.state.add('menu', app.menuState);
game.state.add('play', app.playState);
// game.state.add('pause', app.pauseState);

// start everything!
game.state.start('boot');
