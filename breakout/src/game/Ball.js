export function BallMovement(ctx, ballObj) {
  let ball = new Ball(
    ballObj.x,
    ballObj.y,
    ballObj.radius,
    ballObj.speed,
    ballObj.dx,
    ballObj.dy);
  ball.drawBall(ctx);
  ballObj.x += ballObj.dx;
  ballObj.y += ballObj.dy;
}

class Ball {
  constructor(x, y, radius, speed, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.dx = dx;
    this.dy = dy;
  }

  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#309c9c";
    ctx.strokeStyle = "#a50a76";
    ctx.strokeWidth = 5;

    ctx.fill();
    ctx.stroke();
  }
}

