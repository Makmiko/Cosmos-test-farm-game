class Chicken {
    name = "Chicken";
    translatedName = "Курица";
    static speed = 10;
    food = 0;
    eggs = 0;
    loading = false;

    get foodOutput() {
        return (this.food === -1 ? 0 : this.food);
    }

    feed() {
        if (this.food !== 0 || this.loading) {
            this.food += 3;
        } else {
            this.food += 2;
        }
        Wheat.wheatDecrease(1);
        if (this.food <= 3) {
            this.startEggs();
        }
    }

    getHungry() {
        this.food--;
    }

    startEggs() {
        if (this.food !== -1) {
            this.loading = true;
            setTimeout(() => {
                this.makeEggs();
            }, 1000 * Chicken.speed);
        }
    }

    makeEggs() {
        if (this.food !== -1) {
            this.getHungry();
            this.eggs++;
        }
        this.loading = false;
        this.startEggs();
    }

    collect() {
        Eggs.increase(this.eggs);
        this.eggs = 0;
    }
}
