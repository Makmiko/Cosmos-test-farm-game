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
        const name = this.contains && this.contains.name;
        const translatedName = this.contains ? this.contains.translatedName : "Пусто";
        let fillStyle = "white";
        if (this.selected && !this.contains) {
            fillStyle = "#ed8862"
        } else if (this.contains) {
            fillStyle = "#99BE50";
        }
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = "#48528c";
        ctx.fillRect(this.position.x, this.position.y, this.height, this.width);
        if (this.selected) {
            ctx.strokeStyle = "#ed8862";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.position.x, this.position.y, this.height - 2, this.width - 2);
        } else {
            ctx.strokeRect(this.position.x, this.position.y, this.height, this.width);
        }
        ctx.lineWidth = 1;
        ctx.fillStyle = "#48528c";
        ctx.fillText(translatedName, this.position.x+5, this.position.y+15, this.width-15);
        if (name === "Wheat") {
            ctx.fillText("пшеница: " + this.contains.stage, this.position.x+5, this.position.y+50, this.width-15);
        } else if (name === "Cow") {
            ctx.fillText("корм: " + this.contains.foodOutput, this.position.x+5, this.position.y+50, this.width-15);
            ctx.fillText("молоко: " + this.contains.milk, this.position.x+5, this.position.y+35, this.width-15);
        } else if (name === "Chicken") {
            ctx.fillText("корм: " + this.contains.foodOutput,this.position.x+5, this.position.y+50, this.width-15);
            ctx.fillText("яйца: " + this.contains.eggs, this.position.x+5, this.position.y+35, this.width-15);
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
