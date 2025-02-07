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
    4: "s",
    6: "x",
    5: "d",
    14: "4",
    15: "3",
    7: "c"
};

window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    requestAnimationFrame(pollGamepad);
});

function pollGamepad() {
    if (gamepadIndex === null) return;
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) return;

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
