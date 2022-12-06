import { writable } from 'svelte/store';

export const WindowStackStore = writable([]);

export function openWindow(windowNode) {
  console.log(windowNode);
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
}

export function activateWindow(windowNode) {
  WindowStackStore.update((stack) => {
    let newstack = stack.filter(function(el){
      return el != windowNode;
    });
    newstack.unshift(windowNode);
    return newstack;
  });
}