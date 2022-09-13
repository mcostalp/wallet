import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import wallet from '../redux/reducers/wallet';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalField = expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return (
      <header>
        <h2 data-testid="email-field">{ email }</h2>
        <h3 data-testid="total-field">{ totalField.toFixed(2) }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
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
