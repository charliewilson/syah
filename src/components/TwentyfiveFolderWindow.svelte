<script>
  import Window from "./Window.svelte";
  import DesktopIcon from "./DesktopIcon.svelte";

  export let twentyfiveFolderWindow;
</script>

<Window
  bind:windowObject={twentyfiveFolderWindow}
  windowTitle="twenty-five &mdash; syahFiles"
  windowWidth = 300
  windowHeight = 200
  windowBackgroundColour = "#FFF"
  >
  <div class="window-inner">
    <div class="desktopIcon light" data-window="crtWindow">
      <img src="./icons/mp3.png">
      <span>CRT.mp3</span>
    </div>

    <div class="desktopIcon light" data-window="crtLyricsWindow">
      <img src="./icons/txt.png">
      <span>lyrics.txt</span>
    </div>

    <DesktopIcon
    targetWindow=null
    externalLink="https://open.spotify.com/playlist/2yNYdegNYadRUTT6NgUxIg"
    icon="link"
    name="mixtape (vol. II)" />
  </div>
</Window>

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
  </style>