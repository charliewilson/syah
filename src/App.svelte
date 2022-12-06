<script>
	import DesktopIcon from "./components/DesktopIcon.svelte";
  import AboutWindow from "./components/AboutWindow.svelte";
  import LinksWindow from "./components/LinksWindow.svelte";
  import CrtFolderWindow from "./components/CrtFolderWindow.svelte";
  import TwentyfiveFolderWindow from "./components/TwentyfiveFolderWindow.svelte";
  
  let aboutWindow;
  let linksWindow;
  let crtFolderWindow;
  let twentyfiveFolderWindow;
</script>

<DesktopIcon
  targetWindow={aboutWindow}
  icon="about"
  name="About" />
<DesktopIcon
  targetWindow={linksWindow}
  icon="links"
  name="Links" />
<DesktopIcon
  targetWindow={crtFolderWindow}
  icon="folder"
  name="CRT" />
<DesktopIcon
  targetWindow={twentyfiveFolderWindow}
  icon="folder"
  name="twenty-five" />

<AboutWindow bind:aboutWindow/>
<LinksWindow bind:linksWindow/>

<CrtFolderWindow bind:crtFolderWindow/>
<TwentyfiveFolderWindow bind:twentyfiveFolderWindow/>