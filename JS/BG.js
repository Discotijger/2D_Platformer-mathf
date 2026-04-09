function drawBackground() {
    // Sky gradient
    let sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    sky.addColorStop(0, "#87CEEB");
    sky.addColorStop(1, "#B0E0E6");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Distant mountains
    ctx.fillStyle = "#556B2F";
    ctx.beginPath();
    ctx.moveTo(0, 800);
    ctx.lineTo(400, 300);
    ctx.lineTo(800, 800);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(600, 800);
    ctx.lineTo(1100, 250);
    ctx.lineTo(1500, 800);
    ctx.fill();

    // Mid-ground hills
    ctx.fillStyle = "#6B8E23";
    ctx.beginPath();
    ctx.moveTo(0, 900);
    ctx.quadraticCurveTo(500, 700, 1000, 900);
    ctx.quadraticCurveTo(1500, 1100, 2000, 900);
    ctx.fill();

    // Foreground grass line (just above your .Floor)
    ctx.fillStyle = "#228B22";
    ctx.fillRect(0, groundY + 64, canvas.width, 20);
}
