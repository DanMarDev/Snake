function showAlert(message) {
    document.getElementById("alert").innerText = message;
    gameRunning = false;
    displayModal();
    // send final score if logged in
    if (localStorage.getItem("token")) {
        addScore(SNAKE_INIT_SIZE);
    }
}

function hideAlert() {
    hideModal();
    hideResumeButton();
    hideStopButton();
}

function startGame() {
    gameRunning = true;
    initGame();
    hideModal();
    hideStartButton();
    showStopButton();
    gameLoop();
}

function resumeGame() {
    gameRunning = true;
    hideModal();
    hideResumeButton();
    showStopButton();
    gameLoop();
}

function stopGame() {
    gameRunning = false;
    showResumeButton();
    hideStopButton();
}

function reset() {
    gameRunning = false;
    detectAndSetCustomSettings();
    initGame();
    hideResumeButton();
    hideStopButton();
    showStartButton();
}

function displayScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${SNAKE_INIT_SIZE}`;
}

function hideStartButton() {
    const startButton = document.getElementById("startButton");
    startButton.classList.add("hidden");
}

function showStartButton() {
    const startButton = document.getElementById("startButton");
    startButton.classList.remove("hidden");
}

function showResumeButton() {
    const resumeButton = document.getElementById("resumeButton");
    resumeButton.classList.remove("hidden");
}

function hideResumeButton() {
    const resumeButton = document.getElementById("resumeButton");
    resumeButton.classList.add("hidden");
}

function showStopButton() {
    const stopButton = document.getElementById("stopButton");
    stopButton.classList.remove("hidden");
}

function hideStopButton() {
    const stopButton = document.getElementById("stopButton");
    stopButton.classList.add("hidden");
}

function displayModal() {
    document.getElementById("modalOverlay").classList.remove("hidden");
    document.getElementById('customAlert').classList.remove('hidden');
}

function hideModal() {
    document.getElementById("modalOverlay").classList.add("hidden");
    document.getElementById('customAlert').classList.add('hidden');
}

// Auth buttons
document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn    = document.getElementById('loginBtn');
    const pastBtn     = document.getElementById('pastScoresBtn');
    const leadBtn     = document.getElementById('leaderboardBtn');
  
    registerBtn?.addEventListener('click', async () => {
      const res = await registerUser(
        document.getElementById('email').value,
        document.getElementById('password').value
      );
      if (res.token) {
        localStorage.setItem('token', res.token);
        document.getElementById('authMsg').innerText = 'Registration successful!';
      } else {
        document.getElementById('authMsg').innerText = res.message;
      }
    });
  
    loginBtn?.addEventListener('click', async () => {
      const res = await loginUser(
        document.getElementById('email').value,
        document.getElementById('password').value
      );
      if (res.token) {
        localStorage.setItem('token', res.token);
        document.getElementById('authMsg').innerText = 'Login successful!';
      } else {
        document.getElementById('authMsg').innerText = res.message;
      }
    });
  
    pastBtn?.addEventListener('click', async () => {
      const scores = await getUserScores();
      const list   = document.getElementById('pastScoresList');
      list.innerHTML = '';
      scores.forEach(s => {
        const li = document.createElement('li');
        li.innerText = `Score: ${s.score}, ${new Date(s.createdAt).toLocaleString()}`;
        list.appendChild(li);
      });
      list.classList.remove('hidden');
    });
  
    leadBtn?.addEventListener('click', async () => {
      const board = await getLeaderboard();
      const list  = document.getElementById('leaderboardList');
      list.innerHTML = '';
      board.forEach(e => {
        const li = document.createElement('li');
        li.innerText = `User: ${e.userId}, Score: ${e.score}`;
        list.appendChild(li);
      });
      list.classList.remove('hidden');
    });
  });
    
