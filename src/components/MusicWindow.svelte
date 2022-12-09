<script>
    import Window from "./Window.svelte";

    export let musicWindow;
    export let mp3Path;
    export let coverPath;
    export let displayFilename
    export let displayTitle;

    let isPlaying = false;
    let soundPosition = 0;
    let soundInterval = null;

    let snd = new Howl({ src: [mp3Path], html5: true });
    snd.on('end', () => {
        stopSound();
    });

    export function startTracking() {
        soundInterval = setInterval(function(){
            let duration = snd.duration()
            let seek = snd.seek();
            soundPosition = (seek/duration) * 100;
        }, 1000);
    }

    export function stopTracking() {
        clearInterval(soundInterval);
    }

    export function playSound() {
        snd.play();
        isPlaying = true;
        startTracking();
    }

    export function pauseSound() {
        snd.pause();
        isPlaying = false;
        stopTracking();
    }

    export function stopSound() {
        snd.stop();
        isPlaying = false;
        stopTracking();
        soundPosition = 0;
    }

    export function toggleSound() {
        if (snd.playing()) {
            pauseSound();
        } else {
            playSound();
        }
    }
</script>

<Window
    bind:windowObject={musicWindow}
    on:windowClose={() => stopSound()}
    windowTitle={displayFilename+" &mdash; syahPlayer"}
    windowBackgroundColour="#c0c0c0"
    windowWidth="191"
    >
    <div class="window-inner">
        <div style="background-image:url('{coverPath}')" class="albumArt bevelled"></div>

        <p class="songName">{displayTitle}</p>
        <p class="artistName">see you at home</p>

        <div class="field-row" style="width: 100%">
            <input class="songProgress"
            type="range" min="0" max="100" value={soundPosition}
            on:pointerdown={() => stopTracking()}
            on:pointerup={() => startTracking()}
            on:change={(e) => {snd.seek(snd.duration() * (e.target.value / 100))}}
            >
        </div>

        <button class="playButton" on:click={() => toggleSound()}>
            {@html isPlaying ? '&#10073;&#10073;' : '&#9658;'}
        </button>

    </div>
</Window>