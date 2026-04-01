let Player = document.getElementById("Character");

let x = 0;
let movingR = false;
let movingL = false;


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
  if (event.key === "a" || event.key === "A") {
    movingL = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "A") {
    movingL = false;
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
    requestAnimationFrame(Movement);
}



Movement();
