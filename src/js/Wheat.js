class Wheat {
    name = "Wheat";
    translatedName = "Пшеница";
    stage = 0;
    static amount = 50;
    static speed = 10;
    loading = false;

    constructor() {
        Wheat.plant();
        this.startGrow();
    }

    static wheatDecrease(amnt) {
        Wheat.amount -= amnt;
    }

    startGrow() {
        this.loading = true;
        setTimeout(() => {
            this.grow();
        }, 1000 * Wheat.speed);
    }

    grow() {
        this.stage = 1;
        this.loading = false;
    }

    collect() {
        if (this.stage === 1) {
            Wheat.amount += 2;
            this.stage = 0;
            this.startGrow();
        }
    }

    static plant() {
        Wheat.amount--;
    }
}
