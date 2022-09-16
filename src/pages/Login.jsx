import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/index";
import "../style/style.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
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
      <div className="flex flex-col justify-center content-center bg-slate-100 p-4 rounded-2xl shadow-2xl w-[525px] h-[356px]">
        <div
          id="title"
          className="mb-[43.83px] justify-center self-center py-8 flex bg-title bg-cover w-[300px] h-[50px]"
        />
        <form className="flex flex-col gap-3 items-center justify-center">
          <label htmlFor="email">
            <input
              className= "border-2 border-blue-800 rounded-md hover:border-gray-400 w-[330px] h-[40px]"
              data-testid="email-input"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              required
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              className="border-2 border-blue-800 rounded-md hover:border-gray-400 w-[330px] h-[40px]"
              data-testid="password-input"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
              required
              placeholder="Senha"
            />
          </label>
          <Link to="/carteira">
            <button
              className="rounded-md p-2 bg-blue-800 cursor-pointer disabled:cursor-not-allowed text-slate-100 w-[330px] h-[40px]"
              data-testid="submit-review-btn"
              type="button"
              disabled={!isFormValid}
              onClick={() => dispatch(setUser(email))}
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
