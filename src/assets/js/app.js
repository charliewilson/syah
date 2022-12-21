export function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "Header").onpointerdown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onpointermove = elementDrag;
    document.getElementById(elmnt.id + "Header").classList.add('grabbing');
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    //Don't go past the top or bottom
    if (((elmnt.offsetTop - pos2) > 0) && (((elmnt.offsetTop - pos2) + elmnt.offsetHeight) < window.innerHeight)) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    } else if ((elmnt.offsetTop - pos2) <= 0) {
        elmnt.style.top = 0;
    } else if (((elmnt.offsetTop - pos2) + elmnt.offsetHeight) > window.innerHeight) {
        elmnt.style.top = window.innerHeight - elmnt.offsetHeight;
    }

    //Same for left and right
    if (((elmnt.offsetLeft - pos1) > 0) && (((elmnt.offsetLeft - pos1) + elmnt.offsetWidth) < window.innerWidth)) {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";        
    } else if ((elmnt.offsetLeft - pos1) <= 0) {
        elmnt.style.left = 0;
    } else if (((elmnt.offsetLeft - pos1) + elmnt.offsetWidth) > window.innerWidth) {
        elmnt.style.left = window.innerWidth - elmnt.offsetWidth;
    }

  } 

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onpointerup = null;
    document.onpointermove = null;
    document.getElementById(elmnt.id + "Header").classList.remove('grabbing');
  }
}