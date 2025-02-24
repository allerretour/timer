const longPressThreshold = 1000; // Milliseconds threshold for long press
let keyTimers = {}; // To store the timers for key presses
let gamepadTimers = {}; // To store the timers for gamepad button presses
let keyPressed = {}; // Track if a key is being held down
let gamepadPressed = {}; // Track if a gamepad button is being held down

const keyActions = {
    "z": () => addTime('addButton'),
    "m": () => addTime('addButton2'),
    "t": zoomIn,
    "y": zoomOut,
    "r": openSettings,
    "d": toggleBoutonsRonds,
    "i": () => openImage('logops4.png'),
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

    "0": () => openImage('logops4.jpg'),
    "1": () => document.getElementById("p1plus").click(),   // Increment player 1 score
    "2": resetScores,                                       // Resets the scores
    "3": () => document.getElementById("p2plus").click(),   // Increment player 2 score
    "4": () => addTime('addButton'),                        // Adds time via 'addButton'
    "5": toggleVisibility,                                  // Toggles visibility
    "6": () => addTime('addButton2'),                       // Adds time via 'addButton2'
    "7": resetToNextValue,                                  // Resets to next value
    "8": pauseTimer,                                        // Pauses the timer
    "9": resetTimer                                         // Resets the timer
};

// Long press action definitions
const longPressActions = {
    "a": resetScores,
    "c": resetTimer,
    "0": openSettings,
    "2" : reloadPage,
    "5": zoomOut,
    "7": toggleBoutonsRonds,
    "8": zoomIn,
    "9": hideSplashScreen,
    "r": () => console.log("Long press: Open settings with delay!"), 
    // You can add other long press actions for different keys here
};

// Keydown Event Listener (keyboard)
document.addEventListener("keydown", (event) => {
    if (keyActions[event.key] && !document.activeElement.matches('input, textarea') && !keyPressed[event.key]) {
        event.preventDefault();

        // Mark the key as pressed
        keyPressed[event.key] = true;

        // Start the timer if the key is pressed for the first time
        if (!keyTimers[event.key]) {
            keyTimers[event.key] = setTimeout(() => {
                // Trigger long press action if key held for long enough
                if (longPressActions[event.key]) {
                    longPressActions[event.key]();
                }
            }, longPressThreshold);
        }
        
        // Perform regular action
        keyActions[event.key]();
    }
});

// Keyup Event Listener (keyboard)
document.addEventListener("keyup", (event) => {
    if (keyPressed[event.key]) {
        clearTimeout(keyTimers[event.key]); // Clear the long press timer
        delete keyTimers[event.key]; // Remove it from the timer object
        keyPressed[event.key] = false; // Mark the key as released
    }
});

// Gamepad Setup
let gamepadIndex = null;
let previousGamepadState = new Set();
let gamepadPolling = false;

// Button mappings (individual buttons)
const gamepadMapping = {
    0: "v",        // Button 0 (usually 'A' on Xbox/standard gamepad)
    1: "b",  // Button 1 (usually 'B' on Xbox/standard gamepad)
    2: "c",      // Button 2 (usually 'X' on Xbox/standard gamepad)
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
    13: "f",        // Button 13 (D-Pad Down)
    14: "t",       // Button 14 (D-Pad Left)
    15: "y",       // Button 15 (D-Pad Right)
    16: "d"        // Button 16 (custom or additional button)
};

// Define long press actions for gamepad buttons
const longPressGamepadActions = {
    4 : resetScores,
    13: toggleFullscreen,
    10: hideSplashScreen
    // You can add other long press actions for gamepad buttons here
};

// Polling function for gamepad (detects button presses and long presses)
function pollGamepad() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    const gamepad = gamepads[gamepadIndex];
    if (!gamepad) {
        requestAnimationFrame(pollGamepad);
        return;
    }

    let currentlyPressed = new Set();

    // Store all currently pressed buttons
    gamepad.buttons.forEach((button, index) => {
        if (button.pressed && !gamepadPressed[index]) {
            currentlyPressed.add(index);

            // Mark the button as pressed
            gamepadPressed[index] = true;

            // Start long press detection for each button
            if (!gamepadTimers[index]) {
                gamepadTimers[index] = setTimeout(() => {
                    // Trigger long press action if button held for long enough
                    if (longPressGamepadActions[index]) {
                        longPressGamepadActions[index]();
                    }
                }, longPressThreshold);
            }

            // Perform the regular action for the button
            if (gamepadMapping[index]) {
                keyActions[gamepadMapping[index]]?.();
            }
        } else if (!button.pressed && gamepadPressed[index]) {
            // Clear the long press timer if the button is released
            if (gamepadTimers[index]) {
                clearTimeout(gamepadTimers[index]);
                delete gamepadTimers[index];
            }

            // Mark the button as released
            gamepadPressed[index] = false;
        }
    });

    

    

    // Clear released buttons
    previousGamepadState.forEach(index => {
        if (!currentlyPressed.has(index)) {
            previousGamepadState.delete(index);
        }
    });

    requestAnimationFrame(pollGamepad);
}

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

requestAnimationFrame(pollGamepad);
