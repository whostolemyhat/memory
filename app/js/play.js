/* global game */
var app = app || {};


app.playState = {
    create: function() {
        console.log('game running');

        this.windowWidth = 640;
        this.windowHeight = 480;
        this.revealSpeed = 8;
        this.boxSize = 40;
        this.gapSize = 10;
        this.boardWidth = 10;
        this.boardHeight = 7;

        this.xMargin = (this.windowWidth - (this.boardWidth * (this.boxSize + this.gapSize))) / 2;
        this.yMargin = (this.windowHeight - (this.boardHeight * (this.boxSize + this.gapSize))) / 2;

        this.doughnut = 'doughnut';
        this.oval = 'oval';
        this.lines = 'lines';
        this.square = 'square';
        this.diamond = 'diamond';

        this.grey = '0x646464';
        this.navyBlue = '0x3c3c64';
        this.white = '0xffffff';
        this.red = '0xff0000';
        this.green = '0x00ff00';
        this.blue = '0x0000ff';
        this.yellow = '0xffff00';
        this.orange = '0xff7700';
        this.purple = '0xff00ff';
        this.cyan = '0x00ffff';

        this.allColours = [this.grey, this.navyBlue, this.white, this.red, this.green, this.blue, this.yellow, this.orange, this.purple, this.cyan];
        this.allShapes = [this.doughnut, this.oval, this.lines, this.square, this.diamond];

        this.boxColour = this.white;

        game.stage.backgroundColor = this.navyBlue;
        game.input.addMoveCallback(this.mouseMove);

        game.input.onDown.add(this.mouseClick);
        this.board = this.getRandomisedBoard();
        console.log(this.board);

        this.drawBoard(this.board, []);
    },

    update: function() {
        // graphics test
        // var g = game.add.graphics(0, 0);
        // g.lineStyle(1, '#fff', 1);
        // g.drawRect(20, 20, this.boxSize, this.boxSize);
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
        this.shuffleArray(icons);

        var board = [];
        for(var x = 0; x < this.boardWidth; x++) {
            var col = [];
            for(var y = 0; y < this.boardHeight; y++) {
                var tile = new Tile();
                tile.x = x;
                tile.y = y;

                var icon = icons.pop();
                console.log(icon);
                tile.shape = icon[0];
                tile.colour = icon[1];

                col.push(tile);
            }
            board.push(col);
        }

        return board;
    },

    drawBoard: function(board, revealed) {

        var g = game.add.graphics(0, 0);
        // width, colour, alpha
        g.lineStyle(1, this.boxColour, 1);

        for(var x = 0; x < this.boardWidth; x++) {
            for(var y = 0; y < this.boardHeight; y++) {
                var coords = this.boxCoords(x, y);

                g.beginFill(this.boxColour, 1);
                g.drawRect(coords.left, coords.top, this.boxSize, this.boxSize);
                g.endFill();

                // if(!revealed) {
                //     // draw a covered box
                //     var g = game.add.graphics(0, 0);
                //     g.drawRect(coords.left, coords.top, this.boxSize, this.boxSize);
                // } else {
                //     var details = this.getShapeAndColour(board, x, y);
                //     this.drawIcon(details.shape, details.colour, x, y);
                // }
            }
        }
    },

    boxCoords: function(x, y) {
        return {
            left: x * (this.boxSize + this.gapSize) + this.xMargin,
            top: y * (this.boxSize + this.gapSize) + this.yMargin
        };
    },

    getShapeAndColour: function(board, x, y) {
        console.log(board, x, y);
        console.log(board[x], board[x][y]);
        return {
            shape: board[x][y][0],
            colour: board[x][y][1]
        };
    },

    drawIcon: function(shape, colour, x, y) {
        var quarter = this.boxSize * 0.25;
        var half = this.boxSize * 0.5;
        var coords = this.boxCoords(x, y);

        switch(shape) {
        default:
            break;
            
        }
    },

    getBoxAtPos: function(x, y) {
        for(var boxX = 0; boxX < this.boardWidth; boxX++) {
            for(var boxY = 0; boxY < this.boardHeight; boxY++) {
                var pos = boxCoords(boxX, boxY);
                // var boxRect = new Rectangle(pos.left, pos.top, this.boxSize, this.boxSize);
                // var testRect = new Rectangle(x, y, this.boxSize, this.boxSize);
                
                // pseudo code
                _.each(_.flatten(board), function(tile) {
                    console.log(tile);
                });
                // for tile in bigListOfTiles:
                //     // tile is Phaser.Rectangle
                //     if(tile.contains(x, y) {
                //         return tile
                //     });
            }
        }
    },

    mouseMove: function(pointer, x, y) {
        console.log(pointer, x, y);
    },

    mouseClick: function(pointer, event) {
        console.log('click');
        console.log(arguments);
    },

    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     */
    shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
};
