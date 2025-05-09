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
// document.addEventListener('DOMContentLoaded', () => {
//     const token       = localStorage.getItem('token');
//     const registerBtn = document.getElementById('registerBtn');
//     const loginBtn    = document.getElementById('loginBtn');
//     const pastBtn     = document.getElementById('pastScoresBtn');
//     const leadBtn     = document.getElementById('leaderboardBtn');
//     const logoutBtn   = document.getElementById('logoutBtn');
  
//     if (token) {
//         loggedInButtons();
//     } else {
//         noAccountButtons();
//     }

//     registerBtn?.addEventListener('click', async () => {
//       const res = await registerUser(
//         document.getElementById('email').value,
//         document.getElementById('password').value
//       );
//       if (res.token) {
//         localStorage.setItem('token', res.token);
//         document.getElementById('authMsg').innerText = 'Registration successful!';
//         loggedInButtons();
//       } else {
//         document.getElementById('authMsg').innerText = res.message;
//       }
//     });
  
//     loginBtn?.addEventListener('click', async () => {
//       const res = await loginUser(
//         document.getElementById('email').value,
//         document.getElementById('password').value
//       );
//       if (res.token) {
//         localStorage.setItem('token', res.token);
//         document.getElementById('authMsg').innerText = 'Login successful!';
//         loggedInButtons();
//       } else {
//         document.getElementById('authMsg').innerText = res.message;
//       }
//     });
  
//     pastBtn?.addEventListener('click', async () => {
//         try {
//             const scores = await getUserScores();
//             const list   = document.getElementById('pastScoresList');
//             list.innerHTML = '';

//             if (scores.length === 0) {
//                 list.innerHTML = '<li>No past scores found.</li>';
//             } else {
//                 scores.forEach(s => {
//                     const li = document.createElement('li');
//                     li.innerText = `Score: ${s.score}, ${new Date(s.createdAt).toLocaleString()}`;
//                     list.appendChild(li);
//                 });
//             }

//             list.classList.remove('hidden');
//         } catch (error) {
//             console.error('Error fetching past scores:', error);
//         }
//     });

//     logoutBtn?.addEventListener('click', () => {
//         localStorage.removeItem('token');
//         document.getElementById('authMsg').innerText = 'Logged out successfully!';
//         noAccountButtons();
//     });
  
//     leadBtn?.addEventListener('click', async () => {
//         try {
//             const board = await getLeaderboard();
//             const list  = document.getElementById('leaderboardList');
//             list.innerHTML = '';
//             if (board.length === 0) {
//                 list.innerHTML = '<li>No scores found.</li>';
//             } else {
//                 board.forEach(e => {
//                     const li   = document.createElement('li');
//                     const user = e.userId.email || e.userId;
//                     li.innerText = `User: ${user}, Score: ${e.score}`;
//                     list.appendChild(li);
//                 });
//             }
//             list.classList.remove('hidden');
//         } catch (error) {
//             console.error('Error fetching leaderboard:', error);
//         }
//     });
// });

// Auth helpers

function loggedInButtons() {
    const logoutBtn   = document.getElementById('logoutBtn');
    const pastBtn     = document.getElementById('pastScoresBtn');
    const leadBtn     = document.getElementById('leaderboardBtn');

    logoutBtn.classList.remove('hidden');
    pastBtn.classList.remove('hidden');
    leadBtn.classList.remove('hidden');
}

function noAccountButtons() {
    const logoutBtn   = document.getElementById('logoutBtn');
    const pastBtn     = document.getElementById('pastScoresBtn');
    const leadBtn     = document.getElementById('leaderboardBtn');

    logoutBtn.classList.add('hidden');
    pastBtn.classList.add('hidden');
    leadBtn.classList.add('hidden');
}

const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const authMsg = document.getElementById('authMsg');
const switchBtn = document.getElementById('switchAuth');
const loginBtn = document.getElementById('loginBtn');
const pastBtn = document.getElementById('pastScoresBtn');
const leadBtn = document.getElementById('leaderboardBtn');
const pastList = document.getElementById('pastScoresList');
const leadList = document.getElementById('leaderboardList');

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        showGameUI();
        loggedInButtons();
    } else {
        showAuthUI();
        noAccountButtons();
    }

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        let res;

        if (authTitle.innerText === 'Register') {
            res = await registerUser(email, password);
        }
        if (authTitle.innerText === 'Login') {
            res = await loginUser(email, password);
        }

        authMsg.classList.remove('hidden');
        if (res.token) {
            localStorage.setItem('token', res.token);
            authMsg.innerText = '';
            authMsg.classList.add('hidden');
            showGameUI();
            loggedInButtons();
            hideAuthUI();
        } else {
            authMsg.innerText = res.message;
        }
        
    });

    switchBtn.addEventListener('click', () => {
        if (authTitle.innerText === 'Login') {
            authTitle.innerText = 'Register';
            authSubmit.innerText = 'Register';
            switchBtn.innerText = 'Already have an account? Login';
        } else {
            authTitle.innerText = 'Login';
            authSubmit.innerText = 'Login';
            switchBtn.innerText = 'Don\'t have an account? Register';
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        showAuthUI();
        hideGameUI();
        noAccountButtons();
    });

    pastBtn.addEventListener('click', async () => {
        if (pastList.classList.contains('hidden')) {
            try {
                const scores = await getUserScores();
                const list   = document.getElementById('pastScoresList');
                list.innerHTML = '';
                list.innerHTML = '<h3>Past Scores</h3>';
    
                if (scores.length === 0) {
                    list.innerHTML = '<li>No past scores found.</li>';
                } else {
                    scores.forEach(s => {
                        const li = document.createElement('li');
                        li.innerText = `Score: ${s.score} -- ${new Date(s.createdAt).toLocaleString()}`;
                        list.appendChild(li);
                    });
                }
    
                list.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching past scores:', error);
            }
        } else{
            pastList.classList.add('hidden');
        }
        
    });

    leadBtn.addEventListener('click', async () => {
        if (leadList.classList.contains('hidden')) {
            try {
                const board = await getLeaderboard();
                const list  = document.getElementById('leaderboardList');
                list.innerHTML = '<h3>Leaderboard</h3>';
                if (board.length === 0) {
                    list.innerHTML = '<li>No scores found.</li>';
                } else {
                    board.forEach(e => {
                        const li   = document.createElement('li');
                        const user = e.userId.email || e.userId;
                        li.innerText = `User: ${user}, Score: ${e.score}`;
                        list.appendChild(li);
                    });
                }
                list.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        } else {
            leadList.classList.add('hidden');
        }
    });


});

function showAuthUI() {
    authModal.classList.remove('hidden');
    document.getElementById('gameUI').classList.add('hidden');
}

function hideAuthUI() {
    authModal.classList.add('hidden');
}

function showGameUI() {
    authModal.classList.add('hidden');
    document.getElementById('gameUI').classList.remove('hidden');
}

function hideGameUI() {
    document.getElementById('gameUI').classList.add('hidden');
}