<script>
    import Window from "./Window.svelte";
    import { afterUpdate } from "svelte";
    import { writable } from 'svelte/store';
        
    export let browserWindow;
    export const BrowserPagePastStackStore = writable([]);
    export const BrowserPageFutureStackStore = writable([]);
    let canGoBack = false;
    let canGoForward = false;

    function addHistory(page) {
        BrowserPagePastStackStore.update((stack) => {
            if (stack[0] !== page) {
                stack.unshift(page);   
            }
            console.log("Past stack: ", stack);
            return stack;
        });
        BrowserPageFutureStackStore.set([]);
    }

    function clearHistory() {
        BrowserPagePastStackStore.set([]);
        BrowserPageFutureStackStore.set([]);
    }

    function goBack() {
        let shiftPage;
        let destPage;
        BrowserPagePastStackStore.update((stack) => {
            if (stack.length > 0) {
                shiftPage = stack.shift();
            }
            console.log("Past stack: ", stack);
            destPage = stack[0];
            return stack;
        });
        BrowserPageFutureStackStore.update((stack) => {
            stack.unshift(shiftPage)
            console.log("Future stack: ", stack);
            return stack;
        });
        console.log("Shifted: ", shiftPage)
        navigate(destPage, true);
    }

    function goForward() {
        let shiftPage;
        let destPage;
        BrowserPageFutureStackStore.update((stack) => {
            if (stack.length > 0) {
                shiftPage = stack.shift();
            }
            console.log("Future stack: ", stack);
            return stack;
        });
        BrowserPagePastStackStore.update((stack) => {
            stack.unshift(shiftPage)
            console.log("Past stack: ", stack);
            destPage = stack[0];
            return stack;
        });
        navigate(destPage, true);
    }

    BrowserPagePastStackStore.subscribe(value => {
        if (value.length > 1) {
            canGoBack = true;
        } else {
            canGoBack = false;
        }
    });

    BrowserPageFutureStackStore.subscribe(value => {
        if (value.length > 0) {
            canGoForward = true;
        } else {
            canGoForward = false;
        }
    });

    let pageContents = "";
    let loading = false;
    let currentPage = "index.html";
    let thisPage = "index.html";
    addHistory(thisPage);

    export async function navigate(path, avoidHistory = false) {
        let toPath = (path !== "" ? path : "index.html")

        loading = true;
        currentPage = toPath;
        thisPage = toPath;

        if (!avoidHistory) {
            addHistory(thisPage);
        }

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
                pageContents = "<h1>Page not found!</h1><p>Unfortunately, this page cannot be found.</p><p><a href='index.html'>Return to the homepage</a> and try again.</p>";
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
    on:windowClose={() => clearHistory()}
    >
    <div class="window-inner flex-container">
        <div class="browser-bar">
            <button class="button-icon" on:click={() => goBack()} disabled="{!canGoBack}">&lt;</button>
            <button class="button-icon" on:click={() => goForward()} disabled="{!canGoForward}">&gt;</button>
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