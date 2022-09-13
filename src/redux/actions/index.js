// Coloque aqui suas actions
import getCurrencyAPI from '../../services/currencyAPI';

export const SET_USER = 'SET_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SUCCESS_CURRENCY = 'SUCCESS_CURRENCY';
export const FAILURE_CURRENCY = 'FAILURE_CURRENCY';
export const SUCCESS_CURRENCY_EXP = 'SUCCESS_CURRENCY_EXP';
export const SET_EXPENSE = 'SET_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const setUser = (email) => ({
  type: SET_USER,
  email,
});

export const setExpenses = (expense) => ({
  type: SET_EXPENSE,
  expense,
});

const getCurrency = () => ({
  type: GET_CURRENCY,
});

const successCurrencyAPI = (response) => ({
  type: SUCCESS_CURRENCY,
  response,
});

const failureCurrencyAPI = (error) => ({
  type: FAILURE_CURRENCY,
  error,
});

export const deleteId = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const fetchCurrency = () => async (dispatch) => {
  dispatch(getCurrency());
  try {
    const response = await getCurrencyAPI();
    dispatch(successCurrencyAPI(response));
  } catch (error) {
    dispatch(failureCurrencyAPI(error));
  }
};

export const createNewExpense = (state) => async (dispatch) => {
  const exchangeRates = await getCurrencyAPI();
  delete exchangeRates.USDT;
  const newExpense = {
    ...state,
    exchangeRates,
  };
  dispatch(setExpenses(newExpense));
};
