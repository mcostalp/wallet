const API_BASE_URL = 'https://economia.awesomeapi.com.br/json';

const getCurrencyAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/all`);
  const json = response.json();
  return json;
};

export default getCurrencyAPI;
