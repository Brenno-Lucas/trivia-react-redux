export const setTokenStorage = (string) => {
  localStorage.setItem('token', string);
};

export  const getTokenStorage = () => localStorage.getItem('token');

export default setTokenStorage;
