import React, { Fragment } from "react";
import decoder from "jwt-decode";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../common/Navbar";

const DoctorDashboard = ({ isAuthenticated, token, children }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (isAuthenticated) {
    const doctor = token && decoder(token);
    if (doctor.user.role !== "doctor") {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Fragment>
      <Navbar />
      <div className="p-2 mx-3 my-2">
        <Link
          to="/create-patient"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mx-2 rounded"
        >
          Create Patient
        </Link>
        <Link
          to="/conduct-test"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mx-2 rounded"
        >
          Conduct Test
        </Link>
        <Link
          to="/visualization"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 mx-2 rounded"
        >
          Visualization
        </Link>
      </div>
      {children}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  token: state.authReducer.token,
});

/*
 *   We have to have 2 options 1. is for creating patient
 *
 *   2. creatig a test.
 */
export default connect(mapStateToProps)(DoctorDashboard);
