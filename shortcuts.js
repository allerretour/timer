const keyActions = {
    "1": () => addTime('addButton'),
    "2": () => addTime('addButton2'),
    "3": zoomOut,
    "4": zoomIn,
    "6": openSettings,
    "b": resetToNextValue,
    "r": resetTimer,
    "t": toggleBoutonsRonds,
    "o": reloadPage,
    "w": resetScores,
    "v": resetTextVariables,
    " ": pauseTimer,
    "q": toggleFullscreen,
    "z": toggleVisibility,
    "s": () => document.getElementById("p1plus").click(),
    "x": () => document.getElementById("p1moins").click(),
    "d": () => document.getElementById("p2plus").click(),
    "c": () => document.getElementById("p2moins").click()
};

// Keydown Event Listener
document.addEventListener("keydown", (event) => {
    if (keyActions[event.key] && !document.activeElement.matches('input, textarea')) {
        event.preventDefault();
        keyActions[event.key]();
    }
});

// Gamepad Setup
let gamepadIndex = null;
let gamepadButtonsPressed = new Set();
let gamepadPolling = false;

// Button mappings
const gamepadMapping = {
    2: "1",
    1: "2",
    0: "b",
    3: "r",
    8: "6",
    9: " ",
    12: "q",
    13: "z",
    4: "s",
    6: "x",
    5: "d",
    14: "4",
    15: "3",
    7: "c"
};

// Detect gamepad connection
window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    if (!gamepadPolling) {
        gamepadPolling = true;
        pollGamepad();
    }
});

window.addEventListener("gamepaddisconnected", () => {
    console.log("Gamepad disconnected");
    gamepadIndex = null;
    gamepadPolling = false;
});

// Polling function
function pollGamepad() {
    if (gamepadIndex === null) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    // Handle button presses
    gamepad.buttons.forEach((button, index) => {
        if (button.pressed && !gamepadButtonsPressed.has(index)) {
            gamepadButtonsPressed.add(index);
            if (gamepadMapping[index]) {
                keyActions[gamepadMapping[index]]?.();
            }
        } else if (!button.pressed) {
            gamepadButtonsPressed.delete(index);
        }
    });

    requestAnimationFrame(pollGamepad);
}

requestAnimationFrame(pollGamepad);
