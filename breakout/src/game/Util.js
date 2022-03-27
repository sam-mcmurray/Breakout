export const registerListener = (eventName, handler) => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}

export async function getLeaderboard() {
  return (await (await fetch('http://localhost:5600/api/leaderboard')).json());
}


