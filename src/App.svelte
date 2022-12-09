<script>
	import DesktopIcon from "./components/DesktopIcon.svelte";
  import AboutWindow from "./components/AboutWindow.svelte";
  import BrowserWindow from "./components/BrowserWindow.svelte";
  import CrtFolderWindow from "./components/CrtFolderWindow.svelte";
  import TwentyfiveFolderWindow from "./components/TwentyfiveFolderWindow.svelte";
  
  let aboutWindow;
  let browserWindow;
  let crtFolderWindow;
  let twentyfiveFolderWindow;
</script>

<DesktopIcon
  targetWindow={aboutWindow}
  icon="about"
  name="About" />
  <DesktopIcon
  targetWindow={browserWindow}
  icon="net"
  name="syahNet" />
<DesktopIcon
  targetWindow={crtFolderWindow}
  icon="folder"
  name="CRT" />
<DesktopIcon
  targetWindow={twentyfiveFolderWindow}
  icon="folder"
  name="twenty-five" />

<AboutWindow bind:aboutWindow/>
<BrowserWindow bind:browserWindow/>
<CrtFolderWindow bind:crtFolderWindow/>
<TwentyfiveFolderWindow bind:twentyfiveFolderWindow/>