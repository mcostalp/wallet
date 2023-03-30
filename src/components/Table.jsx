import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteId } from "../redux/actions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Table extends Component {
  deleteClick = (id) => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch(deleteId(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="bg-blue-700 p-3 text-sm font-semibold tracking-wide text-left">
        <table className="p-3 text-sm font-semibold tracking-wide text-left">
          <thead className="p-3 text-sm font-semibold tracking-wide text-left">
            <tr className="text-white p-3 text-sm font-semibold tracking-wide text-left">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Descrição
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Tag
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Método de pagamento
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Valor
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Moeda
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Câmbio utilizado
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Valor convertido
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Moeda de conversão
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const {
                value,
                description,
                currency,
                method,
                tag,
                id,
                exchangeRates,
              } = expense;
              const { ask, name } = exchangeRates[currency];
              return (
                <tr
                  className="text-white p-3 text-sm font-semibold tracking-wide text-left"
                  key={`expense-${id}`}
                >
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {description}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {tag}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {method}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {(+value).toFixed(2)}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {name}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {(+ask).toFixed(2)}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    {(ask * value).toFixed(2)}
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    Real
                  </td>
                  <td className="text-white p-3 text-sm font-semibold tracking-wide text-left">
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={() => this.deleteClick(id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf({}),
}.isRequires;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(Table);
