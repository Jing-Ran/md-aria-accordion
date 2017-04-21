(function() {
  var accordion = document.querySelector('.accordion');
  
  function deactivate(heading, panel) {
    // deactivate heading
    heading.setAttribute('aria-selected', false);
    heading.setAttribute('aria-expanded', false);

    // deactivate panel
    panel.setAttribute('aria-hidden', true);
  }

  function activate(heading, panel) {
    // activate heading
    heading.setAttribute('aria-selected', true);
    heading.setAttribute('aria-expanded', true);

    // activate panel
    panel.setAttribute('aria-hidden', false);
  }

  function changeActiveStatus(e) {
    e.preventDefault();
    var targetHeading;
    var targetHeadingSelected;
    var targetPanel;

    if (e.target.classList.contains('accordion-heading')) {
      targetHeading = e.target;
      targetHeadingSelected = targetHeading.getAttribute('aria-selected');
      targetPanel = accordion.querySelector('#' + targetHeading.getAttribute('aria-controls'));

      targetHeadingSelected === 'true' ? deactivate(targetHeading, targetPanel) : activate(targetHeading, targetPanel);
    }
  }

  // Key events start here
  function handleKeyEvents(e) {
    var keyPressed = e.keyCode;
    var headings = [].slice.call(accordion.querySelectorAll('.accordion-heading'));
    var targetHeadingIndex = headings.indexOf(e.target);
    var targetHeading = e.target;
    var targetHeadingSelected;
    var targetPanel;

    if (e.target.classList.contains('accordion-heading')) { //if heading is the target
      if (keyPressed === 40) { // DOWN ARROW is pressed
        if (targetHeadingIndex !== headings.length - 1 &&
            targetHeadingIndex !== -1) {
          // if current target heading is not the last one
          targetHeading = headings[targetHeadingIndex + 1];
        } else {
          targetHeading = headings[0];
        }
      } else if (keyPressed === 38) { // if UP ARROW is pressed
        if (targetHeadingIndex > 0) {
          // if current target heading is not the first one
          targetHeading = headings[targetHeadingIndex - 1];
        } else {
          targetHeading = headings[headings.length - 1];
        }
      } else if (keyPressed === 34) { // if PAGE DOWN is pressed
        targetHeading = headings[headings.length - 1];
      } else if (keyPressed === 33) { // if PAGE UP is pressed
        targetHeading = headings[0];
      }

      targetHeadingSelected = targetHeading.getAttribute('aria-selected');
      targetPanel = accordion.querySelector('#' + targetHeading.getAttribute('aria-controls'));
      targetHeading.focus();

      // When ENTER (13) or SPACE (32) key is pressed: toggle targetPanel
      if (keyPressed === 13 || keyPressed === 32) {
        targetHeadingSelected === 'true' ? deactivate(targetHeading, targetPanel) : activate(targetHeading, targetPanel);
      }
    }
  }

  accordion.addEventListener('click', changeActiveStatus);

  accordion.addEventListener('keyup', handleKeyEvents);

}());