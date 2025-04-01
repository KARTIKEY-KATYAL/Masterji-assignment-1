let GameBoard 
let ctx 

let rows = 21
let cols = 21
let induvidalboxsize = 25

let foodx = 0
let foody = 0

let snakeX = 10 * induvidalboxsize
let snakeY = 10 * induvidalboxsize

let speedX = 0
let speedY = 0

let snakebody = []

let gaveover = false

let score = 0
let highscore = parseInt(localStorage.getItem("highscore")) || 0

function placerandomfood(){
    foodx = Math.floor(Math.random() * rows)*induvidalboxsize
    foody = Math.floor(Math.random() * cols)*induvidalboxsize
}

window.onload = function () {
    GameBoard = document.getElementById("game-board");
    ctx = GameBoard.getContext("2d")
    GameBoard.height = rows*induvidalboxsize
    GameBoard.width = cols*induvidalboxsize

placerandomfood()
updatescore()

document.addEventListener("keyup",changedirection)
eventId = setInterval(start,100)

}

function updatescore(){
    document.getElementById("yourscore").textContent = score
    document.getElementById("highscore").textContent = highscore;

    localStorage.setItem("highscore",highscore)
}

function start() {
        if (gaveover){
            clearInterval(eventId)

            return
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, GameBoard.width, GameBoard.height);
        
        ctx.fillStyle = "#C42021";
        ctx.fillRect(foodx, foody, induvidalboxsize, induvidalboxsize);

        // Update snake body
        for (let i = snakebody.length - 1; i > 0; i--) {
            snakebody[i] = snakebody[i-1]
        }
        if (snakebody.length) {
            snakebody[0] = [snakeX, snakeY];
        }

        // Check if snake collides with itself
        for (let i = 1; i < snakebody.length; i++) {
            if (snakeX === snakebody[i][0] && snakeY === snakebody[i][1]) {
                gaveover = true
                alert("Game over");
            }
        }

        // Update snake head position
        snakeX += speedX * induvidalboxsize;
        snakeY += speedY * induvidalboxsize;

        if (snakeX == foodx && snakeY == foody) {
            snakebody.push([foodx, foody]);
            score++;
            highscore = Math.max(score, highscore);
            updatescore();
            placerandomfood();
        }

        // Handle wall collision
        if (snakeX >= GameBoard.width) {
            // snakeX = 0;
            gaveover = true
            alert("Gave Over")
            // start()
        }
        else if (snakeX < 0) {
            // snakeX = GameBoard.width - induvidalboxsize;
            gaveover = true
            alert("Gave Over")
            // start()
        }
        else if (snakeY < 0) {
            // snakeY = GameBoard.height - induvidalboxsize;
            gaveover = true
            alert("Gave Over")
            // start()
        }
        else if (snakeY >= GameBoard.height) {
            // snakeY = 0;
            gaveover = true
            alert("Gave Over")
            // start()
        }

        // Draw snake
        ctx.fillStyle = "yellow";
        ctx.fillRect(snakeX, snakeY, induvidalboxsize, induvidalboxsize);
        for (let i = 0; i < snakebody.length; i++) {
            ctx.fillRect(snakebody[i][0], snakebody[i][1], induvidalboxsize, induvidalboxsize);
        }
}

function changedirection(event) {
    // console.log(event)
    if (event.code === "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (event.code === "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (event.code === "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (event.code === "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
    else if (event.code === "Space"){
        speedX = 0;
        speedY = 0;
    }
    else if (event.code === "Enter"){
        const restart = confirm("Do you want to restart ?")
        
        if (restart){
            clearInterval(eventId);

            placerandomfood()

            snakeX = 10 * induvidalboxsize;
            snakeY = 10 * induvidalboxsize;

            speedX = 0;
            speedY = 0;

            gaveover = false;
            snakebody = [];

            eventId = setInterval(start,100)

            score =0
            highscore = parseInt(localStorage.getItem("highscore")) || 0;
            updatescore();
        }
        else{
            alert("see you next time")
        }
    }
}

updatescore()