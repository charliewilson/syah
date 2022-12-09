<script>
    import Window from "./Window.svelte";
    import { afterUpdate } from "svelte";
    import { writable } from 'svelte/store';
        
    export let browserWindow;
    // export const BrowserPageStackStore = writable([]);

// export function openWindow(windowNode) {
//   WindowStackStore.update((stack) => {
//     stack.unshift(windowNode.getNode());
//     return stack;
//   });
// }

// export function closeWindow(windowNode) {
//   WindowStackStore.update((stack) => {
//     return stack.filter(function(el){ 
//       return el != windowNode;
//     });
//   });
// }

// export function activateWindow(windowNode) {
//   WindowStackStore.update((stack) => {
//     let newstack = stack.filter(function(el){
//       return el != windowNode;
//     });
//     newstack.unshift(windowNode);
//     return newstack;
//   });
// }

    let pageContents = "";
    let loading = false;
    let currentPage = "index.html";
    let thisPage = "index.html";

    export async function navigate(path) {
        let toPath = (path !== "" ? path : "index.html")
        
        loading = true;
        currentPage = toPath;
        thisPage = toPath;

        fetch("/syahnet/"+toPath)
            .then((response) => {
                if (response.status != 200) {
                    throw new Error("Page Not Found", {cause: response});
                }
                return response.text()})
            .then((text) => {
                pageContents = text;
                loading = false;
            }).catch(function(err){
                pageContents = "<h3 style='margin-top:10px;''>Page not found!</h3><p>Unfortunately, this page cannot be found.</p><p><a href='index.html'>Return to the homepage</a> and try again.</p>";
                loading = false;
            });
    }

    afterUpdate(() => {
        //bind 'a' tags' href to internal navigation
        document.querySelectorAll("#browserWindow a").forEach((e) => {
            //slice(1) to remove initial '/''
            let destination = e['pathname'].slice(1);
            e.addEventListener('click', (ev) => {
                ev.preventDefault();
                navigate(destination);
            })
        });
    })
</script>

<Window
    bind:windowObject={browserWindow}
    windowTitle={thisPage+" &mdash; syahNet"}
    windowWidth = 360
    windowHeight = 450
    on:windowShow={() => navigate("index.html")}
    >
    <div class="window-inner flex-container">
        <div class="browser-bar">
            <button class="button-icon" disabled>&lt;</button>
            <button class="button-icon" disabled>&gt;</button>
            <button class="button-icon" on:click={() => navigate('index.html')}>&#8962;</button>
            <input type="text" bind:value={currentPage}
            on:keydown={(k) => {
                if (k.key === "Enter") {
                    k.target.blur()
                    navigate(currentPage);
                }
            }}
            class:disabled={loading}
            >
            <button on:click={() => navigate(currentPage)}>
                {loading ? 'Loading...' : 'Go'}
            </button>
        </div>
        <div id="browserWindow">
            {@html pageContents}
        </div>
    </div>
</Window>