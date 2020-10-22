class Eggs {
    static amount = 0;
    static increase(amnt) {
        Eggs.amount += amnt;
    }
    static decrease(amnt) {
        Eggs.amount -= amnt;
    }
    static sellAll() {
        let money = Eggs.amount * 10;
        Eggs.amount = 0;
        return money;
    }
}