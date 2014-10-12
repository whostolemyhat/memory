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

        this.fire = Phaser.Color.getColor(214,147,92);
        this.navyBlue = Phaser.Color.getColor(60, 60, 100);
        this.white = Phaser.Color.getColor(255, 255, 255);
        this.brown = Phaser.Color.getColor(185,138,122);
        this.lilac = Phaser.Color.getColor(170,173,204);
        this.life = Phaser.Color.getColor(217,200,182);
        this.peach = Phaser.Color.getColor(242,216,179);
        this.purple = Phaser.Color.getColor(138,76,124);
        this.grey = Phaser.Color.getColor(109,127,142);
        this.russet = Phaser.Color.getColor(174,70,0);
        this.orange = Phaser.Color.getColor(222,73,30);
        this.amber = Phaser.Color.getColor(255,149,22);
        this.darkGrey = Phaser.Color.getColor(74,72,73);


        this.allColours = [this.fire, this.brown, this.lilac, this.life, this.purple, this.russet, this.amber];
        this.allShapes = [this.doughnut, this.oval, this.lines, this.square, this.diamond];

        this.boxColour = this.darkGrey;
        game.stage.backgroundColor = this.peach;

        this.highlightColour = this.navyBlue;

        game.input.addMoveCallback(this.mouseMove);

        game.input.onDown.add(this.mouseClick);
        this.board = this.getRandomisedBoard();
        this.tiles = _.flatten(this.board);

        this.mousePos = {
            x: 0,
            y: 0
        };

        this.revealed = [];

        this.drawBoard(this.board, this.revealed);
    },

    update: function() {
        // graphics test
        // var g = game.add.graphics(0, 0);
        // g.lineStyle(1, '#fff', 1);
        // g.drawRect(20, 20, this.boxSize, this.boxSize);
        // this.drawBoard(this.board, []);
        // this.drawHighlight();
    },

    render: function() {
        // game.debug.pointer(game.input.activePointer);
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
        var self = app.playState;

        var g = game.add.graphics(0, 0);
        // width, colour, alpha

        _.each(self.tiles, function(tile) {
            var coords = self.boxCoords(tile.x, tile.y);

            if(!tile.revealed) {
                self.drawIcon(tile);
            } else {
                g.beginFill(self.boxColour);
                g.drawRect(coords.left, coords.top, self.boxSize, self.boxSize);
                g.endFill();
            }

        });

        // var hoverTile = self.getBoxAtPos(self.mousePos.x, self.mousePos.y);
        // if(hoverTile) {
        //     self.drawHighlight(hoverTile);
        // }

        // for(var x = 0; x < this.boardWidth; x++) {
        //     for(var y = 0; y < this.boardHeight; y++) {
        //         var coords = this.boxCoords(x, y);
        //         var tile = app.playState.getBoxAtPos(x, y);

        //         console.log(coords, tile);

        //         g.beginFill(this.boxColour, 1);
        //         g.drawRect(coords.left, coords.top, this.boxSize, this.boxSize);
        //         g.endFill();

        //         // if(!revealed) {
        //         //     // draw a covered box
        //         //     var g = game.add.graphics(0, 0);
        //         //     g.drawRect(coords.left, coords.top, this.boxSize, this.boxSize);
        //         // } else {
        //         //     var details = this.getShapeAndColour(board, x, y);
        //         //     this.drawIcon(details.shape, details.colour, x, y);
        //         // }
        //     }
        // }
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
            g.beginFill(this.highlightColour, 1);
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
            g.drawEllipse(coords.left + half, coords.top + half, half - (quarter / 2), quarter);
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

    },

    drawHighlight: function(tile, revealed) {
        var self = app.playState;
        if(!tile) {
            tile = self.getBoxAtPos(self.mousePos.x, self.mousePos.y);
        }
        var coords = self.boxCoords(tile.x, tile.y);

        var g = game.add.graphics(0, 0);

        g.beginFill(self.highlightColour);
        g.drawRect(coords.left, coords.top, self.boxSize, self.boxSize);
        g.endFill();
    },

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

    mouseMove: function(pointer, x, y) {
        var self = app.playState;
        self.mousePos.x = x;
        self.mousePos.y = y;

    },

    mouseClick: function(pointer, event) {
        // console.log('click', game.input.x, game.input.y);
        var self = app.playState;
        self.drawBoard(self.board);

        // var g = game.add.graphics(0, 0);
        // width, colour, alpha
        // g.lineStyle(1, 0xff00ff, 1);
        // g.beginFill(0xff0fff, 1);
        // g.drawRect(game.input.x, game.input.y, self.boxSize, self.boxSize);
        // g.endFill();

        var tile = self.getBoxAtPos(game.input.x, game.input.y);

        if(tile) {
            self.drawIcon(tile);
            self.revealed.push(tile);
            // self.drawHighlight(tile, self.revealed);
        }

    }
};
