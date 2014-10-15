/* global game, _, Phaser, Tile */
var app = app || {};


app.playState = {
    create: function() {
        console.log('game running');

        this.windowWidth = 320;
        this.windowHeight = 480;
        this.revealSpeed = 250; // speed to show/hide in ms

        this.boxSize = 60;
        this.gapSize = 10;

        this.boardWidth = 4;
        this.boardHeight = 6;

        this.xMargin = (this.windowWidth - (this.boardWidth * (this.boxSize + this.gapSize))) / 2;
        this.yMargin = (this.windowHeight - (this.boardHeight * (this.boxSize + this.gapSize))) / 2;

        this.star = 'star';
        this.rings = 'rings';
        this.hex = 'hex';
        this.square = 'square';
        this.diamond = 'diamond';
        this.circle = 'circle';

        this.fire = Phaser.Color.createColor(214,147,92); // then call Phaser.Color.getColor(self.darkGrey.r, self.darkGrey.g, self.darkGrey.b)
        this.navyBlue = Phaser.Color.createColor(60, 60, 100);
        this.white = Phaser.Color.createColor(255, 255, 255);
        this.brown = Phaser.Color.createColor(185,138,122);
        this.lilac = Phaser.Color.createColor(170,173,204);
        this.life = Phaser.Color.createColor(217,200,182);
        this.peach = Phaser.Color.createColor(242,216,179);
        this.purple = Phaser.Color.createColor(138,76,124);
        this.grey = Phaser.Color.createColor(109,127,142);
        this.russet = Phaser.Color.createColor(174,70,0);
        this.orange = Phaser.Color.createColor(222,73,30);
        this.amber = Phaser.Color.createColor(255,149,22);
        this.darkGrey = Phaser.Color.createColor(74,72,73);
        this.pink = Phaser.Color.createColor(244,160,170);


        this.allColours = [this.fire, this.brown, this.lilac, this.life, this.purple, this.russet, this.amber, this.pink];
        this.allShapes = [this.star, this.rings, this.hex, this.square, this.diamond, this.circle];

        this.boxColour = this.darkGrey;
        this.backgroundColour = this.peach;

        game.stage.backgroundColor = Phaser.Color.getColor(this.backgroundColour.r, this.backgroundColour.g, this.backgroundColour.b);

        // this.highlightColour = this.navyBlue;

        // game.input.addMoveCallback(this.mouseMove);

        this.board = this.getRandomisedBoard();
        // this.tiles = _.flatten(this.board);

        // this.mousePos = {
        //     x: 0,
        //     y: 0
        // };

        // this.revealed = [];

        this.drawBoard(this.board, this.revealed);
        game.time.events.add(1000, function() {
            this.coverBoxesAnimation(_.flatten(this.board));
        }, this);
    },

    update: function() {

    },

    getRandomisedBoard: function() {
        var icons = [];
        for(var i = 0; i < this.allColours.length; i++) {
            for(var j = 0; j < this.allShapes.length; j++) {
                icons.push([this.allShapes[j], this.allColours[i]]);
            }
        }

        // double the icon array so there's enough!
        icons = icons.concat(icons);
        icons = _.shuffle(icons);

        var board = [];
        for(var x = 0; x < this.boardWidth; x++) {
            var col = [];
            for(var y = 0; y < this.boardHeight; y++) {
                var icon = icons.pop();
                var tile = new Tile();
                tile.x = x;
                tile.y = y;
                tile.shape = icon[0];
                tile.colour = icon[1];
                tile.id = x + y;

                col.push(tile);
            }
            board.push(col);
        }

        return board;
    },

    drawBoard: function(board) {
        var self = app.playState;

        _.each(_.flatten(board), function(tile) {
            var coords = self.boxCoordsInPixels(tile.x, tile.y);

            tile.sprite = game.add.sprite(coords.x, coords.y, tile.shape);
            tile.sprite.tint = Phaser.Color.getColor(tile.colour.r, tile.colour.g, tile.colour.b);

            tile.box = game.add.sprite(coords.x, coords.y, 'box');
            tile.box.tint = Phaser.Color.getColor(self.darkGrey.r, self.darkGrey.g, self.darkGrey.b);
            tile.box.width = 0;
            tile.box.inputEnabled = true;
            tile.box.events.onInputOver.add(self.boxClick, this);
        });

      
    },

    /**
    * convert tile coords to pixel screen value
    */
    boxCoordsInPixels: function(x, y) {
        return {
            x: x * (this.boxSize + this.gapSize) + this.xMargin,
            y: y * (this.boxSize + this.gapSize) + this.yMargin
        };
    },

    getShapeAndColour: function(board, x, y) {
        return {
            shape: board[x][y][0],
            colour: board[x][y][1]
        };
    },

    // drawIcon: function(tile) {
    //     var quarter = this.boxSize * 0.25;
    //     var half = this.boxSize * 0.5;
    //     var coords = this.boxCoords(tile.x, tile.y);

    //     var g = game.add.graphics(0, 0);

    //     switch(tile.shape) {
    //     case 'doughnut':
    //         g.beginFill(tile.colour);
    //         g.drawCircle(coords.left + half, coords.top + half, half);
    //         g.endFill();
    //         g.beginFill(this.highlightColour, 1);
    //         g.drawCircle(coords.left + half, coords.top + half, quarter);
    //         g.endFill();
    //         break;

    //     case 'square':
    //         g.beginFill(tile.colour);
    //         g.drawRect(coords.left + (this.boxSize * 0.125), coords.top + (this.boxSize * 0.125), this.boxSize * 0.75, this.boxSize * 0.75);
    //         g.endFill();
    //         break;

    //     case 'diamond':
    //         g.beginFill(tile.colour);
    //         g.moveTo(coords.left + half, coords.top + 1);
    //         g.lineTo((coords.left + this.boxSize) - 1, coords.top + half);
    //         g.lineTo(coords.left + half, (coords.top + this.boxSize - 1));
    //         g.lineTo(coords.left + 1, coords.top + half);
    //         g.endFill();
    //         break;

    //     case 'oval':
    //         g.beginFill(tile.colour);
    //         g.drawEllipse(coords.left + half, coords.top + half, half - (quarter / 2), quarter);
    //         g.endFill();
    //         break;

    //     case 'lines':
    //         g.lineStyle(5, tile.colour, 1);
    //         g.moveTo(coords.left + quarter, coords.top + quarter);
    //         g.lineTo(coords.left + (quarter * 3), coords.top + quarter);
    //         g.moveTo(coords.left + quarter, coords.top + half);
    //         g.lineTo(coords.left + (quarter * 3), coords.top + half);
    //         g.moveTo(coords.left + quarter, coords.top + (quarter * 3));
    //         g.lineTo(coords.left + (quarter * 3), coords.top + (quarter * 3));
    //         break;

    //     default:
    //         g.beginFill(tile.colour);
    //         g.drawCircle(coords.left + half, coords.top + half, half);
    //         g.endFill();
    //         break;
            
    //     }

    // },

    // drawHighlight: function(tile, revealed) {
    //     var self = app.playState;
    //     if(!tile) {
    //         tile = self.getBoxAtPos(self.mousePos.x, self.mousePos.y);
    //     }
    //     var coords = self.boxCoords(tile.x, tile.y);

    //     var g = game.add.graphics(0, 0);

    //     g.beginFill(self.highlightColour);
    //     g.drawRect(coords.left, coords.top, self.boxSize, self.boxSize);
    //     g.endFill();
    // },

    /**
    * Convert pixel coords into the box at that position
    */
    getBoxAtPos: function(x, y) {
        var self = app.playState;

        return _.find(self.tiles, function(tile) {

            var pos = self.boxCoords(tile.x, tile.y);
            var collisionRect = new Phaser.Rectangle(pos.left, pos.top, self.boxSize, self.boxSize);

            if(collisionRect.contains(x, y)) {
                return tile;
            }

            return false;
        });
    },

    // mouseMove: function(pointer, x, y) {
    //     var self = app.playState;
    //     self.mousePos.x = x;
    //     self.mousePos.y = y;

    // },

    // mouseClick: function(pointer, event) {
    //     var self = app.playState;
    //     // self.drawBoard(self.board, self.revealed);

    //     var tile = self.getBoxAtPos(game.input.x, game.input.y);

    //     if(tile) {
    //         tile.revealed = true;
    //         // self.drawIcon(tile);
    //         self.revealed.push(tile);

    //         self.coverBoxesAnimation([tile]);

    //         if(self.revealed.length === 2) {
    //             console.log(self.revealed);

    //             if((self.revealed[0].shape === self.revealed[1].shape) && (self.revealed[0].colour === self.revealed[1].colour)) {
    //                 // match!
    //                 console.log('match');
    //             } else {
    //                 console.log('wrong!');

    //                 for(var i = 0; i < self.revealed.length; i++) {
    //                     console.log('resetting');

    //                     var selectedTile = _.find(_.flatten(self.board), function(tile) {
    //                         return tile.id === self.revealed[i].id; //self.matchTile(tile, self.revealed[i]));
    //                     });

    //                     selectedTile.revealed = false;
    //                 }

    //                 self.coverBoxesAnimation(self.revealed);
    //                 self.revealed = [];
    //             }
    //         }

    //         // self.drawBoard(self.board, self.revealed);
    //     }

    // },

    boxClick: function(sprite, pointer) {
        var self = app.playState;

        console.log('clicl', sprite, pointer);

        this.game.add.tween(sprite).to({width: 0}, self.revealSpeed).start();
    },


    // // boxes = array of boxes to cover over
    coverBoxesAnimation: function(tiles) {
        var self = app.playState;

        // tile.box.bringToTop();
        _.each(tiles, function(tile) {
            var delay = (100 * tile.x) + (50 * tile.y);
            console.log(console.log(delay));

            // to({properties}, duration, easing, autostart, delay)
            this.game.add.tween(tile.box).to({width: self.boxSize}, self.revealSpeed, Phaser.Easing.Default, true, delay);
        });
    },

    // drawBoxCovers: function(boxes, coverage) {
    //     var self = app.playState;

    //     console.log(coverage);

    //     var g = game.add.graphics(0, 0);

    //     _.each(boxes, function(tile) {
    //         var coords = self.boxCoords(tile.x, tile.y);

    //         // g.beginFill(self.backgroundColour);
    //         g.beginFill(0xff00ff);
    //         g.drawRect(coords.left, coords.top, coverage, self.boxSize);
    //         g.endFill();
    //         // self.drawIcon(tile);

    //         // if(coverage > 0) {
    //         //     g.beginFill(self.boxColour);
    //         //     g.drawRect(coords.left, coords.top, coverage, self.boxSize);
    //         //     g.endFill();
    //         // }
    //     });
    // }
};
