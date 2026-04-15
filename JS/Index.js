// Sprite sheet info
const frameWidth = 64;
const frameHeight = 64;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const sprite = new Image(); // Load your single sprite sheet


// --- Animation config ---
const IDLE_FRAMES = 6;
const RUN_FRAMES  = 9;
let currentFrame = 0;
let frameDelay = 0;
let maxFrameDelay = 3;
let animationRow = 0;      // 0 = idle, 1 = run
let lastAnimationRow = 0;  // to detect changes

// --- Gravity / Floor config ---
let x = 100;
let y = 500;
let velocityY = 0;
let gravity = 0.5;
let groundY = 550;

let movingR = false;
let movingL = false;
let isJumping = false;
let facingLeft = false;

// --- Stats ---
let _Health = 100;
let _Shield = 50;
const _Agility = 5;

// sprite.src = "Assets/Sprite-Player.png";
sprite.src = "Assets/Sprite.png";

const platforms = [
  { x: 340, y: 500, width: 200, height: 20 },
  { x: 700, y: 431, width: 300, height: 20 },
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

  drawBackground();
  drawPlatforms();

  // --- choose animation row ---
  let newRow = 0; // idle
  if (movingL || movingR) {
    newRow = 1;   // run
  }

  // if animation changed (idle <-> run), reset frame
  if (newRow !== animationRow) {
    animationRow = newRow;
    currentFrame = 0;
    frameDelay = 0;
  }

  ctx.save();

  if (facingLeft) {
      ctx.scale(-1, 1);  
      ctx.drawImage(
          sprite,
          currentFrame * frameWidth,
          animationRow * frameHeight,
          frameWidth,
          frameHeight,
          -x - frameWidth,  // flipped drawing position
          y,
          frameWidth,
          frameHeight
      );
  } else {
      ctx.drawImage(
          sprite,
          currentFrame * frameWidth,
          animationRow * frameHeight,
          frameWidth,
          frameHeight,
          x,
          y,
          frameWidth,
          frameHeight
      );
  }

  ctx.restore();


  // --- advance animation ---
  frameDelay++;

  if (frameDelay >= maxFrameDelay) {
    const frameCount = (animationRow === 0) ? IDLE_FRAMES : RUN_FRAMES;
    currentFrame = (currentFrame + 1) % frameCount;
    frameDelay = 0;
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


// ---------------- MOVEMENT & INPUT ----------------

document.addEventListener("keydown", (event) => {
  if (event.key === "d" || event.key === "D") {
    movingR = true;
    facingLeft = false;
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
    facingLeft = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "a" || event.key === "A") {
    movingL = false;
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "w" && !isJumping) {
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

