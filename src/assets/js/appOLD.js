window.openWindows = new Array();
window.snd_crt = new Howl({ src: ['crt.mp3'], html5: true });
window.snd_twentyfive = new Howl({ src: ['twentyfive.mp3'], html5: true });

function playSound(soundname) {
    var sound = window['snd_'+soundname];
    var e = document.querySelector(".playButton[data-song='"+soundname+"']");

    sound.play();
    //Set button text to pause button
    e.innerHTML = "&#10073;&#10073;";

    window['snd_'+soundname+'_interval'] = setInterval(function(){
        let duration = sound.duration()
        let seek = sound.seek();
        let percent = (seek/duration) * 100;
        document.getElementById(e.getAttribute('data-song')+'_progress').value = percent;
    }, 1000);
}

function pauseSound(soundname) {
    var sound = window['snd_'+soundname];
    var e = document.querySelector(".playButton[data-song='"+soundname+"']");

    sound.pause();
    //Set button text to play button
    e.innerHTML = "&#9658;";

    clearInterval(window['snd_'+soundname+'_interval']);
}

function stopSound(soundname) {
    var sound = window['snd_'+soundname];
    var e = document.querySelector(".playButton[data-song='"+soundname+"']");

    sound.stop();
    //Set button text to play button
    e.innerHTML = "&#9658;";
    clearInterval(window['snd_'+soundname+'_interval']);
    document.getElementById(e.getAttribute('data-song')+'_progress').value = 0;
}


function openWindow(windowID) {
    var el = document.getElementById(windowID);

    el.style.display = "block";
    window.openWindows.unshift(el);

    updateWindows();
}

function closeWindow(windowID) {
    var el = document.getElementById(windowID);

    if (el.hasAttribute('data-song')) {
        stopSound(el.getAttribute('data-song'));
    }
    el.style.display = "none";
    window.openWindows = arrayRemove(window.openWindows, el);

    updateWindows();
}

function makeWindowActive(windowID) {
    var el = document.getElementById(windowID);
    window.openWindows = arrayRemove(window.openWindows, el);
    window.openWindows.unshift(el);
    updateWindows();
}

function updateWindows() {

    if (window.openWindows.length > 0) {

        const zindexMax = 999;
        let windowSnapshot = new Array(...window.openWindows);



        let topWindow = windowSnapshot[0];



        topWindow.querySelector("div.title-bar").classList.remove('inactive');
        topWindow.style['z-index'] = zindexMax;

        windowSnapshot.shift();



        windowSnapshot.forEach((e,i) => {
            e.querySelector("div.title-bar").classList.add('inactive');
            e.style['z-index'] = (zindexMax-1) - i;
        });
    }
}

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}


Array.from(document.getElementsByClassName('desktopIcon')).forEach((e) => {
    e.onpointerdown = () => {
        if (e.hasAttribute('data-link')) {
            window.open(e.getAttribute('data-link'), '_blank');
        } else {
            window.disableActiveSwitching = true;
            
            if (document.getElementById(e.getAttribute('data-window')).style.display == "block") {
                makeWindowActive(e.getAttribute('data-window'));
            } else {
                openWindow(e.getAttribute('data-window'));
            }
        }
    }
});

Array.from(document.getElementsByClassName('window')).forEach((e) => {
    // Make the DIV element draggable:
    dragElement(e);
    e.onpointerdown = () => {
        if (!window.disableActiveSwitching) {
            makeWindowActive(e.id);
        }
    }
    e.onpointerup = () => {
        window.disableActiveSwitching = false;
    }
});

Array.from(document.getElementsByClassName('playButton')).forEach((e) => {
    e.onpointerdown = () => {
        let sound = window['snd_'+e.getAttribute('data-song')];

        if (sound.playing()) {
            pauseSound(e.getAttribute('data-song'));
        } else {
            playSound(e.getAttribute('data-song'));
        }


    }
});

Array.from(document.getElementsByClassName('songProgress')).forEach((e) => {
    let sound = window['snd_'+e.getAttribute('data-song')];

    e.onpointerdown = () => {
        clearInterval(window['snd_'+e.getAttribute('data-song')+'_interval']);
    }

    e.onpointerup = () => {
        window['snd_'+e.getAttribute('data-song')+'_interval'] = setInterval(function(){
            let duration = sound.duration()
            let seek = sound.seek();
            let percent = (seek/duration) * 100;
            document.getElementById(e.getAttribute('data-song')+'_progress').value = percent;
        }, 1000);
    }

    e.onchange = () => {

        sound.seek(sound.duration() * (e.value / 100));
    }
});

window.snd_crt.on('end', () => {
    stopSound('crt');
});

window.snd_twentyfive.on('end', () => {
    stopSound('twentyfive');
});

function dragElement(elmnt) {
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

    // console.log("x: ", pos1);
    // console.log("y: ", pos2);

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

openWindow('aboutWindow');
