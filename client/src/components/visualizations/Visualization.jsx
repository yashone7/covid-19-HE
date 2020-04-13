import React, { Fragment, Component, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import ScatterPlot from "./ScatterPlot";

const Visualization = (props) => {
  const [showAllResults, setZero] = useState(true);

  const [showTestResultsMatchByNegativeGroupByHealthy, setOne] = useState(
    false
  );

  const [showTestResultsMatchByNegativeGroupByHighRisk, setTwo] = useState(
    false
  );

  const [showTestResultsMatchByPositiveGroupByNotHighRisk, setThree] = useState(
    false
  );

  const [showTestResultsMatchByPositiveGroupByHighRisk, setFour] = useState(
    false
  );

  const handleSetZero = () => {
    if (showAllResults) {
      setZero(false);
    } else setZero(true);
  };

  const handleSetOne = () => {
    if (!showTestResultsMatchByNegativeGroupByHealthy) {
      setOne(true);
    } else setOne(false);
  };

  const handleSetTwo = () => {
    if (!showTestResultsMatchByNegativeGroupByHighRisk) {
      setTwo(true);
    } else setTwo(false);
  };

  const handleSetThree = () => {
    if (!showTestResultsMatchByPositiveGroupByNotHighRisk) {
      setThree(true);
    } else setThree(false);
  };

  const handleSetFour = () => {
    if (!showTestResultsMatchByPositiveGroupByHighRisk) {
      setFour(true);
    } else setFour(false);
  };

  const { isAuthenticated } = props;
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <div className="flex w-screen h-screen">
        <div
          className="w-2/6 h-full p-1"
          style={{ backgroundColor: "#262626" }}
        >
          <div
            className="w-full h-auto p-2 rounded bg-gray-600 m-3"
            onClick={() => handleSetZero()}
          >
            Hide All Tests
          </div>
          <div
            className="w-full h-auto p-2 rounded bg-gray-600 m-3"
            onClick={() => handleSetOne()}
          >
            Get negative results of healthy people
          </div>
          <div
            className="w-full h-auto p-2 rounded bg-gray-600 m-3"
            onClick={() => handleSetTwo()}
          >
            Get negative results with high risk health conditions
          </div>
          <div
            className="w-full h-auto p-2 rounded bg-gray-600 m-3"
            onClick={() => handleSetThree()}
          >
            Get positive results with high risk health conditions
          </div>
          <div
            className="w-full h-auto p-2 rounded bg-gray-600 m-3"
            onClick={() => handleSetFour()}
          >
            Get positive results with not high risk health conditions
          </div>
        </div>
        <div className="w-full h-full">
          <ScatterPlot
            showZero={showAllResults}
            showOne={showTestResultsMatchByNegativeGroupByHealthy}
            showTwo={showTestResultsMatchByNegativeGroupByHighRisk}
            showThree={showTestResultsMatchByPositiveGroupByNotHighRisk}
            showFour={showTestResultsMatchByPositiveGroupByHighRisk}
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(Visualization);
