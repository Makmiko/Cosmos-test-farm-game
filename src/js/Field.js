class Field {
    time = 0;
    stage = 0;
    money = 0;
    selectedTile = null;

    constructor(gameWidth, gameHeight, tileSize) {
        this.tileSize = tileSize;
        this.tiles = fieldStruct;
        this.field = fieldStruct;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    pushTiles() {
        this.field.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (tile === 1) {
                    let position = {
                        x: rowIndex * 70,
                        y: tileIndex * 70
                    };
                    this.tiles[rowIndex][tileIndex] = (new Tile(position, this.tileSize));
                }
            });
        });
    }

    draw(ctx, deltaTime) {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.draw(ctx, deltaTime);
            });
        })
    }

    select(position) {
        this.selectedTile = null;
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.selected = false;
                if (+tile.position.x + +tile.width > +position.x && +tile.position.x <= +position.x
                    && +tile.position.y + +tile.height > +position.y && +tile.position.y < +position.y) {
                    this.selectedTile = tile;
                    tile.select();
                    console.log('Info about current tile:', tile);
                }
            })
        })
    }

}
