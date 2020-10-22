class Cow {
    name = "Cow";
    translatedName = "Корова";
    static speed = 20;
    food = 0;
    milk = 0;
    loading = false;

    get foodOutput() {
        return (this.food === -1 ? 0 : this.food);
    }

    startMilk() {
        if (this.food !== -1) {
            this.loading = true;
            setTimeout(() => {
                this.makeMilk();
            }, 1000 * Cow.speed);
        }
    }

    feed() {
        if (this.food !== 0 || this.loading) this.food += 1;
        Wheat.wheatDecrease(1);
        if (this.food <= 0) {
            this.startMilk();
        }
    }

    getHungry() {
        this.food--;
    }

    makeMilk() {
        if (this.food !== -1) {
            this.getHungry();
            this.milk++;
        }
        this.loading = false;
        this.startMilk();
    }

    collect() {
        if (this.milk > 0) {
            Milk.increase(this.milk);
            this.milk = 0;
        }
    }


}
