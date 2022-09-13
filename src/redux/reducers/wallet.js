// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY, SUCCESS_CURRENCY, SUCCESS_CURRENCY_EXP,
  FAILURE_CURRENCY, SET_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
  error: '',
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state, isFetching: true };
  case SUCCESS_CURRENCY:
    return {
      ...state,
      currencies: Object.values(action.response)
        .filter(({ codein }) => codein !== 'BRLT')
        .map(({ code }) => code),
      isFetching: false,
    };
  case SUCCESS_CURRENCY_EXP:
    return {
      ...state,
      currAndValue: Object.values(action.response)
        .filter(({ codein }) => codein !== 'BRLT'),
      isFetching: false,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.lenghtn, ...action.expense },
      ],
    };
  case FAILURE_CURRENCY:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter((expense) => expense.id !== action.id),
  };
  default:
    return state;
  }
}
