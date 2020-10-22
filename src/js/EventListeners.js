function selectElem(event, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log('Canvas click coordinates:');
    console.log("x: " + x + " y: " + y);
    field.select({x: x, y: y});
}

function selectedCommander(event) {
    switch (event.target.id) {
        case "placeWheat":
            if(!(field.selectedTile.contains instanceof Wheat)) {
            field.selectedTile.place(new Wheat());
        }
            break;
        case "placeChicken":
            field.selectedTile.place(new Chicken());
            break;
        case "placeCow":
            field.selectedTile.place(new Cow());
            break;
        case "collect":
            field.selectedTile.contains.collect();
            break;
        case "feed":
            field.selectedTile.contains.feed();
            break;
        case "sellEggs":
            field.money += Eggs.sellAll();
            break;
        case "sellMilk":
            field.money += Milk.sellAll();
    }
}

function displayInfo() {
    let info = document.getElementById("info");
    info.firstElementChild.innerHTML = "Пшено: " + Wheat.amount
        + "<br>Яйца: " + Eggs.amount
        + "<br>Молоко: " + Milk.amount
        + "<br>Деньги: " + field.money;
}

function displayRightButtons() {
    let buttons = {
        placeWheat: document.querySelector("#placeWheat"),
        placeChicken: document.querySelector("#placeChicken"),
        placeCow: document.querySelector("#placeCow"),
        collect: document.querySelector("#collect"),
        feed: document.querySelector("#feed"),
        sellEggs: document.querySelector("#sellEggs"),
        sellMilk: document.querySelector("#sellMilk")
    };
    for (let button in buttons) {
        buttons[button].hidden = true;
    }
    if (field.selectedTile === null) {
        for (let button in buttons) {
            if (buttons[button].classList.contains("sellable")) {
                buttons[button].hidden = false;
            }
        }
    }
    if (field.selectedTile) {
        for (let button in buttons) {
            if (buttons[button].classList.contains("sellable")) {
                buttons[button].hidden = false;
            }
            if (buttons[button].classList.contains("placeable")) {
                buttons[button].hidden = false;
            }
        }
    }
    if (field.selectedTile && field.selectedTile.contains != null) {
        buttons["collect"].hidden = false;
        buttons["sellEggs"].hidden = false;
        buttons["sellMilk"].hidden = false;
        if (field.selectedTile.contains.name === "Cow"
            || field.selectedTile.contains.name === "Chicken") {
            buttons["feed"].hidden = false;
        }
    }
}
