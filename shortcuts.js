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

// Add joystick mappings
const joystickSensitivity = 0.5;  // Adjust the threshold for joystick sensitivity
const joystickDeadzone = 0.2;     // Minimum threshold before detecting movement

window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    requestAnimationFrame(pollGamepad);
});

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

    // Handle joystick movement
    const leftStickX = gamepad.axes[0];  // Left Stick Horizontal
    const leftStickY = gamepad.axes[1];  // Left Stick Vertical
    const rightStickX = gamepad.axes[2]; // Right Stick Horizontal
    const rightStickY = gamepad.axes[3]; // Right Stick Vertical

    // Left Stick Mapping Example (Move player, scroll, etc.)
    if (Math.abs(leftStickX) > joystickDeadzone) {
        if (leftStickX > joystickSensitivity) {
            console.log("Move Right");
            // Add action for right movement, for example:
            // keyActions['rightMovement']();
        } else if (leftStickX < -joystickSensitivity) {
            console.log("Move Left");
            // Add action for left movement, for example:
            // keyActions['leftMovement']();
        }
    }

    if (Math.abs(leftStickY) > joystickDeadzone) {
        if (leftStickY > joystickSensitivity) {
            console.log("Move Down");
            // Add action for down movement
        } else if (leftStickY < -joystickSensitivity) {
            console.log("Move Up");
            // Add action for up movement
        }
    }

    // Right Stick Mapping Example (Camera movement, zoom, etc.)
    if (Math.abs(rightStickX) > joystickDeadzone) {
        if (rightStickX > joystickSensitivity) {
            console.log("Zoom In");
            // Trigger zoom in or similar
            keyActions["zoomIn"]();
        } else if (rightStickX < -joystickSensitivity) {
            console.log("Zoom Out");
            // Trigger zoom out or similar
            keyActions["zoomOut"]();
        }
    }

    if (Math.abs(rightStickY) > joystickDeadzone) {
        if (rightStickY > joystickSensitivity) {
            console.log("Adjust Down");
            // Handle downward adjustment action
        } else if (rightStickY < -joystickSensitivity) {
            console.log("Adjust Up");
            // Handle upward adjustment action
        }
    }

    requestAnimationFrame(pollGamepad);
}
