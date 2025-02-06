    let countdownTime = 60;
    let initialTime = 60;
    let addTimeValue = 30;
    let nextTimeValue = 30;
    let countdownInterval;
    let isPaused = false;

document.getElementById("countdown").addEventListener("click", pauseTimer);

const beepSound = new Audio('beep-01.mp3');
const buzzSound = new Audio('beep-04.mp3');

function checkViewport() {
    if (window.innerWidth < 960) {
      // Save in session that the page was blocked
      sessionStorage.setItem("blocked", "true");

      // Replace the page content
      document.body.innerHTML = `
        <div style="display: flex; height: 100vh; justify-content: center; align-items: center; text-align: center; font-family: Arial, sans-serif; font-size: 1.5rem;">
          <p>Écran trop petit, utiliser une tablette ou un ordinateur.</p>
        </div>
      `;
    } else {
      // If the page was previously blocked, force a reload
      if (sessionStorage.getItem("blocked") === "true") {
        sessionStorage.removeItem("blocked"); // Clear block state
        location.reload(); // Reload when moving to a larger screen
      }
    }
  }

  // Run the check on page load
  checkViewport();

  // Listen for resize events to trigger the check
  window.addEventListener("resize", checkViewport);





	
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
    // Targeting the .boutonsronds and .bottom-buttons elements
    const boutons = document.querySelector('.boutonsronds');
    const bottomButtons = document.querySelector('.bottom-buttons');

    // Get the current display of .boutonsronds and .bottom-buttons
    const currentDisplayBoutons = window.getComputedStyle(boutons).display;
    const currentDisplayBottomButtons = window.getComputedStyle(bottomButtons).display;

    // Toggle display of both elements
    boutons.style.display = (currentDisplayBoutons === 'none') ? 'block' : 'none';
    bottomButtons.style.display = (currentDisplayBottomButtons === 'none') ? 'flex' : 'none';
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
    const isHidden = toggleButton.innerHTML === '<i class="fas fa-eye"></i>';

    if (isHidden) {
        bottomButtons.style.opacity  = "0.3";;  // Show the bottom buttons
        container.classList.remove('hidden');
        logoimg.style.height = "0px";
        nomjoueurs.style.top = "15px";
        nomjoueurs.style.fontSize = "50px";
        secbtnscore.style.top = "55px"; 
        btnscore.forEach(button => {
        button.style.height = "180px"; 
        button.style.fontSize = "120px"; 
        });

        
        toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
 else {
        bottomButtons.style.opacity  = "0";  // Hide the bottom buttons
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