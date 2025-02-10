// Combined key and gamepad mappings
const controlMappings = {
    "1": { action: () => addTime('addButton'), gamepadButton: 2 },
    "2": { action: () => addTime('addButton2'), gamepadButton: 1 },
    "3": { action: zoomOut, gamepadButton: 15 },
    "4": { action: zoomIn, gamepadButton: 14 },
    "6": { action: openSettings, gamepadButton: 8 },
    "b": { action: resetToNextValue, gamepadButton: 0 },
    "r": { action: resetTimer, gamepadButton: 3 },
    "t": { action: toggleBoutonsRonds },
    "o": { action: reloadPage },
    "w": { action: resetScores },
    "v": { action: resetTextVariables },
    " ": { action: pauseTimer, gamepadButton: 9 },
    "q": { action: toggleFullscreen, gamepadButton: 12 },
    "z": { action: toggleVisibility, gamepadButton: 13 },
    "s": { action: () => document.getElementById("p1plus").click(), gamepadButton: 4 },
    "x": { action: () => document.getElementById("p1moins").click(), gamepadButton: 6 },
    "d": { action: () => document.getElementById("p2plus").click(), gamepadButton: 5 },
    "c": { action: () => document.getElementById("p2moins").click(), gamepadButton: 7 }
};

// Centralized event handler for both keyboard and gamepad input
function handleInput(keyOrButton) {
    const control = controlMappings[keyOrButton];
    if (control) {
        control.action();
    }
}

// Keydown Event Listener for keyboard input
document.addEventListener("keydown", (event) => {
    if (!document.activeElement.matches('input, textarea')) {
        event.preventDefault();
        handleInput(event.key);
    }
});

// Gamepad Setup
let gamepadIndex = null;
let gamepadButtonsPressed = new Set();
let gamepadPolling = false;
let lastPollTime = 0;
const pollInterval = 100; // milliseconds

// Detect gamepad connection
window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    if (!gamepadPolling) {
        gamepadPolling = true;
        requestAnimationFrame(pollGamepad);
    }
});

// Detect gamepad disconnection
window.addEventListener("gamepaddisconnected", () => {
    console.log("Gamepad disconnected");
    gamepadIndex = null;
    gamepadPolling = false;
});

// Polling function for gamepad input
function pollGamepad(timestamp) {
    if (!gamepadIndex) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    // Skip polling if the interval has not passed
    if (timestamp - lastPollTime < pollInterval) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (gamepad) {
        gamepad.buttons.forEach((button, index) => {
            if (button.pressed && !gamepadButtonsPressed.has(index)) {
                gamepadButtonsPressed.add(index);
                const key = Object.keys(controlMappings).find(key => controlMappings[key].gamepadButton === index);
                if (key) {
                    handleInput(key);
                }
            } else if (!button.pressed) {
                gamepadButtonsPressed.delete(index);
            }
        });
    }

    lastPollTime = timestamp;
    requestAnimationFrame(pollGamepad);
}
