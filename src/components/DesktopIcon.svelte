<script>
// @ts-nocheck

import { openWindow } from "../assets/js/WindowStack";

export let targetWindow;
export let icon;
export let name;
export let externalLink = "";
export let autoOpen = false;

if (autoOpen) {
    (externalLink !== "") ? window.open(externalLink, '_blank') : openWindow(targetWindow)
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
class="desktopIcon"
on:click={(externalLink !== "") ? window.open(externalLink, '_blank') : openWindow(targetWindow)}>
    <img alt="{name}" src="/ico/{icon}.png">
    <span>{@html name}</span>
</div>

<style>
div.desktopIcon {
    display:inline-block;
    cursor:pointer;
    margin-right:16px;
}

div.desktopIcon img {
    width:32px;
    display:block;
    margin:auto;
}

div.desktopIcon span {
    font-family: "Pixelated MS Sans Serif",Arial;
    -webkit-font-smoothing: none;
    font-size: 11px;
    display:block;
    color:#222;
    margin-top:5px;
    text-align:center;
}
</style>