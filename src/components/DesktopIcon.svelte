<script>
//todo
export let window;
export let icon;
export let name;

function iconClick(e) {
    window.showWindow();
    // console.log(window);
}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="desktopIcon" on:click={iconClick}>
    <img alt="{name}" src="./icons/{icon}.png">
    <span>{name}</span>
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
/* div.desktopIcon.light span {
    color:#111;
} */
</style>