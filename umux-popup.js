(function () {
    function initializeUMUXPopup() {
      // Konfigurationsobjekt
      window.UMUXConfig = window.UMUXConfig || {};
  
      // Standardkonfiguration
      const defaultConfig = {
        surveyUrl: '', // URL zur Limesurvey-Umfrage (muss gesetzt werden)
        popupWidth: 600, // Breite des Pop-Ups in Pixel
        popupHeight: 400, // Höhe des Pop-Ups in Pixel
        triggerText: 'Feedback geben', // Text des Triggers
        triggerId: 'umux-trigger', // ID des Triggers
        popupCloseText: 'Schließen', // Text für den Schließen-Button
        cssUrl: 'umux-popup.css', // URL zur externen CSS-Datei
      };
  
      // Konfiguration mit benutzerdefinierten Werten überschreiben
      const config = { ...defaultConfig, ...window.UMUXConfig };
  
      // Sicherstellen, dass die Umfrage-URL gesetzt ist
      if (!config.surveyUrl) {
        console.error('Bitte die "surveyUrl" im UMUXConfig-Objekt konfigurieren.');
        return;
      }
  
      // Externe CSS-Datei laden und warten, bis sie vollständig geladen ist
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = config.cssUrl;
  
      link.onload = () => {
        createPopup(config);
      };
  
      document.head.appendChild(link);
  
      // Google Fonts für Noto-Schriftart und Material Icons einbinden
      const fonts = document.createElement('link');
      fonts.rel = 'stylesheet';
      fonts.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Material+Icons&display=swap';
      document.head.appendChild(fonts);
    }
  
    // Funktion zum Erstellen des Pop-Ups
    function createPopup(config) {
      // Pop-Up erstellen
      const overlay = document.createElement('div');
      overlay.id = 'umux-popup-overlay';
  
      const popup = document.createElement('div');
      popup.id = 'umux-popup';
      popup.style.setProperty('--popup-width', `${config.popupWidth}px`);
      popup.style.setProperty('--popup-height', `${config.popupHeight}px`);
  
      const closeButton = document.createElement('div');
      closeButton.id = 'umux-popup-close';
      closeButton.textContent = config.popupCloseText;
  
      const iframe = document.createElement('iframe');
      iframe.src = config.surveyUrl;
  
      popup.appendChild(closeButton);
      popup.appendChild(iframe);
      overlay.appendChild(popup);
  
      // Trigger-Button erstellen
      const trigger = document.createElement('div');
      trigger.id = config.triggerId;
      trigger.innerHTML = `
        <span class="icon">feedback</span>
        <span class="text">${config.triggerText}</span>
      `;
  
      document.body.appendChild(trigger);
  
      // Dynamische Breitenberechnung
      const textElement = trigger.querySelector('.text');
      const iconElement = trigger.querySelector('.icon');
      trigger.style.width = '1em'; // Breite für den initialen Zustand (nur Icon sichtbar)
      textElement.style.opacity = '0'; // Text unsichtbar im initialen Zustand
  
      trigger.addEventListener('mouseenter', () => {
        // Temporär anzeigen, um die Breite zu messen
        textElement.style.opacity = '1';
        textElement.style.display = 'inline';
        const textWidth = textElement.offsetWidth; // Textbreite dynamisch berechnen
        const iconWidth = iconElement.offsetWidth; // Iconbreite
        trigger.style.width = `${iconWidth + textWidth + 2 * 10}px`; // Breite: Icon + Text + Padding
      });
  
      trigger.addEventListener('mouseleave', () => {
        textElement.style.opacity = '0';
        trigger.style.width = '1em'; // Zurück zur Icon-Breite
      });
  
      document.body.appendChild(overlay);
  
      // Event-Listener für das Öffnen des Pop-Ups
      trigger.addEventListener('click', () => {
        overlay.style.display = 'flex';
      });
  
      // Event-Listener für das Schließen des Pop-Ups (bei Klick außerhalb des Pop-Ups)
      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          overlay.style.display = 'none';
        }
      });
  
      // Event-Listener für das Schließen des Pop-Ups (über den Schließen-Button)
      closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeUMUXPopup);
    } else {
      initializeUMUXPopup();
    }
  })();
  
