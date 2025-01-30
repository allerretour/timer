    let countdownTime = 60;
    let initialTime = 60;
    let addTimeValue = 30;
    let nextTimeValue = 30;
    let countdownInterval;
    let isPaused = false;


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
beepSound.play()
beepSound.pause()
buzzSound.play()
buzzSound.pause()
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
    

    if (bottomButtons.style.display === "none") {
        bottomButtons.style.display = "flex"; // Show bottom buttons
        
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>'; // Change icon to eye-slash
    } else {
        bottomButtons.style.display = "none"; // Hide bottom buttons
        
        toggleButton.innerHTML = '<i class="fas fa-eye"></i>'; // Change icon to eye
    }
}



const fullscreenButton = document.getElementById('fullscreen-btn');

    // Function to check if the document is in fullscreen
    function isFullscreen() {
      return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    }

    // Function to toggle fullscreen
    function toggleFullscreen() {
      if (isFullscreen()) {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
          document.msExitFullscreen();
        }
      } else {
        // Enter fullscreen
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
          document.documentElement.webkitRequestFullscreen();
          document.documentElement.focus();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
          document.documentElement.msRequestFullscreen();
        }
      }
    }

    
    function updateTextVariable(elementId, value) {
        document.getElementById(elementId).textContent = value;
    }



    document.addEventListener("keydown", function (event) {
        // Check if the key is one of the specified keys
        if (["1", "2", "b", "r", "p", "q", "z"].includes(event.key)) {
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
            }
        }
    });
    
    
    




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



function adjustUI() {
    const container = document.querySelector('.container');
    const countdown = document.querySelector('.countdown');
    const extensionGroup = document.querySelector('.extension-buttons-group');
    const extensionButtons = document.querySelectorAll('.extension-buttons-group button');
    const bottomButtons = document.querySelector('.bottom-buttons');
    const textVariableSection = document.querySelector('.text-variable-section');

    // Check if bottom buttons are visible
    const isVisible = bottomButtons.getBoundingClientRect().height > 0;

    // Adjust container width
    container.style.maxWidth = isVisible ? "800px" : "1000px";

    // Adjust countdown font size
    countdown.style.fontSize = isVisible ? "clamp(100px, 20vw, 220px)" : "clamp(120px, 25vw, 320px)";

    // Keep the extension buttons group centered and sized correctly
    extensionGroup.style.maxWidth = isVisible ? "800px" : "1000px";
    extensionGroup.style.position = "absolute";
    extensionGroup.style.bottom = isVisible ? "170px" : "100px"; 
    extensionGroup.style.left = "50%";
    extensionGroup.style.transform = "translateX(-50%)";

    // Apply the same adjustments to .text-variable-section
    textVariableSection.style.maxWidth = isVisible ? "800px" : "1000px";
    textVariableSection.style.position = "absolute";
    textVariableSection.style.bottom = isVisible ? "320px" : "250px"; // Adjusted for spacing
    textVariableSection.style.left = "50%";
    textVariableSection.style.transform = "translateX(-50%)";
    textVariableSection.style.textAlign = "center"; // Center text if needed
    textVariableSection.style.fontSize = isVisible ? "38px" : "50px"; // Adjust text size

    // Adjust extension buttons size
    extensionButtons.forEach(button => {
        button.style.fontSize = isVisible ? "60px" : "90px"; 
        button.style.padding = isVisible ? "10px 15px" : "10px 15px";
        button.style.width = isVisible ? "30%" : "50%";
        button.style.height = isVisible ? "100px" : "150px";
        button.style.borderRadius = isVisible ? "10px" : "15px";
    });
}






// Observe changes in bottom-buttons visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        adjustUI();
    });
}, { threshold: 0 });

const bottomButtons = document.querySelector('.bottom-buttons');
observer.observe(bottomButtons);

// Run on page load and resize
window.addEventListener('load', adjustUI);
window.addEventListener('resize', adjustUI);



    
window.onload = function() {
    updateCountdown(); // Juste mettre à jour l'affichage
    isPaused = true;
    pauseTimer();
    openSettings()

// Select the first preset button
        const firstPresetButton = document.querySelector('.preset-button');
        
        // Call the function with the corresponding preset values
        if (firstPresetButton) {
            setPreset(60, 30, 30, firstPresetButton);
        }
    

};


