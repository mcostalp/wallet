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
      <div className="w-full h-full bg-blue-700 ">
        <table className="table-auto w-full">
          <thead className="">
            <tr className="text-white">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
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
                <tr className="text-white text-center" key={`expense-${id}`}>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{(+value).toFixed(2)}</td>
                  <td>{name}</td>
                  <td>{(+ask).toFixed(2)}</td>
                  <td>{(ask * value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
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
