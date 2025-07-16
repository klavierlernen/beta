import { state, loadStatistics } from 'https://klavierlernen.github.io/beta.github.io/js/state.js';
import { initializeMidi } from 'https://klavierlernen.github.io/beta.github.io/js/midi.js';
import { handleMIDIMessage, generateSeries, cycleLage, cycleTone } from 'https://klavierlernen.github.io/beta.github.io/js/gameLogic.js';
import { setupUIEventListeners, showWelcomeScreen } from 'https://klavierlernen.github.io/beta.github.io/js/js/ui.js';
import { initializeAnimations } from 'https://klavierlernen.github.io/beta.github.io/js/animations.js';
import { startTutorialIfNeeded } from 'https://klavierlernen.github.io/beta.github.io/js/tutorial.js';
import { initializeVirtualKeyboard, toggleVirtualKeyboard } from 'https://klavierlernen.github.io/beta.github.io/features/virtualKeyboard.js';

// App initialisieren, wenn das DOM geladen ist
document.addEventListener("DOMContentLoaded", () => {
    // 1. Zustand laden
    loadStatistics();

    // 2. UI-Events einrichten
    setupUIEventListeners({ onCycleLage: cycleLage, onCycleTone: cycleTone });
    
    // 3. MIDI initialisieren und mit der Spiellogik verbinden
    initializeMidi(handleMIDIMessage);
    
    // 4. Willkommensbildschirm oder Hauptansicht anzeigen
    showWelcomeScreen(() => {
        // Dieser Callback wird ausgeführt, nachdem der Willkommensbildschirm beendet ist
        generateSeries(); // Erste Serie generieren
    });

    // Event Listener für Tastatureingaben (zum Testen)
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space" && !state.sessionPaused) {
            // Simuliert das Spielen von C4
            handleMIDIMessage({ note: 'c', octave: 4 });
        }
    });
});
