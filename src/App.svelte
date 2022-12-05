<script>
	import DesktopIcon from "./components/DesktopIcon.svelte";
  import AboutWindow from "./components/AboutWindow.svelte";
  import LinksWindow from "./components/LinksWindow.svelte";
  
  let aboutWindow;
  let linksWindow;
</script>

<DesktopIcon
  window={aboutWindow}
  icon="about"
  name="About" />
<DesktopIcon
  window={linksWindow}
  icon="links"
  name="Links" />
<DesktopIcon
  window="crtFolderWindow"
  icon="folder"
  name="CRT" />
<DesktopIcon
  window="twentyfiveFolderWindow"
  icon="folder"
  name="twenty-five" />

<AboutWindow bind:aboutWindow/>
<LinksWindow bind:linksWindow/>