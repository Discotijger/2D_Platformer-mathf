let Player = document.getElementById("Character");

let x = 100;
let y = 500;
let velocityY = 0;
let gravity = 0.5;
let groundY = 500;

let movingR = false;
let movingL = false;
let isJumping = false;



document.addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "D") {
    movingR = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "d" || event.key === "D") {
    movingR = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (x >= 1){
    if (event.key === "a" || event.key === "A") {
      movingL = true;
    }
  }else{
    movingL = false;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "A") {
    movingL = false;
  }
});

document.addEventListener("keydown", e => {
    if (e.key === " " && !isJumping) {  // spacebar
        velocityY = -15; // jump strength
        isJumping = true;
    }
});


function Movement() {
    if (movingR){
        x += 2; // speed
        Player.style.left = x + "px";
    }
  
    if (movingL){
        x -= 2;
        Player.style.left = x + "px";
    }

    // Apply gravity
    velocityY += gravity;
    y += velocityY;
    Player.style.top = y + "px";

    // Check if player hits the ground
    if (y >= groundY) {
        y = groundY;
        velocityY = 0;
        isJumping = false;
    }

    requestAnimationFrame(Movement);
}



Movement();
