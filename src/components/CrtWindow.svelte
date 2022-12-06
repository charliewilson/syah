<script>
    import Window from "./Window.svelte";
    export let crtWindow;

    let snd_crt = new Howl({ src: ['apps/crt/assets/crt.mp3'], html5: true });
</script>

<Window
    bind:windowObject={crtWindow}
    windowTitle="CRT.mp3 &mdash; syahPlayer"
    windowBackgroundColour="#c0c0c0"
    >
    <div class="window-inner">
        <div style="background-image:url('/apps/crt/assets/crt.jpg')" class="albumArt bevelled"></div>

        <p class="songName">CRT</p>
        <p class="artistName">see you at home</p>

        <div class="field-row" style="width: 100%">
            <input id="crt_progress" data-song="crt" class="songProgress" type="range" min="0" max="100" value="0">
        </div>

        <button class="playButton" data-song="crt">►</button>

    </div>
</Window>