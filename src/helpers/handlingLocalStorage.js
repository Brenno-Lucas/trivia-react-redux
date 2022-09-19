export const setTokenStorage = (string) => {
  localStorage.setItem('token', string);
};

export const getTokenStorage = () => localStorage.getItem('token');

export const setPlayersStorage = (players) => {
  localStorage.setItem('players', JSON.stringify(players));
};

export const getPlayersStorage = () => {
  const objString = localStorage.getItem('players');
  return JSON.parse(objString);
};
