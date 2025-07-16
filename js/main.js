import { state, loadStatistics } from 'js/state.js';
import { initializeMidi } from 'js/midi.js';
import { handleMIDIMessage, generateSeries, cycleLage, cycleTone } from 'js/gameLogic.js';
import { setupUIEventListeners, showWelcomeScreen } from 'js/js/ui.js';
import { initializeAnimations } from 'js/animations.js';
import { startTutorialIfNeeded } from 'js/tutorial.js';
import { initializeVirtualKeyboard, toggleVirtualKeyboard } from 'features/virtualKeyboard.js';

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
