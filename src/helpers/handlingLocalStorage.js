export const setTokenStorage = (string) => {
  localStorage.setItem('token', string);
};

const getTokenStorage = () => localStorage.getItem('token');

export default setTokenStorage;
