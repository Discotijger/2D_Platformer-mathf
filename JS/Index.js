let x = 100;
let y = 500;
let velocityY = 0;
let gravity = 0.5;
let groundY = 550;

let movingR = false;
let movingL = false;
let isJumping = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Load your single sprite sheet
const sprite = new Image();
sprite.src = "Assets/Sprite-Player.png";

// Sprite sheet info
const frameWidth = 32;
const frameHeight = 64;

let currentFrame = 0; // current frame of the spritesheet
const totalFrames = 9; // frames per row in the spritesheet
let frameDelay = 0; // variable for loop
let maxFrameDelay = 7; // higher number = slower animation


// animationRow:
// 0 = idle
// 1 = run left
// 2 = run right
let animationRow = 0;




const platforms = [
    { x: 340, y: 500, width: 200, height: 20 },
    { x: 700, y: 431, width: 250, height: 20 },
    { x: 1200, y: 400, width: 180, height: 20 }
];

function drawPlatforms() {
    ctx.fillStyle = "#3B3B3B";
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });
}


function checkPlatformCollision() {
    let playerBottom = y + frameHeight;
    let playerTop = y;
    let playerLeft = x;
    let playerRight = x + frameWidth;

    platforms.forEach(p => {
        let platformTop = p.y;
        let platformLeft = p.x;
        let platformRight = p.x + p.width;

        // Check horizontal overlap
        let horizontalOverlap =
            playerRight > platformLeft &&
            playerLeft < platformRight;

        // Check if player is falling onto the platform
        if (horizontalOverlap &&
            playerBottom >= platformTop &&
            playerBottom <= platformTop + 20 &&   // small tolerance
            velocityY >= 0) {

            // Snap player to platform
            y = platformTop - frameHeight;
            velocityY = 0;
            isJumping = false;
        }
    });
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  drawPlatforms();

  // Pick animation row based on movement
  if (movingL) animationRow = 1;
  else if (movingR) animationRow = 2;
  else animationRow = 0;

  // Draw correct frame from correct row
  ctx.drawImage(
    sprite,
    currentFrame * frameWidth,         // source x
    animationRow * frameHeight,        // source y (row)
    frameWidth,
    frameHeight,
    x, y,                               // draw at player position
    frameWidth,
    frameHeight
  );

  frameDelay++;

  if (frameDelay >= maxFrameDelay) {

    if (animationRow === 1) {
      // reverse animation for run-left
      currentFrame = (currentFrame - 1 + totalFrames) % totalFrames;
    } else {
      // normal animation
      currentFrame = (currentFrame + 1) % totalFrames;
    }

      frameDelay = 0;
  }



  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ---------------- MOVEMENT & INPUT ----------------

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

document.addEventListener("keydown", e => {
  if (e.key === " " && !isJumping) {
    velocityY = -13; // jump strength
    isJumping = true;
  }
});

// ---------------- PHYSICS & MOVEMENT ----------------

function Movement() {
    if (movingR) x += 3;
    if (movingL) x -= 3;

    velocityY += gravity;
    y += velocityY;

    //Platform collision
    checkPlatformCollision();

    // Ground collision
    if (y >= groundY) {
        y = groundY;
        velocityY = 0;
        isJumping = false;
    }

    requestAnimationFrame(Movement);
}

Movement();
