<script>
    import { dragElement } from "../assets/js/app";

    export let windowTitle = "Window";
    export let windowVisible = false;
    export let windowID;

    export const windowObject = {
        toggle() {
            windowVisible = !windowVisible
        },
        show() {
            windowVisible = true
        },
        hide() {
            windowVisible = false
        }
    }
</script>

<div id="{windowID}" class="window" style="width:300px; display:{windowVisible ? 'block' : 'none'}">
    <div class="flex-container">
        <div id="aboutWindowHeader" class="title-bar">
            <div class="title-bar-text">{windowTitle}</div>
            <div class="title-bar-controls">
                <button aria-label="Close" on:click={() => windowVisible = false}></button>
            </div>
        </div>
        <div class="window-body" style="background-image:url('syahAboutBG.png'); background-size:cover;">
            <slot></slot>
        </div>
    </div>
    
</div>