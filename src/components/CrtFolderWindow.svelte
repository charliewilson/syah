<script>
  import Window from "./Window.svelte";
  import CrtWindow from "./CrtWindow.svelte";
  import CrtLyricsWindow from "./CrtLyricsWindow.svelte";
  import DesktopIcon from "./DesktopIcon.svelte";

  export let crtFolderWindow;
  
  let crtWindow;
  let crtLyricsWindow;

</script>

<Window
  bind:windowObject={crtFolderWindow}
  windowTitle="CRT &mdash; syahFiles"
  windowWidth = 300
  windowHeight = 200
  windowBackgroundColour = "#FFF"
  >
  <div class="window-inner">
    <DesktopIcon
    targetWindow={crtWindow}
    icon="mp3"
    name="CRT.mp3" />
    <DesktopIcon
    targetWindow={crtLyricsWindow}
    icon="txt"
    name="lyrics.txt" />
    <DesktopIcon
    targetWindow=null
    externalLink="https://open.spotify.com/playlist/5S93PRuBQpnsyTiOL6vqsB"
    icon="link"
    name="mixtape (vol. I)" />
    <DesktopIcon
    targetWindow=null
    externalLink="https://indie-tapes.com/post/657700960466042880/see-you-at-home-crt-bedroom-pop"
    icon="link"
    name="indietapes<br>review" />
  </div>
</Window>

<CrtWindow bind:crtWindow/>
<CrtLyricsWindow bind:crtLyricsWindow/>