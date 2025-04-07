function showAlert(message) {
    document.getElementById("alert").innerText = message;
    gameRunning = false; // Stop the game loop
    document.getElementById("modalOverlay").classList.remove("hidden");
    document.getElementById('customAlert').classList.remove('hidden');
}

function hideAlert() {
    document.getElementById("modalOverlay").classList.add("hidden");
    document.getElementById('customAlert').classList.add('hidden');
    resetGame(); // Reset the game state
    gameLoop(); // Restart the game loop
}