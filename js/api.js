const API_URL = 'http://localhost:4000/api/';

async function apiRequest(path, method = 'GET', body) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    const res = await fetch(`${API_URL}${path}` , {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    return res.json();
}

async function registerUser(email, password) {
    return apiRequest('auth/register', 'POST', { email, password });
}

async function loginUser(email, password) {
    return apiRequest('auth/login', 'POST', { email, password });
}
async function addScore(score) {
    return apiRequest('scores', 'POST', { score });
}

async function getUserScores() {
    return apiRequest('scores');
}

async function getLeaderboard() {
    return apiRequest('leaderboard');
}