<script>
  import Window from "./Window.svelte";
  import TwentyfiveLyricsWindow from "./TwentyfiveLyricsWindow.svelte";
  import DesktopIcon from "./DesktopIcon.svelte";

  export let twentyfiveFolderWindow;
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

<TwentyfiveLyricsWindow bind:twentyfiveLyricsWindow />