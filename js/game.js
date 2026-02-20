export let W = 0, H = 0;
export let paddleW = 0, paddleH = 0, ballSize = 0;
export let gameRunning = false;
export let scores = { p1: 0, p2: 0 };

export const keys = { up: false, down: false };

export const player = { x: 0, y: 0, dy: 0 };
export const cpu = { x: 0, y: 0, dy: 0 };
export const ball = { x: 0, y: 0, dx: 0, dy: 0, speed: 0 };

export let cpuSpeed = 3;
export let mouseY = null;

export function setW(val) { W = val; }
export function setH(val) { H = val; }
export function setPaddleW(val) { paddleW = val; }
export function setPaddleH(val) { paddleH = val; }
export function setBallSize(val) { ballSize = val; }
export function setGameRunning(val) { gameRunning = val; }
export function setCpuSpeed(val) { cpuSpeed = val; }
export function setMouseY(val) { mouseY = val; }

export function initGameState(newW, newH) {
  W = newW;
  H = newH;
  paddleW = Math.max(8, W * 0.015);
  paddleH = Math.max(40, H * 0.18);
  ballSize = Math.max(6, W * 0.015);

  const margin = paddleW * 2;
  player.x = margin;
  player.y = H / 2 - paddleH / 2;

  cpu.x = W - margin - paddleW;
  cpu.y = H / 2 - paddleH / 2;

  scores.p1 = 0;
  scores.p2 = 0;

  cpuSpeed = H * 0.005;
  gameRunning = false;
}

export function resize(containerWidth, containerHeight, canvas) {
  const maxW = containerWidth - 20;
  const maxH = containerHeight - 100;
  const aspect = 4 / 3;

  if (maxW / aspect <= maxH) {
    W = Math.floor(maxW);
    H = Math.floor(maxW / aspect);
  } else {
    H = Math.floor(maxH);
    W = Math.floor(maxH * aspect);
  }

  W = Math.max(W, 200);
  H = Math.max(H, 150);

  if (canvas) {
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
  }

  paddleW = Math.max(8, W * 0.015);
  paddleH = Math.max(40, H * 0.18);
  ballSize = Math.max(6, W * 0.015);

  const margin = paddleW * 2;
  player.x = margin;
  cpu.x = W - margin - paddleW;

  if (!gameRunning) {
    player.y = H / 2 - paddleH / 2;
    cpu.y = H / 2 - paddleH / 2;
  }

  cpuSpeed = H * 0.005;
}

export function resetBall(direction) {
  ball.x = W / 2 - ballSize / 2;
  ball.y = H / 2 - ballSize / 2;
  ball.speed = Math.max(3, W * 0.005);
  const angle = (Math.random() * Math.PI / 3) - Math.PI / 6;
  ball.dx = ball.speed * Math.cos(angle) * direction;
  ball.dy = ball.speed * Math.sin(angle);
}

export function rectCollision(bx, by, bw, bh, px, py, pw, ph) {
  return bx < px + pw && bx + bw > px && by < py + ph && by + bh > py;
}

export function update(uiCallbacks) {
  if (!gameRunning) return;

  // Player movement
  const pSpeed = H * 0.008;
  if (mouseY !== null) {
    const target = mouseY - paddleH / 2;
    player.y += (target - player.y) * 0.15;
  }
  if (keys.up) player.y -= pSpeed;
  if (keys.down) player.y += pSpeed;

  player.y = Math.max(0, Math.min(H - paddleH, player.y));

  // CPU AI
  const cpuCenter = cpu.y + paddleH / 2;
  const ballCenter = ball.y + ballSize / 2;
  const diff = ballCenter - cpuCenter;
  const deadzone = paddleH * 0.1;

  if (Math.abs(diff) > deadzone) {
    const move = Math.min(cpuSpeed, Math.abs(diff)) * Math.sign(diff);
    cpu.y += move * (0.7 + Math.random() * 0.3);
  }
  cpu.y = Math.max(0, Math.min(H - paddleH, cpu.y));

  // Ball movement
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Top/bottom wall collision
  if (ball.y <= 0) {
    ball.y = 0;
    ball.dy = Math.abs(ball.dy);
  }
  if (ball.y + ballSize >= H) {
    ball.y = H - ballSize;
    ball.dy = -Math.abs(ball.dy);
  }

  // Paddle collisions
  if (rectCollision(ball.x, ball.y, ballSize, ballSize, player.x, player.y, paddleW, paddleH) && ball.dx < 0) {
    ball.x = player.x + paddleW;
    const hitPos = ((ball.y + ballSize / 2) - player.y) / paddleH;
    const angle = (hitPos - 0.5) * Math.PI * 0.6;
    ball.speed = Math.min(ball.speed * 1.05, W * 0.012);
    ball.dx = Math.abs(ball.speed * Math.cos(angle));
    ball.dy = ball.speed * Math.sin(angle);
  }

  if (rectCollision(ball.x, ball.y, ballSize, ballSize, cpu.x, cpu.y, paddleW, paddleH) && ball.dx > 0) {
    ball.x = cpu.x - ballSize;
    const hitPos = ((ball.y + ballSize / 2) - cpu.y) / paddleH;
    const angle = (hitPos - 0.5) * Math.PI * 0.6;
    ball.speed = Math.min(ball.speed * 1.05, W * 0.012);
    ball.dx = -Math.abs(ball.speed * Math.cos(angle));
    ball.dy = ball.speed * Math.sin(angle);
  }

  // Scoring
  if (ball.x + ballSize < 0) {
    scores.p2++;
    if (uiCallbacks && uiCallbacks.onScore) uiCallbacks.onScore('p2', scores.p2);
    resetBall(1);
  }
  if (ball.x > W) {
    scores.p1++;
    if (uiCallbacks && uiCallbacks.onScore) uiCallbacks.onScore('p1', scores.p1);
    resetBall(-1);
  }

  if (scores.p1 >= 11 || scores.p2 >= 11) {
    gameRunning = false;
    const winner = scores.p1 >= 11 ? '🏓 Player wins!' : '🤖 CPU wins!';
    if (uiCallbacks && uiCallbacks.onGameOver) uiCallbacks.onGameOver(winner);
    scores.p1 = 0; scores.p2 = 0;
    if (uiCallbacks && uiCallbacks.onScore) {
        uiCallbacks.onScore('p1', 0);
        uiCallbacks.onScore('p2', 0);
    }
  }
}
