    let countdownTime = 60;
    let initialTime = 60;
    let addTimeValue = 30;
    let nextTimeValue = 30;
    let countdownInterval;
    let isPaused = false;

document.getElementById("countdown").addEventListener("click", pauseTimer);


const beepSound = new Audio('beep-01.mp3');
const buzzSound = new Audio('beep-04.mp3');

	
    function startTimer() {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    function setPreset(initial, next, add, button) {
    document.getElementById('initialTime').value = initial;
    document.getElementById('nextTimeValue').value = next;
    document.getElementById('addTimeValue').value = add;

    
    // Remove highlight from all buttons
    document.querySelectorAll('.preset-button').forEach(btn => {
        btn.classList.remove('active-preset');
    });

    // Add highlight to the clicked button
    button.classList.add('active-preset');

initialTime = parseInt(document.getElementById('initialTime').value);
        addTimeValue = parseInt(document.getElementById('addTimeValue').value);
        nextTimeValue = parseInt(document.getElementById('nextTimeValue').value);
        resetTimer();


    
}

let scale = 1;

    function zoomIn() {
        scale = Math.min(scale + 0.1, 2); // Max zoom level 2x
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = "center top";
    }

    function zoomOut() {
        scale = Math.max(scale - 0.1, 0.5); // Min zoom level 0.5x
        document.body.style.transform = `scale(${scale})`;
        document.body.style.transformOrigin = "center top";
    }


    function toggleBoutonsRonds() {
        const boutons = document.querySelector('.boutonsronds');
        const currentDisplay = window.getComputedStyle(boutons).display;
        
        boutons.style.display = (currentDisplay === 'none') ? 'block' : 'none';
    }




    function addTime(buttonId) {
    if (buttonId === 'addButton' && !document.getElementById('addButton').disabled) {
        countdownTime += addTimeValue +1;
        document.getElementById('addButton').disabled = true;

        // Arrêter le timer avant de mettre à jour
        clearInterval(countdownInterval);
        updateCountdown();
        
        // Relancer le timer si ce n'est pas en pause
        if (!isPaused) {
            startTimer();
        }
    } else if (buttonId === 'addButton2' && !document.getElementById('addButton2').disabled) {
        countdownTime += addTimeValue +1;
        document.getElementById('addButton2').disabled = true;

        // Arrêter le timer avant de mettre à jour
        clearInterval(countdownInterval);
        updateCountdown();
        
        // Relancer le timer si ce n'est pas en pause
        if (!isPaused) {
            startTimer();
        }
    }
}

    function resetToNextValue() {
    countdownTime = nextTimeValue;
    updateCountdown();
    isPaused = false;
    pauseTimer();
    if (!isPaused) {  // Si le timer n'est pas en pause, démarrer le timer
        startTimer();
    }
}


    
function resetTimer() {
    countdownTime = initialTime;  // Réinitialiser le timer à la valeur initiale
    updateCountdown();            // Mettre à jour l'affichage du timer
    isPaused = false;
    pauseTimer()
    document.getElementById('addButton').disabled = false;  // Réactiver le bouton "X Joueur 1"
    document.getElementById('addButton2').disabled = false; // Réactiver le bouton "X Joueur 2"
}

function pauseTimer() {
    isPaused = !isPaused;
    let pauseButton = document.getElementById('pauseButton');
    if (isPaused) {
        clearInterval(countdownInterval);  // Arrêter le timer
        pauseButton.innerHTML = '<i class="fas fa-play"></i>';  // Changer le texte en "Reprendre"
        
        countdown.classList.add('highlight');
        pauseButton.classList.add('highlight');  // Ajouter l'effet de clignotement lorsque le bouton est en mode "Reprendre"
    } else {
        startTimer();  // Démarrer le timer
        pauseButton.innerHTML = '<i class="fas fa-pause"></i>';  // Changer le texte en "Pause"
        
        countdown.classList.remove('highlight');
        pauseButton.classList.remove('highlight');  // Retirer l'effet de clignotement lorsque le bouton est en mode "Pause"

    }
}

function updateCountdown() {
    // Si le temps est écoulé
    if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').textContent = "FIN !"; // Affiche "FAUTE"
        document.getElementById('countdown').style.color = 'red'; // Change la couleur en rouge
        document.getElementById('progress').style.backgroundColor = 'red'; // Change la couleur de la barre de progression en rouge
        buzzSound.play(); // Son de fin
        
        return;
    }

    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime % 60;
    document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${(countdownTime / initialTime) * 100}%`;

    if (countdownTime >= 6 && countdownTime <= 10) {
        document.getElementById('countdown').style.color = 'yellow';
        progressBar.style.backgroundColor = 'yellow';
    } else if (countdownTime <= 5 && countdownTime > 0) {
        document.getElementById('countdown').style.color = 'red';
        progressBar.style.backgroundColor = 'red';
    } else {
        document.getElementById('countdown').style.color = 'black';
        progressBar.style.backgroundColor = '#4caf50';
    }

    if (countdownTime === 10 || countdownTime === 5) {
        beepSound.play();
    }

    countdownTime--;
}




    function openSettings() {
        const modal = document.getElementById('settingsModal');
        const modalContent = document.querySelector('.modal-content');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            modalContent.classList.add('show');
        }, 10);
        
    }

    function closeSettings(event) {
        const modal = document.getElementById('settingsModal');
        const modalContent = document.querySelector('.modal-content');
        modal.classList.remove('show');
        modalContent.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);

beepSound.play();
beepSound.pause();
buzzSound.play();
buzzSound.pause();


    }

    function saveSettings() {
        initialTime = parseInt(document.getElementById('initialTime').value);
        addTimeValue = parseInt(document.getElementById('addTimeValue').value);
        nextTimeValue = parseInt(document.getElementById('nextTimeValue').value);
        resetTimer();
        closeSettings();
    }

function openInstructions() {
    const modal = document.getElementById('instructionsModal');
    const modalContent = document.querySelector('#instructionsModal .modal-content');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
        modalContent.classList.add('show');
    }, 10);
}

function closeInstructions(event) {
    const modal = document.getElementById('instructionsModal');
    const modalContent = document.querySelector('#instructionsModal .modal-content');
    modal.classList.remove('show');
    modalContent.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function toggleVisibility() {
    const bottomButtons = document.querySelector('.bottom-buttons');
    const toggleButton = document.getElementById('toggleButtons');
    const container = document.querySelector('.container');
    const boutonsRonds = document.querySelectorAll('#fullscreen-btn, #settings-button, #info-button');
    const secbtnscore = document.querySelector('.extension-buttons-group');
    const btnscore = document.querySelectorAll('#p1scr, #p2scr');
    const logoimg = document.querySelector('#middle-image');
    const nomjoueurs = document.querySelector('.text-variable-section');
    

    // Check if the buttons are currently hidden
    const isHidden = bottomButtons.style.display === "none" || getComputedStyle(bottomButtons).display === "none";

    if (isHidden) {
        bottomButtons.style.display = "flex";  // Show the bottom buttons
        container.classList.remove('hidden');
        logoimg.style.height = "0px";
        nomjoueurs.style.top = "15px";
        nomjoueurs.style.fontSize = "50px";
        secbtnscore.style.top = "55px"; 
        btnscore.forEach(button => {
        button.style.height = "200px"; 
        button.style.fontSize = "140px"; 
        });

        
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
 else {
        bottomButtons.style.display = "none";  // Hide the bottom buttons
        container.classList.add('hidden');
        logoimg.style.height = "100px";
        nomjoueurs.style.top = "30px";
        nomjoueurs.style.fontSize = "80px";
        secbtnscore.style.top = "120px";
        btnscore.forEach(button => {
        button.style.height = "500px"; 
        button.style.fontSize = "320px"; 
        });  

        
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

const fullscreenButton = document.getElementById('fullscreen-btn');

    // Function to check if the document is in fullscreen
    function isFullscreen() {
      return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }

    // Function to toggle fullscreen
    function toggleFullscreen() {
        const elem = document.documentElement;
        
        if (isFullscreen()) {

            document.exitFullscreen?.() ||
            document.mozCancelFullScreen?.() ||
            document.webkitExitFullscreen?.() ||
            document.msExitFullscreen?.();
        } else {

            elem.requestFullscreen?.() ||
            elem.mozRequestFullScreen?.() ||
            elem.webkitRequestFullscreen?.() ||
            elem.msRequestFullscreen?.();
            
            elem.focus(); // Ensure focus is maintained
        }
    }
    
    function updateTextVariable(elementId, value) {
        document.getElementById(elementId).textContent = value;
    }



    document.addEventListener("keydown", function (event) {
        // Check if the key is one of the specified keys
        if (["1", "2","3","4","s", "x", "c", "d", "b", "r", "p", "q", "z"].includes(event.key)) {
            // Prevent default action if inside an input or textarea
            if (document.activeElement.matches('input, textarea')) {
                return;  // Allow input in fields
            }
    
            // Prevent default browser behavior for these keys
            event.preventDefault();
    
            // Perform actions based on keypress
            switch (event.key) {
                case "1":
                    addTime('addButton');
                    break;
                case "2":
                    addTime('addButton2');
                    break;
                case "3":
                    zoomOut();
                    break;
                case "4":
                    zoomIn();
                    break;
                case "b":
                    resetToNextValue();
                    break;
                case "r":
                    resetTimer();
                    break;
                case "p":
                    pauseTimer();
                    break;
                case "q":
                    toggleFullscreen();
                    break;
                case "z":
                    toggleVisibility();
                    break;
                case "s":
                    document.getElementById("p1plus").click();
                    break;
                case "x":
                    document.getElementById("p1moins").click();
                    break;
                case "d":
                    document.getElementById("p2plus").click();
                    break;
                case "c":
                    document.getElementById("p2moins").click();
                    break;
            }
        }
    });
    
    let gamepadIndex = null;
let gamepadButtonsPressed = new Set(); // Track pressed buttons to prevent spamming

// Detect gamepad connection
window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    console.log("Gamepad connected:", event.gamepad.id);
    pollGamepad();
});

// Poll gamepad inputs continuously
function pollGamepad() {
    if (gamepadIndex === null) return;
    
    const gamepad = navigator.getGamepads()[gamepadIndex];
    if (!gamepad) return;

    // Mapping gamepad buttons to key actions
    const buttonMapping = {
        2: "1",   // A button → "1" (Add Time Player 1)
        1: "2",   // B button → "2" (Add Time Player 2)
        0: "b",   // X button → "b" (Reset to Next Value)
        3: "r",   // Y button → "r" (Reset Timer)
        9: "p",   // Start button → "p" (Pause)
        12: "q",   // Select button → "q" (Fullscreen)
        13: "z",   // D-Pad Down → "z" (Toggle UI)
        4: "s",
        6: "x",
        5: "d",
        14: "4",
        15: "3",
        7: "c"

    };

    // Loop through all buttons to detect presses
    gamepad.buttons.forEach((button, index) => {
        if (button.pressed && !gamepadButtonsPressed.has(index)) {
            gamepadButtonsPressed.add(index); // Prevent repeated triggers
            handleGamepadInput(buttonMapping[index]);
        } else if (!button.pressed) {
            gamepadButtonsPressed.delete(index); // Allow button press again
        }
    });

    requestAnimationFrame(pollGamepad); // Keep checking for input
}

// Execute the same functions as keydown events
function handleGamepadInput(key) {
    if (!key) return;

    switch (key) {
        case "1":
            addTime('addButton');
            break;
        case "2":
            addTime('addButton2');
            break;
        case "3":
            zoomOut();
            break;
        case "4":
            zoomIn();
            break;
        case "b":
            resetToNextValue();
            break;
        case "r":
            resetTimer();
            break;
        case "p":
            pauseTimer();
            break;
        case "q":
            toggleFullscreen();
            break;
        case "z":
            toggleVisibility();
            break;
        case "s":
            document.getElementById("p1plus").click();
            break;
        case "x":
            document.getElementById("p1moins").click();
            break;
        case "d":
            document.getElementById("p2plus").click();
            break;
        case "c":
            document.getElementById("p2moins").click();
            break;
        
    }
    
}



document.addEventListener("DOMContentLoaded", function () {
    let p1Score = 0; // Initial score for Player 1
    let p2Score = 0; // Initial score for Player 2

    const p1scr = document.getElementById("p1scr");
    const p1plus = document.getElementById("p1plus");
    const p1moins = document.getElementById("p1moins");

    const p2scr = document.getElementById("p2scr");
    const p2plus = document.getElementById("p2plus");
    const p2moins = document.getElementById("p2moins");

    // Initialize score display
    p1scr.innerHTML = p1Score;
    p2scr.innerHTML = p2Score;

    // Player 1 controls
    p1plus.addEventListener("click", function () {
        p1Score++;
        p1scr.innerHTML = p1Score;
    });

    p1moins.addEventListener("click", function () {
        if (p1Score > 0) {
            p1Score--;
        }
        p1scr.innerHTML = p1Score;
    });

    // Player 2 controls
    p2plus.addEventListener("click", function () {
        p2Score++;
        p2scr.innerHTML = p2Score;
    });

    p2moins.addEventListener("click", function () {
        if (p2Score > 0) {
            p2Score--;
        }
        p2scr.innerHTML = p2Score;
    });
});

    
window.onload = function() {


    updateCountdown(); // Juste mettre à jour l'affichage
    isPaused = true;
    pauseTimer();
    requestAnimationFrame(pollGamepad); // Start listening for gamepad input
    openSettings()

// Select the first preset button
        const firstPresetButton = document.querySelector('.preset-button');
        
        // Call the function with the corresponding preset values
        if (firstPresetButton) {
            setPreset(60, 30, 30, firstPresetButton);
        }
  toggleVisibility();  
  

};