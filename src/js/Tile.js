class Tile {
    contains = null;
    constructor(position, size) {
        this.position = position;
        this.width = size;
        this.height = size;
        this.selected = false;
        this.loadingProgress = 0;
        this.loadingDuration = 0;
    }

    draw(ctx, deltaTime) {
        ctx.font = "16px Arial";
        let name = this.contains ? this.contains.name : "nothing";
        let ifContains = this.contains ? "#99BE50" : "white";
        ctx.fillStyle = this.selected ? "#ed8862" : ifContains;
        ctx.strokeStyle = "#48528c";
        ctx.fillRect(this.position.x, this.position.y, this.height, this.width);
        ctx.strokeRect(this.position.x, this.position.y, this.height, this.width);
        ctx.fillStyle = "#48528c";
        ctx.fillText(name, this.position.x+5, this.position.y+15, this.width-15);
        if (name === "Wheat") {
            ctx.fillText("wheat: " + this.contains.stage, this.position.x+5, this.position.y+50, this.width-15);
        } else if (name === "Cow") {
            ctx.fillText("food: " + this.contains.foodOutput, this.position.x+5, this.position.y+50, this.width-15);
            // ctx.fillText("food: " + (this.contains.food === -1 ? 0 : this.contains.food),
            //   this.position.x+5, this.position.y+50, this.width-15);
            ctx.fillText("milk: " + this.contains.milk, this.position.x+5, this.position.y+35, this.width-15);
        } else if (name === "Chicken") {
            ctx.fillText("food: " + this.contains.foodOutput,this.position.x+5, this.position.y+50, this.width-15);
            ctx.fillText("eggs: " + this.contains.eggs, this.position.x+5, this.position.y+35, this.width-15);
        }
        this.startLoading(ctx, deltaTime);
    }

    startLoading(ctx, deltaTime) {
        if (!this.contains || !this.contains.loading
          || this.loadingProgress > this.loadingDuration) {
            this.loadingProgress = 0;
        } else {
            this.loadingProgress += deltaTime / 1000;
        }
        const name = this.contains && this.contains.name;
        if (!name) return;
        switch (name) {
            case "Cow":
                this.loadingDuration = Cow.speed;
                break;
            case "Chicken":
                this.loadingDuration = Chicken.speed;
                break;
            case "Wheat":
                this.loadingDuration = Wheat.speed;
                break;
        }
        this.drawLoadingBar(ctx, deltaTime);
    }

    drawLoadingBar(ctx) {
        ctx.strokeStyle = "#48528c";
        ctx.fillStyle = "#48528c";
        const { x, y } = this.position;
        const pixelProgress = this.loadingProgress / this.loadingDuration;
        ctx.strokeRect(x + 5, y + this.height - 10, this.width - 10, 5);
        ctx.fillRect(x + 5, y + this.height - 10, (this.width - 10) * pixelProgress, 5);
        // if (pixelProgress > 1)
    }

    place(what) {
        this.contains = what;
    }
    select() {
        this.selected = true;
    }
}
