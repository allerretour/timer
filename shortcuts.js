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
let gamepadPolling = false;

// Button mappings
const gamepadMapping = {
    2: "1",
    1: "2",
    0: "b",
    3: "r",
    9: "p",
    12: "q",
    13: "z",
    4: "s",
    6: "x",
    5: "d",
    14: "4",
    15: "3",
    7: "c"
};

// Joystick settings
const joystickDeadzone = 0.2;
const joystickThreshold = 0.4;

// Track previous joystick state
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

   // Handle joystick movement
const leftStickX = gamepad.axes[0];
const leftStickY = gamepad.axes[1];
const rightStickX = gamepad.axes[2];
const rightStickY = gamepad.axes[3];

// Left Stick movement
if (leftStickX < -joystickThreshold && !joystickPressed.left) {
    joystickPressed.left = true;
    document.getElementById("p1moins").click();
} else if (leftStickX > joystickThreshold && !joystickPressed.right) {
    joystickPressed.right = true;
    document.getElementById("p1plus").click();
} else if (leftStickY < -joystickThreshold && !joystickPressed.up) {
    joystickPressed.up = true;
    addTime('addButton');
} else if (leftStickY > joystickThreshold && !joystickPressed.down) {
    joystickPressed.down = true;
    resetScores();
}

// Right Stick movement
if (rightStickX < -joystickThreshold && !joystickPressed.r_left) {
    joystickPressed.r_left = true;
    document.getElementById("p2moins").click();
} else if (rightStickX > joystickThreshold && !joystickPressed.r_right) {
    joystickPressed.r_right = true;
    document.getElementById("p2plus").click();
} else if (rightStickY < -joystickThreshold && !joystickPressed.r_up) {
    joystickPressed.r_up = true;
    addTime('addButton2');
} else if (rightStickY > joystickThreshold && !joystickPressed.r_down) {
    joystickPressed.r_down = true;
    resetScores();
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
    requestAnimationFrame(pollGamepad);
}

requestAnimationFrame(pollGamepad);
