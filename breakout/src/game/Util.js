export const registerListener = (eventName, handler) => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export function getStorage(key) {
  return JSON.parse(window.sessionStorage.getItem(key));
}

export function setStorage(key, value) {
  window.sessionStorage.setItem(key, JSON.stringify(value));
}
