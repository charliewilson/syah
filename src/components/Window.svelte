<script>
    import { WindowStackStore, closeWindow } from "../assets/js/WindowStack";

    const windowStackMaxPosition = 999;

    export let windowTitle = "Window";
    export let windowVisible = false;
    export let windowID;
    export let windowBackground = false;
    export let windowWidth = 300;
    export let windowHeight = null;    
    export let windowActive = false;
    export let windowStackPosition = 0;

    let win,
        dragging = false,
        pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    export const windowObject = {
        toggle() {
            windowVisible = !windowVisible
        },
        show() {
            windowVisible = true;
        },
        hide() {
            windowVisible = false
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
        console.log(windowID+" z: ", value.indexOf(win));
    });

    function startDrag(e) {
        dragging = true;
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
</script>

<div id="{windowID}" class="window"
style:width="{windowWidth != null ? windowWidth+'px' : 'auto'}"
style:height="{windowHeight != null ? windowHeight+'px' : 'auto'}"
style:display="{windowVisible ? 'block' : 'none'}" bind:this={win}>
    <div class="flex-container">
        <div id="{windowID}Header" class="title-bar"
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
        <div class="window-body" style="background:#EEE; width:100%; overflow:auto;">
            <slot></slot>
        </div>
        {/if}       
    </div>
</div>