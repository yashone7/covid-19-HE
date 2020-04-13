import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import decoder from "jwt-decode";
import { login } from "../../redux/actions/authAction";

const Login = ({ isAuthenticated, token, login }) => {
  const [formData, handleFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleLogin = (e) => {
    handleFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    const user = decoder(token);

    if (user.user.role === "doctor") {
      return <Redirect to="/doctor" />;
    }
    if (user.user.role === "ngo") {
      return <Redirect to="/ngos" />;
    }
  }

  return (
    <Fragment>
      <div className="container pt-5 px-2 mx-3 mt-3 shadow-md">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="control">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="input"
              id="email"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => handleLogin(e)}
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              id="password"
              onChange={(e) => handleLogin(e)}
              value={password}
            />
          </div>
          <button type="submit" className="button is-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  token: state.authReducer.token,
});

export default connect(mapStateToProps, { login })(Login);
