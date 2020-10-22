class Milk {
    static amount = 0;
    static increase(amnt) {
        Milk.amount += amnt;
    }
    static sellAll() {
        let money = Milk.amount * 30;
        Milk.amount = 0;
        return money;
    }
}