function drawBackground() {
    // Sky gradient
    let sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#005560"); // top colour
    sky.addColorStop(1, "#B0E0E6"); // bottom colour
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Distant mountains
    ctx.fillStyle = "#556B2F";
    ctx.beginPath();
    ctx.moveTo(-175, 800);  // Bottom left corner
    ctx.lineTo(400, 150);// top corner
    ctx.lineTo(800, 800);// Bottom right corner
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(600, 800); // Bottom left corner
    ctx.lineTo(1100, 250);// Top corner
    ctx.lineTo(1700, 600);// Bottom right corner 
    ctx.fill();

    // Mid-ground hills
    ctx.fillStyle = "#627d35";
    ctx.beginPath();
    ctx.moveTo(1150, 400); //Bottom right corner
    ctx.quadraticCurveTo(500, 700, 6000, 1300);
    ctx.quadraticCurveTo(1000, 1100, 2000, 900);
    ctx.fill();

    ctx.fillStyle = "#627d35";
    ctx.beginPath();
    ctx.moveTo(1150, 400);
    ctx.quadraticCurveTo(500, 700, 1000, 900);
    ctx.quadraticCurveTo(1000, 1100, -1000, 900);
    ctx.fill();

    // Foreground grass line (just above your .Floor)
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, groundY + 64, canvas.width, 20);
}
