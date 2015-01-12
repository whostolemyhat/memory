/* global game, Phaser */

/**
* load all the assets
*/
var app = app || {};

app.star = 'star';
app.rings = 'rings';
app.hex = 'hex';
app.square = 'square';
app.diamond = 'diamond';
app.circle = 'circle';
// app.lines = 'lines';
app.triangle = 'triangle';

// shape colours
// app.fire = Phaser.Color.createColor(214,147,92); // then call Phaser.Color.getColor(self.darkGrey.r, self.darkGrey.g, self.darkGrey.b)
app.navyBlue = Phaser.Color.createColor(60, 60, 100);
app.brown = Phaser.Color.createColor(185,138,122);
// app.lilac = Phaser.Color.createColor(170,173,204);
// app.life = Phaser.Color.createColor(217,200,182);
app.purple = Phaser.Color.createColor(138,76,124);
// app.grey = Phaser.Color.createColor(109,127,142);
app.russet = Phaser.Color.createColor(174,70,0);
// app.orange = Phaser.Color.createColor(222,73,30);
app.amber = Phaser.Color.createColor(255,149,22);
app.pink = Phaser.Color.createColor(244,160,170);
app.chocolate = Phaser.Color.createColor(89,31,0);

// ui colours
app.white = Phaser.Color.createColor(255, 255, 255);
app.darkGrey = Phaser.Color.createColor(74,72,73);
app.peach = Phaser.Color.createColor(242,216,179);

app.allColours = [app.chocolate, app.brown, app.purple, app.russet, app.amber, app.pink, app.navyBlue];
app.allShapes = [app.star, app.rings, app.hex, app.square, app.diamond, app.circle, app.triangle];

app.pickColour = function() {
    return app.allColours[Math.floor(Math.random() * app.allColours.length)];
};

app.pickShape = function() {
    return app.allShapes[Math.floor(Math.random() * app.allShapes.length)];
};

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
        game.load.spritesheet('mute', '/static/pairs/img/menu/muteButton.png', 28, 22);
        game.load.spritesheet('play', '/static/pairs/img/menu/play.png', 200, 50);
        game.load.image('header', '/static/pairs/img/menu/header.png');

        game.load.image('box', '/static/pairs/img/box.png');
        game.load.image('pixel', '/static/pairs/img/pixel.png');
        game.load.image('circle', '/static/pairs/img/icons/circle.png');
        game.load.image('diamond', '/static/pairs/img/icons/diamond.png');
        game.load.image('hex', '/static/pairs/img/icons/hex.png');
        game.load.image('rings', '/static/pairs/img/icons/rings.png');
        game.load.image('square', '/static/pairs/img/icons/square.png');
        game.load.image('star', '/static/pairs/img/icons/star.png');
        game.load.image('triangle', '/static/pairs/img/icons/triangle.png');
        
        game.load.image('pause', '/static/pairs/img/menu/pause.png');
    },

    create: function() {
        game.state.start('menu');
    }
};
