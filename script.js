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
    if (!isPaused) {  // Si le timer n'est pas en pause, démarrer le timer
        startTimer();
    }
}


    
function resetTimer() {
    countdownTime = initialTime;  // Réinitialiser le timer à la valeur initiale
    updateCountdown();            // Mettre à jour l'affichage du timer
    clearInterval(countdownInterval);  // Stopper le timer
    isPaused = true;              // Mettre le timer en pause
    document.getElementById('pauseButton').innerHTML = '<i class="fas fa-play"></i>'; // Mettre le texte en "Reprendre"
    document.getElementById('pauseButton').classList.add('highlight'); // Ajouter l'effet de clignotement
    document.getElementById('addButton').disabled = false;  // Réactiver le bouton "X Joueur 1"
    document.getElementById('addButton2').disabled = false; // Réactiver le bouton "X Joueur 2"
}

function pauseTimer() {
    isPaused = !isPaused;
    let pauseButton = document.getElementById('pauseButton');
    if (isPaused) {
        clearInterval(countdownInterval);  // Arrêter le timer
        pauseButton.innerHTML = '<i class="fas fa-play"></i>';  // Changer le texte en "Reprendre"
        pauseButton.classList.add('highlight');  // Ajouter l'effet de clignotement lorsque le bouton est en mode "Reprendre"
    } else {
        startTimer();  // Démarrer le timer
        pauseButton.innerHTML = '<i class="fas fa-pause"></i>';  // Changer le texte en "Pause"
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


    
window.onload = function() {
    updateCountdown(); // Juste mettre à jour l'affichage
    isPaused = true; // Le timer reste en pause
    let pauseButton = document.getElementById('pauseButton');
    pauseButton.innerHTML = '<i class="fas fa-play"></i>';
    pauseButton.classList.add('highlight'); // Appliquer la couleur orange et l'animation de clignotement


// Select the first preset button
        const firstPresetButton = document.querySelector('.preset-button');
        
        // Call the function with the corresponding preset values
        if (firstPresetButton) {
            setPreset(60, 30, 30, firstPresetButton);
        }
    

};


