/* global game, _, Phaser, Tile */
var app = app || {};


app.playState = {
    create: function() {
        console.log('game running');

        this.windowWidth = 800;
        this.windowHeight = 640;
        this.revealSpeed = 8;

        this.boxSize = 60;
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

        this.grey = Phaser.Color.getColor(100, 100, 100);
        this.navyBlue = Phaser.Color.getColor(60, 60, 100);
        this.white = Phaser.Color.getColor(255, 255, 255);
        this.red = Phaser.Color.getColor(255, 0, 0);
        this.green = Phaser.Color.getColor(0, 255, 0);
        this.blue = Phaser.Color.getColor(0, 0, 255);
        this.yellow = Phaser.Color.getColor(255, 255, 0);
        this.orange = Phaser.Color.getColor(255, 128, 0);
        this.purple = Phaser.Color.getColor(255, 0, 255);
        this.cyan = Phaser.Color.getColor(0, 255, 255);

        this.allColours = [this.grey, this.navyBlue, this.red, this.green, this.blue, this.yellow, this.orange, this.purple, this.cyan];
        this.allShapes = [this.doughnut, this.oval, this.lines, this.square, this.diamond];

        this.boxColour = this.white;

        game.stage.backgroundColor = this.navyBlue;
        game.input.addMoveCallback(this.mouseMove);

        game.input.onDown.add(this.mouseClick);
        this.board = this.getRandomisedBoard();
        this.tiles = _.flatten(this.board);

        this.drawBoard(this.board, []);
    },

    update: function() {
        // graphics test
        // var g = game.add.graphics(0, 0);
        // g.lineStyle(1, '#fff', 1);
        // g.drawRect(20, 20, this.boxSize, this.boxSize);
        // this.drawBoard(this.board, []);
    },

    render: function() {
        game.debug.pointer(game.input.activePointer);
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
                console.log(coords);

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
        return {
            shape: board[x][y][0],
            colour: board[x][y][1]
        };
    },

    drawIcon: function(tile) {
        var quarter = this.boxSize * 0.25;
        var half = this.boxSize * 0.5;
        var coords = this.boxCoords(tile.x, tile.y);

        var g = game.add.graphics(0, 0);
        switch(tile.shape) {
        case 'doughnut':
            g.beginFill(tile.colour);
            g.drawCircle(coords.left + half, coords.top + half, half);
            g.endFill();
            g.beginFill(this.boxColour, 1);
            g.drawCircle(coords.left + half, coords.top + half, quarter);
            g.endFill();
            break;
        case 'square':
            g.beginFill(tile.colour);
            g.drawRect(coords.left + (this.boxSize * 0.125), coords.top + (this.boxSize * 0.125), this.boxSize * 0.75, this.boxSize * 0.75);
            g.endFill();
            break;
        case 'diamond':
            g.beginFill(tile.colour);
            g.moveTo(coords.left + half, coords.top + 1);
            g.lineTo((coords.left + this.boxSize) - 1, coords.top + half);
            g.lineTo(coords.left + half, (coords.top + this.boxSize - 1));
            g.lineTo(coords.left + 1, coords.top + half);
            g.endFill();
            break;
        case 'oval':
            g.beginFill(tile.colour);
            g.drawEllipse(coords.left + half, coords.top + half, half, quarter);
            g.endFill();
            break;
        case 'lines':
            g.lineStyle(5, tile.colour, 1);
            g.moveTo(coords.left + quarter, coords.top + quarter);
            g.lineTo(coords.left + (quarter * 3), coords.top + quarter);
            g.moveTo(coords.left + quarter, coords.top + half);
            g.lineTo(coords.left + (quarter * 3), coords.top + half);
            g.moveTo(coords.left + quarter, coords.top + (quarter * 3));
            g.lineTo(coords.left + (quarter * 3), coords.top + (quarter * 3));
            break;

        default:
            g.beginFill(tile.colour);
            g.drawCircle(coords.left + half, coords.top + half, half);
            g.endFill();
            break;
            
        }

        // var coords = this.boxCoords(tile.x, tile.y);
        // width, colour, alpha
        // g.lineStyle(1, this.boxColour, 1);
        // g.beginFill(0xff0000, 1);
        // g.drawRect(coords.left, coords.top, 40, 40);
        // g.endFill();
    },

    getBoxAtPos: function(x, y) {
        var self = app.playState;

        return _.find(self.tiles, function(tile) {

            var pos = self.boxCoords(tile.x, tile.y);
            var collisionRect = new Phaser.Rectangle(pos.left, pos.top, self.boxSize, self.boxSize);
            
            var g = game.add.graphics(0, 0);
            // width, colour, alpha
            // g.lineStyle(1, 0x00ff00, 1);
            // g.beginFill(0xff0000, 1);
            // g.drawRect(pos.left, pos.top, self.boxSize, self.boxSize);
            // g.endFill();

            if(collisionRect.contains(x, y)) {
                return tile;
            }

            return false;
        });
    },

    mouseMove: function(pointer, x, y) {
        var self = app.playState;

        // var redraw = _.throttle(function() {
        //     console.log('drawing');
        //     self.drawBoard(self.board, []);
        // }, 100); // limit 

        // redraw();

        // console.log(app.playState.getBoxAtPos(x, y));
        var tile = app.playState.getBoxAtPos(x, y);
        // console.log(tile);

        if(tile) {
            app.playState.drawIcon(tile);
        }
    },

    mouseClick: function(pointer, event) {
        // console.log('click', game.input.x, game.input.y);
        var self = app.playState;
        self.drawBoard(self.board);

        var g = game.add.graphics(0, 0);
        // width, colour, alpha
        g.lineStyle(1, 0xff00ff, 1);
        g.beginFill(0xff0fff, 1);
        g.drawRect(game.input.x, game.input.y, 40, 40);
        g.endFill();

        var tile = self.getBoxAtPos(game.input.x, game.input.y);

        if(tile) {
            console.log('drawing highlight');
            var coords = self.boxCoords(tile.x, tile.y);

            g.lineStyle(1, 0xff00ff, 1);
            g.beginFill(0x000000, 1);
            g.drawRect(coords.left, coords.top, 40, 40);
            g.endFill();

        }

    }
};
