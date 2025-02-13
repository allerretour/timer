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
    "2": hideSplashScreen,
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
let previousGamepadState = new Set();
let gamepadPolling = false;

// Button mappings (individual buttons)
const gamepadMapping = {
    0: " ",     
    1: "Control",  
    2: "Alt",   
    3: "m",     
    4: "a",     
    5: "k",     
    6: "q",     
    7: "o",     
    8: "i",     
    9: "r",     
    10: "9",    
    11: "1",    
    12: "z",    
    13: "Shift", 
    14: "t",    
    15: "y",    
    16: "d"     
};

// Define multiple button combinations and their corresponding actions
const comboMappings = {
    "6+7": "2",     // Buttons 4 and 5 together trigger key "2"
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
