// shortcuts.js

const keyActions = {
    "1": () => addTime('addButton'),
    "2": () => addTime('addButton2'),
    "3": zoomOut,
    "4": zoomIn,
    "b": resetToNextValue,
    "r": resetTimer,
    "t": toggleBoutonsRonds,
    "o": reloadPage,
    "w": resetScores,
    "v": resetTextVariables,
    "p": pauseTimer,
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


// Button mappings
const gamepadMapping = {
    2: "1",   // A button → Add Time Player 1
    1: "2",   // B button → Add Time Player 2
    0: "b",   // X button → Reset to Next Value
    3: "r",   // Y button → Reset Timer
    9: "p",   // Start button → Pause
    12: "q",  // Select button → Fullscreen
    13: "z",  // D-Pad Down → Toggle UI
    4: "s",   // D-Pad Left → Player 1 Plus
    6: "x",   // D-Pad Right → Player 1 Minus
    5: "d",   // D-Pad Up → Player 2 Plus
    14: "4",  // Left Shoulder → Zoom Out
    15: "3",  // Right Shoulder → Zoom In
    7: "c"    // Right Stick Button → Reset Scores
};

// Joystick settings
const joystickDeadzone = 0.3;  // Ignore small movements
const joystickThreshold = 0.8; // Movement beyond this is considered a "press"

// Track previous joystick state to avoid repeated triggers
let joystickPressed = {
    left: false,
    right: false,
    up: false,
    down: false,
    r_left: false,
    r_right: false,
    r_up: false,
    r_down: false
};

    // Handle joystick movement (Left Stick)
    const leftStickX = gamepad.axes[0];  // Left Stick Horizontal
    const leftStickY = gamepad.axes[1];  // Left Stick Vertical
    const rightStickX = gamepad.axes[2]; // Right Stick Horizontal
    const rightStickY = gamepad.axes[3]; // Right Stick Vertical

    // LEFT STICK → Main actions
    if (leftStickX < -joystickThreshold && !joystickPressed.left) {
        joystickPressed.left = true;
        toggleVisibility(); // Left action
    } else if (leftStickX > joystickThreshold && !joystickPressed.right) {
        joystickPressed.right = true;
        pauseTimer(); // Right action
    } else if (leftStickY < -joystickThreshold && !joystickPressed.up) {
        joystickPressed.up = true;
        resetTimer(); // Up action
    } else if (leftStickY > joystickThreshold && !joystickPressed.down) {
        joystickPressed.down = true;
        resetToNextValue(); // Down action
    }

    // RIGHT STICK → Zoom controls
    if (rightStickX < -joystickThreshold && !joystickPressed.r_left) {
        joystickPressed.r_left = true;
        zoomOut(); // Right Stick Left
    } else if (rightStickX > joystickThreshold && !joystickPressed.r_right) {
        joystickPressed.r_right = true;
        zoomIn(); // Right Stick Right
    } else if (rightStickY < -joystickThreshold && !joystickPressed.r_up) {
        joystickPressed.r_up = true;
        console.log("Right Stick Up - Custom Action");
    } else if (rightStickY > joystickThreshold && !joystickPressed.r_down) {
        joystickPressed.r_down = true;
        console.log("Right Stick Down - Custom Action");
    }

    // Reset joystick state when returning to the deadzone
    if (Math.abs(leftStickX) < joystickDeadzone) {
        joystickPressed.left = false;
        joystickPressed.right = false;
    }
    if (Math.abs(leftStickY) < joystickDeadzone) {
        joystickPressed.up = false;
        joystickPressed.down = false;
    }
    if (Math.abs(rightStickX) < joystickDeadzone) {
        joystickPressed.r_left = false;
        joystickPressed.r_right = false;
    }
    if (Math.abs(rightStickY) < joystickDeadzone) {
        joystickPressed.r_up = false;
        joystickPressed.r_down = false;
    }
// Gamepad Setup
let gamepadIndex = null;
let gamepadButtonsPressed = new Set();

// Start polling for gamepads immediately on page load
window.addEventListener("load", () => {
    requestAnimationFrame(scanForGamepads);
});

// Detect gamepad connection
window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    requestAnimationFrame(pollGamepad);
});

// Detect gamepad disconnection
window.addEventListener("gamepaddisconnected", () => {
    console.log("Gamepad disconnected");
    gamepadIndex = null;
});

// Function to scan for gamepads (in case browser doesn't trigger "gamepadconnected" event)
function scanForGamepads() {
    const gamepads = navigator.getGamepads();
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            gamepadIndex = i;
            console.log("Gamepad detected:", gamepads[i].id);
            requestAnimationFrame(pollGamepad);
            return;
        }
    }
    requestAnimationFrame(scanForGamepads); // Keep checking until a gamepad is detected
}

// Main gamepad polling function
function pollGamepad() {
    if (gamepadIndex === null) return;
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) return;

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

