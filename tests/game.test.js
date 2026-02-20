import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import * as Game from '../js/game.js';

describe('Pong Game Logic', () => {
  beforeEach(() => {
    Game.initGameState(800, 600);
  });

  test('rectCollision should detect collisions correctly', () => {
    // Overlapping rectangles
    assert.strictEqual(Game.rectCollision(0, 0, 10, 10, 5, 5, 10, 10), true);
    // Non-overlapping
    assert.strictEqual(Game.rectCollision(0, 0, 10, 10, 20, 20, 10, 10), false);
    // Touching edges
    assert.strictEqual(Game.rectCollision(0, 0, 10, 10, 10, 0, 10, 10), false);
  });

  test('initGameState should set initial state', () => {
    assert.strictEqual(Game.W, 800);
    assert.strictEqual(Game.H, 600);
    assert.strictEqual(Game.gameRunning, false);
    assert.strictEqual(Game.scores.p1, 0);
    assert.strictEqual(Game.scores.p2, 0);
  });

  test('resetBall should place ball in center', () => {
    Game.resetBall(1);
    const expectedX = Game.W / 2 - Game.ballSize / 2;
    const expectedY = Game.H / 2 - Game.ballSize / 2;
    assert.strictEqual(Game.ball.x, expectedX);
    assert.strictEqual(Game.ball.y, expectedY);
  });

  test('update should move the ball', () => {
    Game.setGameRunning(true);
    Game.ball.x = 100;
    Game.ball.y = 100;
    Game.ball.dx = 5;
    Game.ball.dy = 5;

    Game.update();

    assert.strictEqual(Game.ball.x, 105);
    assert.strictEqual(Game.ball.y, 105);
  });

  test('update should handle top wall collision', () => {
    Game.setGameRunning(true);
    Game.ball.y = 0;
    Game.ball.dy = -5;

    Game.update();

    assert.strictEqual(Game.ball.y, 0);
    assert.strictEqual(Game.ball.dy, 5); // Reversed
  });

  test('update should handle bottom wall collision', () => {
    Game.setGameRunning(true);
    Game.ball.y = Game.H - Game.ballSize;
    Game.ball.dy = 5;

    Game.update();

    assert.strictEqual(Game.ball.y, Game.H - Game.ballSize);
    assert.strictEqual(Game.ball.dy, -5); // Reversed
  });

  test('update should trigger scoring for player 2', () => {
    Game.setGameRunning(true);
    Game.ball.x = -Game.ballSize - 1;
    Game.ball.dx = -5;

    let scoreCalled = false;
    const callbacks = {
      onScore: (p, s) => {
        if (p === 'p2' && s === 1) scoreCalled = true;
      }
    };

    Game.update(callbacks);

    assert.strictEqual(Game.scores.p2, 1);
    assert.strictEqual(scoreCalled, true);
  });

  test('update should trigger scoring for player 1', () => {
    Game.setGameRunning(true);
    Game.ball.x = Game.W + 1;
    Game.ball.dx = 5;

    let scoreCalled = false;
    const callbacks = {
      onScore: (p, s) => {
        if (p === 'p1' && s === 1) scoreCalled = true;
      }
    };

    Game.update(callbacks);

    assert.strictEqual(Game.scores.p1, 1);
    assert.strictEqual(scoreCalled, true);
  });

  test('update should handle player paddle collision', () => {
    Game.setGameRunning(true);
    // Align ball with player paddle
    Game.ball.x = Game.player.x + Game.paddleW - 1;
    Game.ball.y = Game.player.y + 10;
    Game.ball.dx = -5;
    Game.ball.dy = 0;

    Game.update();

    assert.ok(Game.ball.dx > 0); // Should bounce back
    assert.strictEqual(Game.ball.x, Game.player.x + Game.paddleW);
  });

  test('update should handle CPU paddle collision', () => {
    Game.setGameRunning(true);
    // Align ball with CPU paddle
    Game.ball.x = Game.cpu.x - Game.ballSize + 1;
    Game.ball.y = Game.cpu.y + 10;
    Game.ball.dx = 5;
    Game.ball.dy = 0;

    Game.update();

    assert.ok(Game.ball.dx < 0); // Should bounce back
    assert.strictEqual(Game.ball.x, Game.cpu.x - Game.ballSize);
  });

  test('game should end after 11 points', () => {
    Game.setGameRunning(true);
    Game.scores.p1 = 10;
    Game.ball.x = Game.W + 1;
    Game.ball.dx = 5;

    let gameOverCalled = false;
    const callbacks = {
      onGameOver: () => { gameOverCalled = true; }
    };

    Game.update(callbacks);

    assert.strictEqual(Game.gameRunning, false);
    assert.strictEqual(gameOverCalled, true);
  });
});
