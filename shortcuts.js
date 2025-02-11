const keyActions = {
    "z": () => addTime('addButton'),
    "m": () => addTime('addButton2'),
    "t": zoomIn,
    "y": zoomOut,
    "r": openSettings,
    "d": toggleBoutonsRonds,
    "i": openInstructions,
    "Alt": resetToNextValue,
    "Control": resetTimer,
    "1": reloadPage,
    "9": resetScores,
    "8": resetTextVariables,
    " ": pauseTimer,
    "v": toggleFullscreen,
    "Shift": toggleVisibility,    
    "a": () => document.getElementById("p1plus").click(),
    "q": () => document.getElementById("p1moins").click(),
    "k": () => document.getElementById("p2plus").click(),
    "o": () => document.getElementById("p2moins").click()
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
    0: " ",     // B
    1: "Control",  // A
    2: "Alt",   // Y
    3: "m",     // X
    4: "a",     // 
    5: "k",     //
    6: "q",     //
    7: "o",     //
    8: "i",     //
    9: "r",     //
    10: "9",    //
    11: "1",    //
    12: "z",    //
    13: "Shift", //
    14: "t",    //
    15: "y",    //
    16: "d"     //
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
