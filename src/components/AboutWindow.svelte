<script>
// @ts-nocheck
    import Window from "./Window.svelte";
    export let aboutWindow;
</script>

<Window
    bind:windowObject={aboutWindow}
    windowTitle="About syahOS"
    windowBackground="/apps/about/assets/background.png"
    autoOpen
    >
    <div class="flex-container">
        <div style="height:120px; flex:none;">
            <span style="position:relative; left: 98px; top:85px; color:#FFF;">version 1.5 beta</span>
        </div>
        <div style="flex:1;" class="window-inner">
            <div class="bevelled" style="width:100%; background-color:rgba(0,0,0,0.75); color:#FFF; padding:8px; box-sizing: border-box; line-height:15px; top:100px; left:60px;">
                
                <p><strong>see you at home</strong> make sad songs from their bedrooms.</p>
                <p>josh wilson, arthur duncan, charlie wilson</p>
                
                <p>find us on:<br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/artist/6GDD1QPGXtGRIQfpKSvLmY">spotify</a> | 
                <a target="_blank" rel="noreferrer" href="https://seeyouathome.bandcamp.com">bandcamp</a> | 
                <a target="_blank" rel="noreferrer" href="https://soundcloud.com/wearesyah">soundcloud</a> | 
                <a target="_blank" rel="noreferrer" href="https://instagram.com/wearesyah">instagram</a>

                <p>all releases:<br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/album/4fjnupIwWAkQb7ZZTbsEYL">twenty-five</a><br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/album/0gwmyIJ3eMxqHdt9Oby5xZ">CRT</a><br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/album/7Csx9lXLveS9N6DJIvM04k">be happy</a><br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/album/5YWTJayOvpuYcD5jcZgXxz">the future&#8217;s here &amp; it&#8217;s terrible</a><br>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com/album/2nkQHPecVztC774nkN2lPl">everything is okay</a></p>
                
            </div>
        </div>
    </div>
</Window>