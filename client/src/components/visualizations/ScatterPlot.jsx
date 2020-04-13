import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllTestResults,
  getTestResultsMatchByNegativeGroupByHealthy,
  getTestResultsMatchByNegativeGroupByHighRisk,
  getTestResultsMatchByNegativeGroupByNone,
  getTestResultsMatchByNegativeOrderByDate,
  getTestResultsMatchByPositiveGroupByHighRisk,
  getTestResultsMatchByPositiveGroupByNone,
  getTestResultsMatchByPositiveGroupByNotHighRisk,
  getTestResultsMatchByPositiveOrderByDate,
  getTestResultsOrderedByDate,
} from "../../redux/actions/testAction";
import { StaticMap } from "react-map-gl";
import DeckGL, { ScatterplotLayer } from "deck.gl";

const ScatterPlot = (props) => {
  const {
    AllTestResults,
    TestResultsOrderedByDate,
    TestResultsMatchByPositiveGroupByHighRisk,
    TestResultsMatchByPositiveGroupByNotHighRisk,
    TestResultsMatchByPositiveGroupByNone,
    TestresultsMatchByPositiveOrderByDate,
    TestResultsMatchByNegativeGroupByHealthy,
    TestResultsMatchByNegativeGroupByHighRisk,
    TestResultsMatchByNegativeGroupByNone,
    TestresultsMatchByNegativeOrderByDate,
    getAllTestResults,
    getTestResultsMatchByNegativeGroupByHealthy,
    getTestResultsMatchByNegativeGroupByHighRisk,
    getTestResultsMatchByNegativeGroupByNone,
    getTestResultsMatchByNegativeOrderByDate,
    getTestResultsMatchByPositiveGroupByHighRisk,
    getTestResultsMatchByPositiveGroupByNone,
    getTestResultsMatchByPositiveGroupByNotHighRisk,
    getTestResultsMatchByPositiveOrderByDate,
    getTestResultsOrderedByDate,
    showZero,
    showOne,
    showTwo,
    showThree,
    showFour,
  } = props;

  useEffect(() => {
    getAllTestResults();
  }, []);

  useEffect(() => {
    getTestResultsMatchByNegativeGroupByHealthy();
  }, []);

  useEffect(() => {
    getTestResultsMatchByNegativeGroupByHighRisk();
  }, []);

  useEffect(() => {
    getTestResultsMatchByPositiveGroupByHighRisk();
  }, []);

  useEffect(() => {
    getTestResultsMatchByPositiveGroupByNotHighRisk();
  }, []);

  const INITIAL_VIEW_STATE = {
    longitude: 83.30224514007568,
    latitude: 17.718254346301336,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  };

  const [tooltip, setTooltip] = useState({
    name: "",
    status: "",
    x: 0,
    y: 0,
  });
  const { name, status, x, y } = tooltip;

  const data1 = AllTestResults;
  const data2 = TestResultsMatchByNegativeGroupByHealthy;
  const data3 = TestResultsMatchByNegativeGroupByHighRisk;
  const data4 = TestResultsMatchByPositiveGroupByNotHighRisk;
  const data5 = TestResultsMatchByPositiveGroupByHighRisk;

  const style = {
    width: "inherit",
    height: "inherit",
    position: "relative",
  };

  const scatterPlot_1 =
    showZero &&
    data1 &&
    new ScatterplotLayer({
      id: "all_category_results",
      data: data1,
      getPosition: (d) => d.location.coordinates,
      getFillColor: (d) => {
        if (d.status === "negative") {
          return [123, 240, 78];
        }
        if (d.status === "pending") {
          return [240, 230, 75];
        } else return [240, 80, 80];
      },
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      pickable: true,
      onHover: (info, event) => {
        console.log(info);
        info.object &&
          setTooltip({
            ...tooltip,
            name: info.object.name || null,
            status: info.object.status || null,
            x: info.lngLat[1],
            y: info.lngLat[0],
          });
      },
    });

  const scatterPlot_2 =
    showOne &&
    data2 &&
    new ScatterplotLayer({
      id: "neg-grp-healthy",
      data: data2,
      getPosition: (d) => d.location.coordinates,
      getFillColor: [123, 240, 78],
      pickable: true,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      onHover: (info, event) => {
        console.log(info);
        info.object &&
          setTooltip({
            ...tooltip,
            name: info.object.name || null,
            status: info.object.status || null,
            x: info.lngLat[1],
            y: info.lngLat[0],
          });
      },
    });

  const scatterPlot_3 =
    showTwo &&
    data3 &&
    new ScatterplotLayer({
      id: "neg-high-risk",
      data: data3,
      getPosition: (d) => d.location.coordinates,
      getFillColor: [78, 229, 240],
      pickable: true,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      onHover: (info, event) => {
        console.log(info);
        info.object &&
          setTooltip({
            ...tooltip,
            name: info.object.name || null,
            status: info.object.status || null,
            x: info.lngLat[1],
            y: info.lngLat[0],
          });
      },
    });

  const scatterplot_4 =
    showThree &&
    data4 &&
    new ScatterplotLayer({
      id: "positive-not-high-risk",
      data: data4,
      getPosition: (d) => d.location.coordinates,
      pickable: true,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      getFillColor: [220, 220, 80],
      onHover: (info, event) => {
        console.log(info);
        info.object &&
          setTooltip({
            ...tooltip,
            name: info.object.name || null,
            status: info.object.status || null,
            x: info.lngLat[1],
            y: info.lngLat[0],
          });
      },
    });

  const scatterplot_5 =
    showFour &&
    data5 &&
    new ScatterplotLayer({
      id: "positive-high-risk",
      data: data5,
      getPosition: (d) => d.location.coordinates,
      pickable: true,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      getFillColor: [255, 160, 45],
      onHover: (info, event) => {
        console.log(info);
        info.object &&
          setTooltip({
            ...tooltip,
            name: info.object.name || null,
            status: info.object.status || null,
            x: info.lngLat[1],
            y: info.lngLat[0],
          });
      },
    });

  const layers = [
    scatterPlot_1,
    scatterPlot_2,
    scatterPlot_3,
    scatterplot_4,
    scatterplot_5,
  ];

  const renderTooltip = (name, status, x, y) => {
    return (
      <div className="bg-black opacity-50 w-auto inline-block h-auto p-2">
        <div className="text-white text-sm m-1">Name: {name || ""}</div>
        <div className="text-white text-sm m-1">status {status || ""}</div>
        <div className="text-white text-sm m-1">lat {x || ""}</div>
        <div className="text-white text-sm m-1">long {y || ""}</div>
      </div>
    );
  };

  const mapStyle = "mapbox://styles/yashone7/ck7niwrj318o41ip4jttx40km";

  return (
    <Fragment>
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        style={style}
      >
        <StaticMap
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
        {renderTooltip(name, status, x, y)}
      </DeckGL>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  AllTestResults: state.testReducer.AllTestResults,
  TestResultsOrderedByDate: state.testReducer.TestResultsOrderedByDate,
  TestResultsMatchByPositiveGroupByHighRisk:
    state.testReducer.TestResultsMatchByPositiveGroupByHighRisk,
  TestResultsMatchByPositiveGroupByNotHighRisk:
    state.testReducer.TestResultsMatchByPositiveGroupByNotHighRisk,
  TestResultsMatchByPositiveGroupByNone:
    state.testReducer.TestResultsMatchByPositiveGroupByNone,
  TestresultsMatchByPositiveOrderByDate:
    state.testReducer.TestresultsMatchByPositiveOrderByDate,
  TestResultsMatchByNegativeGroupByHealthy:
    state.testReducer.TestResultsMatchByNegativeGroupByHealthy,
  TestResultsMatchByNegativeGroupByHighRisk:
    state.testReducer.TestResultsMatchByNegativeGroupByHighRisk,
  TestResultsMatchByNegativeGroupByNone:
    state.testReducer.TestResultsMatchByNegativeGroupByNone,
  TestresultsMatchByNegativeOrderByDate:
    state.testReducer.TestresultsMatchByNegativeOrderByDate,
});

export default connect(mapStateToProps, {
  getAllTestResults,
  getTestResultsMatchByNegativeGroupByHealthy,
  getTestResultsMatchByNegativeGroupByHighRisk,
  getTestResultsMatchByNegativeGroupByNone,
  getTestResultsMatchByNegativeOrderByDate,
  getTestResultsMatchByPositiveGroupByHighRisk,
  getTestResultsMatchByPositiveGroupByNone,
  getTestResultsMatchByPositiveGroupByNotHighRisk,
  getTestResultsMatchByPositiveOrderByDate,
  getTestResultsOrderedByDate,
})(ScatterPlot);
