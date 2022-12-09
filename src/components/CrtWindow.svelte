<script>
    import MusicWindow from "./MusicWindow.svelte";
    export let crtWindow;
</script>

<MusicWindow
    bind:musicWindow={crtWindow}
    mp3Path="/apps/crt/assets/crt.mp3"
    coverPath="/apps/crt/assets/crt.jpg"
    displayFilename="CRT.mp3"
    displayTitle="CRT"
/>