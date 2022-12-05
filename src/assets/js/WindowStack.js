import { writable } from 'svelte/store';

export const WindowStackStore = writable([]);

//DEBUG
WindowStackStore.subscribe(value => {
  console.log(value);
});

export function openWindow(windowNode) {
  WindowStackStore.update((stack) => {
    stack.unshift(windowNode.getNode());
    return stack;
  });
}

export function closeWindow(windowNode) {
  WindowStackStore.update((stack) => {
    return stack.filter(function(el){ 
      return el != windowNode;
    });
  });

  //window is actually hidden from the Window.svelte side
  //this just removes it from the stack.
}

// function makeWindowActive(windowID) {
//   var el = document.getElementById(windowID);
//   window.openWindows = arrayRemove(window.openWindows, el);
//   window.openWindows.unshift(el);
//   updateWindows();
// }