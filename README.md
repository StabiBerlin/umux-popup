# UMUX Popup

Integrate a simple popup for usability evaluation into a Wordpress site. The actual survey needs to be handled externally, e.g. using https://www.limesurvey.org/. We use UMUX at Stabi Berlin, but you can use any metric you like.

Use the popup by adding the following code in the functions.php:

```js
function umux(){
    ?>
<script>
  <!-- UMUX Popup -->
  (function () {
    // Configuration for the UMUX-Feedback-Popup
    window.UMUXConfig = {
      surveyUrl:
        "https://{$LIMESURVEY_URL}/index.php/{$LIMESURVEY_ID}",
      popupWidth: 800,
      popupHeight: 600,
      triggerText: "Feedback",
      popupCloseText: "Close",
      cssUrl: "https://cdn.jsdelivr.net/gh/StabiBerlin/umux-popup@wordpress/umux-popup.css",
    };

    // Dynamisch die JavaScript-Datei laden
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/StabiBerlin/umux-popup@wordpress/umux-popup.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = function () {
      console.log("UMUX Popup Script ready.");
    };

    script.onerror = function () {
      console.error("Error loading the UMUX Popup Scripts.");
    };

    document.head.appendChild(script);
  })();
  <!-- End UMUX Popup -->
</script>
    <?php
}
add_action('wp_body_open', 'umux');
```
