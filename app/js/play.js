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

        this.board = this.getRandomisedBoard();

        // used to find box positions
        this.tiles = _.flatten(this.board);

        this.firstSelected = '';
        this.secondSelected = '';

        // this.revealed = [];

        game.input.onDown.add(this.boxClick);

        this.drawBoard(this.board, this.revealed);
        game.time.events.add(1000, function() {
            this.coverBoxesAnimation(_.flatten(this.board));
        }, this);
    },

    update: function() {

    },

    pickColour: function() {
        return this.allColours[Math.floor(Math.random() * this.allColours.length)];
    },

    getRandomisedBoard: function() {
        // create coloured icons for half the tiles
        var maxIcons = (this.boardWidth * this.boardHeight) / 2;
        var icons = [];

        var usedColours = [];

        for(var i = 0; i < maxIcons; i++) {
            // pick random colour
            var colour = this.pickColour();

            while(_.indexOf(usedColours, colour) > -1) {
                colour = this.pickColour();
            }
            var shape = this.allShapes[Math.floor(Math.random() * this.allShapes.length)];

            usedColours.push(colour);
            if(usedColours.length === this.allColours.length) {
                usedColours = [];
            }

            icons.push([shape, colour]);
        }

        // double the icon array so there's two of each
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
            // tile.box.events.onInputOver.add(self.boxHover, this);
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

    /**
    * Convert pixel coords into the box at that position
    */
    getBoxAtPos: function(x, y) {
        var self = app.playState;

        return _.find(self.tiles, function(tile) {

            var pos = self.boxCoordsInPixels(tile.x, tile.y);
            var collisionRect = new Phaser.Rectangle(pos.x, pos.y, self.boxSize, self.boxSize);

            if(collisionRect.contains(x, y)) {
                return tile;
            }

            return false;
        });
    },

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

    boxHover: function(sprite, pointer) {
        var self = app.playState;

        // if(pointer.isDown) {
        // self.game.add.tween(sprite).to({width: 0}, self.revealSpeed).start();

            // are there two in revealed?
            // check match
        // } else {
            // highlight
            // var highlight = this.game.add.sprite(sprite.x - 5, sprite.y - 5, 'box');
            // highlight.tint = 0xffffff;
            // highlight.scale(1.1, 1);
        // }
    },


    boxClick: function(pointer, event) {
        var self = app.playState;

        var tile = self.getBoxAtPos(game.input.x, game.input.y);

        if(tile) {
            console.log(tile);
            if(!tile.revealed) {
                self.game.add.tween(tile.box).to({width: 0}, self.revealSpeed).start();

                if(self.firstSelected === '') {
                    self.firstSelected = tile;
                    console.log('first tile');
                } else if(self.secondSelected === '') {
                    self.secondSelected = tile;
                    console.log('second tile');

                    // compare two icons
                    console.log(self.firstSelected, self.secondSelected);
                    console.log('shape', self.firstSelected.shape === self.secondSelected.shape);

                    if((self.firstSelected.shape === self.secondSelected.shape) && (self.firstSelected.colour === self.secondSelected.colour)) {
                        console.log('match!');
                    } else {
                        console.log('nope');
                        // cover boxes

                        game.time.events.add(1000, function() {
                            console.log('delayed event');

                            self.coverBoxesAnimation([self.firstSelected, self.secondSelected]);
                            self.firstSelected = '';
                            self.secondSelected = '';

                        });
                    } // end selectedTile check
                    
                }
                tile.revealed = true;
                
            } // end !tile.revealed

        }
    },


    // // boxes = array of boxes to cover over
    coverBoxesAnimation: function(tiles) {
        var self = app.playState;

        _.each(tiles, function(tile) {
            var delay = (100 * tile.x) + (50 * tile.y);

            // to({properties}, duration, easing, autostart, delay)
            this.game.add.tween(tile.box).to({width: self.boxSize}, self.revealSpeed, Phaser.Easing.Default, true, delay);
            tile.revealed = false;
        });
    },

};
