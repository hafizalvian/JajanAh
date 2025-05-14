// Game elements
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');

// Game variables
let score = 0;
let ballX = 0;
let ballY = 0;
let ballSpeedY = 2;
let ballSpeedX = 0;  // Added horizontal speed for more interesting bounces
let paddleX = 150;
const paddleWidth = 100;
const ballSize = 30;
const containerWidth = 400;
const containerHeight = 500;

// Initialize ball position
function initBall() {
    ballX = Math.random() * (containerWidth - ballSize);
    ballY = 0;
    // Randomize initial horizontal direction
    ballSpeedX = Math.random() > 0.5 ? 1 : -1;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Update paddle position based on mouse movement
gameContainer.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Keep paddle within game container
    if (mouseX >= 0 && mouseX <= containerWidth - paddleWidth) {
        paddleX = mouseX;
        paddle.style.left = paddleX + 'px';
    }
});

// Game loop
function gameLoop() {
    // Update ball position
    ballY += ballSpeedY;
    ballX += ballSpeedX;
    
    // Check for collision with side walls
    if (ballX <= 0 || ballX >= containerWidth - ballSize) {
        ballSpeedX = -ballSpeedX; // Reverse horizontal direction
    }
    
    // Check for collision with paddle
    if (ballY >= 450 && ballY <= 470) {
        if (ballX + ballSize >= paddleX && ballX <= paddleX + paddleWidth) {
            // Ball bounces off paddle
            ballSpeedY = -ballSpeedY; // Reverse vertical direction
            
            // Add a bit of horizontal influence based on where the ball hits the paddle
            const hitPosition = (ballX + ballSize/2) - paddleX;
            const paddleCenter = paddleWidth / 2;
            ballSpeedX = 3 * ((hitPosition - paddleCenter) / paddleCenter);
            
            // Increase score
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }
    
    // Check if ball hits the top
    if (ballY <= 0) {
        ballSpeedY = -ballSpeedY; // Bounce off the top
    }
    
    // Check if ball is out of bounds (bottom)
    if (ballY > containerHeight) {
        // Game over - reset ball
        initBall();
    }
    
    // Update ball position on screen
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
    
    requestAnimationFrame(gameLoop);
}

// Start the game
initBall();
paddle.style.left = paddleX + 'px';
gameLoop();
