<script>
  import Window from "./Window.svelte";
  import TwentyfiveWindow from "./TwentyfiveWindow.svelte";
  import TwentyfiveLyricsWindow from "./TwentyfiveLyricsWindow.svelte";
  import DesktopIcon from "./DesktopIcon.svelte";

  export let twentyfiveFolderWindow;
  let twentyfiveWindow;
  let twentyfiveLyricsWindow;
</script>

<Window
  bind:windowObject={twentyfiveFolderWindow}
  windowTitle="twenty-five &mdash; syahFiles"
  windowWidth = 300
  windowHeight = 200
  windowBackgroundColour = "#FFF"
  >
  <div class="window-inner">
    <DesktopIcon
    targetWindow={twentyfiveWindow}
    icon="mp3"
    name="twenty-five.mp3" />

    <DesktopIcon
    targetWindow={twentyfiveLyricsWindow}
    icon="txt"
    name="lyrics.txt" />

    <DesktopIcon
    targetWindow=null
    externalLink="https://open.spotify.com/playlist/2yNYdegNYadRUTT6NgUxIg"
    icon="link"
    name="mixtape (vol. II)" />
  </div>
</Window>

<TwentyfiveWindow bind:twentyfiveWindow />
<TwentyfiveLyricsWindow bind:twentyfiveLyricsWindow />