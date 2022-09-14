import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrency, createNewExpense } from "../redux/actions";

const INITIAL_STATE = {
  value: "",
  currency: "USD",
  method: "Dinheiro",
  tag: "Alimentação",
  description: "",
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
    const { value, currency, method, tag, description } = this.state;
    return (
      <div className="w-full">
        <form className="">
          <div className="bg-gray-200 flex flex-col items-center gap-4 py-3 flex-wrap">
            <div className="flex justify-between w-3/4 flex-wrap">
              <label
                className="text-blue-800 font-semibold"
                htmlFor="description-input"
              >
                Descrição da despesa:
              </label>
              <input
                data-testid="description-input"
                type="text"
                name="description"
                id="description-input"
                onChange={this.handleChange}
                value={description}
              />

              <label
                className="text-blue-800 font-semibold"
                htmlFor="tag-input"
              >
                Categoria da despesa:
              </label>
              <select
                className="text-blue-800 font-semibold"
                data-testid="tag-input"
                name="tag"
                id="tag-input"
                onChange={this.handleChange}
                value={tag}
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </div>
            <div className="flex justify-between w-3/4 flex-wrap">
              <label
                className="text-blue-800 font-semibold"
                htmlFor="value-input"
              >
                Valor:
              </label>
              <input
                data-testid="value-input"
                type="number"
                name="value"
                id="value-input"
                onChange={this.handleChange}
                value={value}
              />

              <label
                className="text-blue-800 font-semibold"
                htmlFor="method-input"
              >
                Método de Pagamento:
              </label>
              <select
                className="text-blue-800 font-semibold"
                data-testid="method-input"
                name="method"
                id="method-input"
                onChange={this.handleChange}
                value={method}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>

              <label
                className="text-blue-800 font-semibold"
                htmlFor="currency-input"
              >
                Moeda:
                <select
                  data-testid="currency-input"
                  name="currency"
                  id="currency-input"
                  onChange={this.handleChange}
                  value={currency}
                >
                  {currencies.map((atualCurr) => (
                    <option key={atualCurr} value={atualCurr}>
                      {atualCurr}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="bg-white flex justify-center py-5 rounded-b-lg">
            <button
            className='bg-emerald-400 text-white font-semibold py-2 px-28 rounded-lg'
              type="button"
              data-testid="add-expenses"
              onClick={() => this.onBtnClick(this.state)}
              disabled={value === ""}
            >
              Adicionar despesa
            </button>
          </div>
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
