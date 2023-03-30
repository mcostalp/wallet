import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faCoins, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const { ask } = exchangeRates[currency];
      return acc + value * ask;
    }, 0);
    return (
      <header className="flex flex-wrap justify-center items-center gap-4 flex-col bg-white w-full">
        <div
          id="title"
          className="py-8 flex bg-title bg-cover w-[300px] h-[50px]"
        />
        <div className="flex flex-wrap flex-col items-center">
          <h2 data-testid="email-field" className="text-green-600">
            <FontAwesomeIcon icon={faUser} /> {email}
          </h2>
          <h3 data-testid="total-field" className="text-blue-600">
            <FontAwesomeIcon icon={faCoins} /> Total de despesas{" "}
            {totalField.toFixed(2)}BRL
          </h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
