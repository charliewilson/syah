<script>
    import Window from "./Window.svelte";
    export let linksWindow;
</script>

<Window
    bind:windowObject={linksWindow}
    windowTitle="syahLinks"
    windowWidth = 250
    >
    <div class="window-inner">
        <a target="_blank" href="https://indie-tapes.com/post/657700960466042880/see-you-at-home-crt-bedroom-pop" class="linksButton">CRT Review — IndieTapes</a>
        <a target="_blank" href="https://open.spotify.com/artist/6GDD1QPGXtGRIQfpKSvLmY" class="linksButton">Spotify</a>
        <a target="_blank" href="https://seeyouathome.bandcamp.com" class="linksButton">Bandcamp</a>
    </div>
</Window>