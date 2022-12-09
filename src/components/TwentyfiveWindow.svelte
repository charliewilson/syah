<script>
    import MusicWindow from "./MusicWindow.svelte";
    export let twentyfiveWindow;
</script>

<MusicWindow
    bind:musicWindow={twentyfiveWindow}
    mp3Path="/apps/twentyfive/assets/twentyfive.mp3"
    coverPath="/apps/twentyfive/assets/twentyfive.jpg"
    displayFilename="twenty-five.mp3"
    displayTitle="twenty-five"
/>