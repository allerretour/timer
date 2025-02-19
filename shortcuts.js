const keyActions = {
    "z": () => addTime('addButton'),
    "m": () => addTime('addButton2'),
    "t": zoomIn,
    "y": zoomOut,
    "r": openSettings,
    "d": toggleBoutonsRonds,
    "i": openInstructions,
    "c": resetToNextValue,
    "b": resetTimer,
    "w": reloadPage,
    "e": hideSplashScreen,
    "p": resetScores,
    "v": pauseTimer,
    "u": toggleFullscreen,
    "f": toggleVisibility,    
    "a": () => document.getElementById("p1plus").click(),
    "q": () => document.getElementById("p1moins").click(),
    "k": () => document.getElementById("p2plus").click(),
    "o": () => document.getElementById("p2moins").click(),

   "0": reloadPage,                        // Reloads the page
    "1": () => document.getElementById("p1plus").click(), // Increment player 1 score
    "2": resetScores,                        // Resets the scores
    "3": () => document.getElementById("p2plus").click(), // Increment player 2 score
    "4": () => addTime('addButton'),        // Adds time via 'addButton'
    "5": toggleVisibility,                  // Toggles visibility
    "6": () => addTime('addButton2'),       // Adds time via 'addButton2'
    "7": resetToNextValue,                  // Resets to next value
    "8": pauseTimer,                        // Pauses the timer
    "9": resetTimer                        // Resets the timer
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
let previousGamepadState = new Set();
let gamepadPolling = false;



// Button mappings (individual buttons)
const gamepadMapping = {
    0: "c",        // Button 0 (usually 'A' on Xbox/standard gamepad)
    1: "v",  // Button 1 (usually 'B' on Xbox/standard gamepad)
    2: "b",      // Button 2 (usually 'X' on Xbox/standard gamepad)
    3: "m",        // Button 3 (usually 'Y' on Xbox/standard gamepad)
    4: "a",        // Button 4 (Left Bumper - 'LB')
    5: "k",        // Button 5 (Right Bumper - 'RB')
    6: "q",        // Button 6 (Left Trigger - 'LT')
    7: "o",        // Button 7 (Right Trigger - 'RT')
    8: "i",        // Button 8 (Back button - 'Select')
    9: "r",        // Button 9 (Start button - 'Start')
    10: "p",       // Button 10 (Left Stick Button - L3)
    11: "w",       // Button 11 (Right Stick Button - R3)
    12: "z",       // Button 12 (D-Pad Up)
    13: "f",   // Button 13 (D-Pad Down)
    14: "t",       // Button 14 (D-Pad Left)
    15: "y",       // Button 15 (D-Pad Right)
    16: "d"        // Button 16 (custom or additional button)
};

// Define multiple button combinations and their corresponding actions
const comboMappings = {
    "6+7": "e",     // Buttons 4 and 5 together trigger key "2"
    "0+3": "m",     // Buttons 0 and 3 together trigger key "m"
    "1+2+3": "Alt"  // Buttons 1, 2, and 3 together trigger key "Alt"
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

    let currentlyPressed = new Set();

    // Store all currently pressed buttons
    gamepad.buttons.forEach((button, index) => {
        if (button.pressed) {
            currentlyPressed.add(index);
        }
    });

    let comboTriggered = false;

    // Check for defined combo mappings
    Object.keys(comboMappings).forEach(combo => {
        const buttonIndexes = combo.split("+").map(Number);
        
        // If all buttons in a combo are pressed
        if (buttonIndexes.every(button => currentlyPressed.has(button))) {
            if (!previousGamepadState.has(combo)) { // Ensure combo triggers only once
                keyActions[comboMappings[combo]]?.();
                previousGamepadState.add(combo);
            }
            comboTriggered = true;
        } else {
            previousGamepadState.delete(combo);
        }
    });

    // If no combo was triggered, process single button presses
    if (!comboTriggered) {
        currentlyPressed.forEach(index => {
            if (!previousGamepadState.has(index) && gamepadMapping[index]) {
                keyActions[gamepadMapping[index]]?.();
            }
            previousGamepadState.add(index);
        });
    }

    // Reset released buttons
    previousGamepadState.forEach(index => {
        if (!currentlyPressed.has(index)) {
            previousGamepadState.delete(index);
        }
    });

    requestAnimationFrame(pollGamepad);
}

requestAnimationFrame(pollGamepad);
