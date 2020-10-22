let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 580;
const GAME_HEIGHT = 580;
let currentTime = 0;
let lastTime = 0;
let deltaTime = 0;

let field = new Field(GAME_WIDTH, GAME_HEIGHT, 70);
let buttons = document.getElementById("buttons");
field.pushTiles();

canvas.addEventListener("click", (e) => selectElem(e, canvas));

displayRightButtons();
document.addEventListener("click", displayRightButtons);

buttons.addEventListener("click", selectedCommander);

function gameLoop() {
    currentTime = (new Date()).getTime();
    deltaTime = (currentTime - lastTime);
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    field.draw(ctx, deltaTime);
    displayInfo();
    requestAnimationFrame(gameLoop);
    lastTime = currentTime;
}
requestAnimationFrame(gameLoop);
