function showAlert(message) {
    document.getElementById("alert").innerText = message;
    gameRunning = false;
    displayModal();
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