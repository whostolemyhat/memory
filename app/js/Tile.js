function Tile() {
    this.x = 0;
    this.y = 0;
    this.colour = '#fff';
    this.shape = 'square';
    this.size = 40;
    this.border = 10;

    this.getPixelCoords = function() {
        return {
            x: this.x * this.size + (this.border * (this.x + 1)),
            y: this.y * this.size + (this.border * (this.y + 1))
        };
    };
}
