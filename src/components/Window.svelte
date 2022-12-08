<script>
    import { WindowStackStore, closeWindow, activateWindow } from "../assets/js/WindowStack";

    const windowStackMaxPosition = 999;

    export let windowTitle = "Window";
    export let windowVisible = false;
    export let windowBackground = false;
    export let windowWidth = null;
    export let windowHeight = null;    
    export let windowActive = false;
    export let windowStackPosition = 0;
    export let windowBackgroundColour = "#EEE";
    export let windowSoundObject = null;
    export let windowSoundName = null;
    export let isPlaying = false;
    export let soundPosition = 0;

    let win,
        dragging = false,
        pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0,
        soundInterval = null;

    export const windowObject = {
        toggle() {
            windowVisible = !windowVisible
            stopSound();
        },
        show() {
            windowVisible = true;
        },
        hide() {
            windowVisible = false;
            stopSound();
        },
        getNode() {
            return win;
        }
    }

    WindowStackStore.subscribe(value => {
        if (value.indexOf(win) == -1) {
            windowObject.hide()
        } else {
            windowObject.show()
            windowStackPosition = windowStackMaxPosition - value.indexOf(win);
            if (windowStackPosition == windowStackMaxPosition) {
                windowActive = true;
            } else {
                windowActive = false;
            }
        }
    });

    function startDrag(e) {
        dragging = true;
        activateWindow(win)
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        // attach these to the document so the mouse doesn't "slip off" the header.
        document.onpointerup = endDrag;
        document.onpointermove = updateDrag;
    }

    function endDrag() {
        // stop moving when mouse button is released:
        dragging = false;
        document.onpointerup = null;
        document.onpointermove = null;
    }

    function updateDrag(e) {
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
        if (((win.offsetTop - pos2) > 0) && (((win.offsetTop - pos2) + win.offsetHeight) < window.innerHeight)) {
        win.style.top = (win.offsetTop - pos2) + "px";
        } else if ((win.offsetTop - pos2) <= 0) {
        win.style.top = 0;
        } else if (((win.offsetTop - pos2) + win.offsetHeight) > window.innerHeight) {
        win.style.top = window.innerHeight - win.offsetHeight;
        }

        //Same for left and right
        if (((win.offsetLeft - pos1) > 0) && (((win.offsetLeft - pos1) + win.offsetWidth) < window.innerWidth)) {
        win.style.left = (win.offsetLeft - pos1) + "px";        
        } else if ((win.offsetLeft - pos1) <= 0) {
        win.style.left = 0;
        } else if (((win.offsetLeft - pos1) + win.offsetWidth) > window.innerWidth) {
        win.style.left = window.innerWidth - win.offsetWidth;
        }
    }

    export function playSound() {
        if (windowSoundName && windowSoundObject) {
            windowSoundObject.play();

            soundInterval = setInterval(function(){
                let duration = windowSoundObject.duration()
                let seek = windowSoundObject.seek();
                soundPosition = (seek/duration) * 100;
            }, 1000);
        } else {
            console.error("Error: windowSoundName or windowSoundObject invalid!");
        }
    }

    export function pauseSound() {
        if (windowSoundName && windowSoundObject) {
            windowSoundObject.pause();
            clearInterval(soundInterval);
        } else {
            console.error("Error: windowSoundName or windowSoundObject invalid!");
        }
    }

    export function stopSound() {
        if (windowSoundObject) {
            windowSoundObject.stop();
            clearInterval(soundInterval);
            soundPosition = 0;
        } else {
            console.error("Error: windowSoundName or windowSoundObject invalid!");
        }
    }

    export function toggleSound() {
        if (windowSoundObject) {
            if (windowSoundObject.playing()) {
                pauseSound();
            } else {
                playSound();
            }
        } else {
            console.error("Error: windowSoundObject invalid!");
        }
    }
</script>

<div class="window"
style:width="{windowWidth != null ? windowWidth+'px' : 'auto'}"
style:height="{windowHeight != null ? windowHeight+'px' : 'auto'}"
style:display="{windowVisible ? 'block' : 'none'}"
style:z-index="{windowStackPosition}"
on:mousedown={activateWindow(win)}
bind:this={win}>
    <div class="flex-container">
        <div class="title-bar"
        class:grabbing={dragging}
        class:inactive={!windowActive}
        on:pointerdown={startDrag}>
            <div class="title-bar-text">{windowTitle}</div>
            <div class="title-bar-controls">
                <button aria-label="Close" on:click={closeWindow(win)}></button>
            </div>
        </div>
        {#if windowBackground}
        <div class="window-body" style="background-image:url('{windowBackground}'); background-size:cover;">
            <slot></slot>
        </div>
        {:else}
        <div class="window-body" style="background:{windowBackgroundColour}; width:100%; overflow:auto;">
            <slot></slot>
        </div>
        {/if}       
    </div>
</div>