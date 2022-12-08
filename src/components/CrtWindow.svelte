<script>
    import Window from "./Window.svelte";
    import toggleSound from "./Window.svelte";

    export let crtWindow;

    let snd_crt = new Howl({ src: ['apps/crt/assets/crt.mp3'], html5: true });
    let soundname = "crt";
    let isPlaying;
    let soundPosition;
</script>

<Window
    bind:windowObject={crtWindow}
    windowTitle="CRT.mp3 &mdash; syahPlayer"
    windowBackgroundColour="#c0c0c0"
    windowSoundObject={snd_crt}
    windowSoundName="crt"
    bind:isPlaying
    bind:soundPosition
    >
    <div class="window-inner">
        <div style="background-image:url('/apps/crt/assets/crt.jpg')" class="albumArt bevelled"></div>

        <p class="songName">CRT</p>
        <p class="artistName">see you at home</p>

        <div class="field-row" style="width: 100%">
            <input id="crt_progress" data-song="crt" class="songProgress" type="range" min="0" max="100" value={soundPosition}>
        </div>

        <button class="playButton" data-song="crt" on:click={toggleSound}>
            {@html isPlaying ? '&#9658;' : '&#10073;&#10073;' }
        </button>

    </div>
</Window>