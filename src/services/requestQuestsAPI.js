const requestQuestsApi = (token) => {
  const response = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = response.json();
  return data.results;
};

export default requestQuestsApi;
