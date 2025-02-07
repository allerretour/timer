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
let gamepadIndex = null;
let gamepadButtonsPressed = new Set();

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
const joystickDeadzone = 0.3;
const joystickThreshold = 0.8;

// Track previous joystick state to prevent multiple triggers
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

// Polling function
function pollGamepad() {
    if (gamepadIndex === null) return;
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) return;

    // Handle button presses (preventing multiple triggers)
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

    // Handle joystick movement
    const leftStickX = gamepad.axes[0];
    const leftStickY = gamepad.axes[1];
    const rightStickX = gamepad.axes[2];
    const rightStickY = gamepad.axes[3];

    // LEFT STICK → Main actions (Trigger only once)
    if (leftStickX < -joystickThreshold && !joystickPressed.left) {
        joystickPressed.left = true;
        toggleVisibility();
        setTimeout(() => (joystickPressed.left = false), 200); // Prevent spam
    } else if (leftStickX > joystickThreshold && !joystickPressed.right) {
        joystickPressed.right = true;
        pauseTimer();
        setTimeout(() => (joystickPressed.right = false), 200);
    } else if (leftStickY < -joystickThreshold && !joystickPressed.up) {
        joystickPressed.up = true;
        resetTimer();
        setTimeout(() => (joystickPressed.up = false), 200);
    } else if (leftStickY > joystickThreshold && !joystickPressed.down) {
        joystickPressed.down = true;
        resetToNextValue();
        setTimeout(() => (joystickPressed.down = false), 200);
    }

    // RIGHT STICK → Zoom controls (Trigger only once)
    if (rightStickX < -joystickThreshold && !joystickPressed.r_left) {
        joystickPressed.r_left = true;
        zoomOut();
        setTimeout(() => (joystickPressed.r_left = false), 200);
    } else if (rightStickX > joystickThreshold && !joystickPressed.r_right) {
        joystickPressed.r_right = true;
        zoomIn();
        setTimeout(() => (joystickPressed.r_right = false), 200);
    } else if (rightStickY < -joystickThreshold && !joystickPressed.r_up) {
        joystickPressed.r_up = true;
        console.log("Right Stick Up - Custom Action");
        setTimeout(() => (joystickPressed.r_up = false), 200);
    } else if (rightStickY > joystickThreshold && !joystickPressed.r_down) {
        joystickPressed.r_down = true;
        console.log("Right Stick Down - Custom Action");
        setTimeout(() => (joystickPressed.r_down = false), 200);
    }

    requestAnimationFrame(pollGamepad);
}
