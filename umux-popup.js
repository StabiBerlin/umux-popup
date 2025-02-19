(function () {
  function initializeUMUXPopup() {
    // Konfigurationsobjekt
    window.UMUXConfig = window.UMUXConfig || {};

    // Standardkonfiguration
    const defaultConfig = {
      surveyUrl: "", // URL zur Limesurvey-Umfrage (muss gesetzt werden)
      popupWidth: 600, // Breite des Pop-Ups in Pixel
      popupHeight: 400, // Höhe des Pop-Ups in Pixel
      triggerText: "Feedback geben", // Text des Triggers
      triggerId: "umux-trigger", // ID des Triggers
      popupCloseText: "Schließen", // Text für den Schließen-Button
      cssUrl: "https://cdn.jsdelivr.net/gh/StabiBerlin/umux-popup@wordpress/umux-popup.css", // URL zur externen CSS-Datei
    };

    // Konfiguration mit benutzerdefinierten Werten überschreiben
    const config = { ...defaultConfig, ...window.UMUXConfig };

    // Sicherstellen, dass die Umfrage-URL gesetzt ist
    if (!config.surveyUrl) {
      console.error('Bitte die "surveyUrl" im UMUXConfig-Objekt konfigurieren.');
      return;
    }

    // Externe CSS-Datei laden und warten, bis sie vollständig geladen ist
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = config.cssUrl;

    link.onload = () => {
      createPopup(config);
    };

    document.head.appendChild(link);

  // Funktion zum Erstellen des Pop-Ups
  function createPopup(config) {
    // Pop-Up erstellen
    const overlay = document.createElement("div");
    overlay.id = "umux-popup-overlay";

    const popup = document.createElement("div");
    popup.id = "umux-popup";
    popup.style.setProperty("--popup-width", `${config.popupWidth}px`);
    popup.style.setProperty("--popup-height", `${config.popupHeight}px`);

    const closeButton = document.createElement("div");
    closeButton.id = "umux-popup-close";
    closeButton.textContent = config.popupCloseText;

    const iframe = document.createElement("iframe");
    iframe.src = config.surveyUrl;

    popup.appendChild(closeButton);
    popup.appendChild(iframe);
    overlay.appendChild(popup);

    // Trigger-Button erstellen
    const trigger = document.createElement("div");
    trigger.id = config.triggerId;
    trigger.innerHTML = `<span class="text">${config.triggerText}</span>`;

    document.body.appendChild(trigger);
	document.body.appendChild(overlay);

    // Trigger Styling
    trigger.style.width = "auto"; 
	trigger.style.height = "3em";
	trigger.style.padding = "0 1em;"
	trigger.style.cursor = "pointer";
	
	// Mouseover
    trigger.addEventListener("mouseenter", () => {
      trigger.style.background = "#1e2743"; 
    });

    trigger.addEventListener("mouseleave", () => {
      trigger.style.background = "#2f3e6a";
    });

    // Event-Listener für das Öffnen des Pop-Ups
    trigger.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    // Event-Listener für das Schließen des Pop-Ups (bei Klick außerhalb des Pop-Ups)
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.style.display = "none";
      }
    });

    // Event-Listener für das Schließen des Pop-Ups (über den Schließen-Button)
    closeButton.addEventListener("click", () => {
      overlay.style.display = "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeUMUXPopup);
  } else {
    initializeUMUXPopup();
  }
})();
