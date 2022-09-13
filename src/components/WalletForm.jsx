import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, createNewExpense } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onBtnClick = (state) => {
    const { dispatch, expenses } = this.props;
    const newEspenses = { id: expenses.length, ...state };
    dispatch(createNewExpense(newEspenses));
    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method,
      tag, description } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value-input"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.map((atualCurr) => (
                <option key={ atualCurr } value={ atualCurr }>
                  {atualCurr}
                </option>))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              data-testid="tag-input"
              name="tag"
              id="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <button
            type="button"
            data-testid="add-expenses"
            onClick={ () => this.onBtnClick(this.state) }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currAndValue: state.wallet.currAndValue,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
