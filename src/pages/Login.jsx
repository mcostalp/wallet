import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/index';
import "../style/style.css"

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isFormValid: false,
  };

  validateForm = () => {
    const { email, password } = this.state;
    const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const minPasswordLength = 6;
    const isPasswordValid = password.length >= minPasswordLength;
    this.setState({ isFormValid: isEmailValid && isPasswordValid });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateForm);
  };

  render() {
    const { password, email, isFormValid } = this.state;
    const { dispatch } = this.props;
    return (
      <div className='flex flex-col justify-center content-center bg-blue-300 p-4 rounded-2xl shadow-2xl'>
        <div id='title' className='bg-gradient-to-r from-purple-400 to-blue-500 justify-center py-8 mb-4 rounded-2xl flex'>
          <h1 className="text-3xl text-white font-bold">My Wallet</h1>
        </div>
        <form className='flex flex-col gap-6 items-center justify-center'>
          <h4 className='text-center'>Login</h4>
          <label htmlFor="email">
            Email
            <input
              className='text-white border-2 border-gray-200 rounded-md hover:border-gray-400'
              data-testid="email-input"
              id="email"
              name="email"
              type="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              className='border-2 border-gray-200 rounded-md hover:border-gray-400'
              data-testid="password-input"
              id="password"
              name="password"
              type="password"
              value={ password }
              onChange={ this.handleChange }
              required
            />
          </label>
          <Link to="/carteira">
            <button
              className='rounded-xl p-2 bg-slate-400 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed'
              data-testid="submit-review-btn"
              type="button"
              disabled={ !isFormValid }
              onClick={ () => dispatch(setUser(email)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

Login.propTypes = {
  password: PropTypes.string,
  email: PropTypes.string,
  isFormValid: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(Login);
