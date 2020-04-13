import React, { Fragment } from "react";
import { logout } from "../../redux/actions/authAction";
import { connect } from "react-redux";

const Navbar = ({ logout }) => {
  return (
    <Fragment>
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <p className="navbar-item text-lg">COVID-19 App</p>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-warning" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default connect(null, { logout })(Navbar);
