import React, { Fragment, useState, useRef } from "react";
import { connect } from "react-redux";
import { conductTest } from "../../redux/actions/testAction";
import { formatISO } from "date-fns";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import ResizeDetector from "react-resize-detector";
import { FaMapMarkerAlt } from "react-icons/fa";

const CreateTest = ({ conductTest, user }) => {
  const [marker, setMarker] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
  });

  const { latitude, longitude } = marker;

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: user && user._id,
    status: "",
    test_date: formatISO(new Date()),
    latitude: latitude,
    longitude: longitude,
  });

  const myMap = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
    zoom: 8,
    width: "400px" || myMap.current.clientWidth,
    height: "400px" || myMap.current.clientHeight,
  });

  const { test_date, patient_id, status, doctor_id } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    conductTest({
      test_date,
      patient_id,
      status,
      doctor_id,
      latitude,
      longitude,
    });
    window.scrollTo(0, 0);
  };

  const handleResize = () => {
    myMap.current &&
      setViewport({
        ...viewport,
        height: myMap.current.clientHeight,
        width: myMap.current.clientWidth,
      });
  };

  const handleGeolocate = () => {
    const handleLocation = (pos) => {
      const crd = pos.coords;
      setFormData({
        ...formData,
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
      setMarker({
        ...marker,
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(handleLocation, null, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };

  const getCoordinates = (event) => {
    setMarker({
      ...marker,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setViewport({
      ...viewport,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
    setFormData({
      ...formData,
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  };

  return (
    <Fragment>
      <div className={`m-2 rounded shadow-sm `}>
        <div className="m-1 sm:w-full lg:w-2/5">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="my-1 mx-1">
              <span>Doctor ID</span> {user && user._id}
            </div>
            <div className="field">
              <div className="control">
                <label htmlFor="patientID" className="mx-2">
                  Patient ID
                </label>
                <input
                  type="text"
                  name="patient_id"
                  id="patientID"
                  className="input"
                  value={patient_id}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="control">
              <div className="control m-2">
                <span className="mr-1">Test Status</span>
                <label className="radio mx-1" htmlFor="positive">
                  positive
                </label>
                <input
                  type="radio"
                  name="status"
                  id="positive"
                  className="mx-1"
                  value="positive"
                  onChange={(e) => handleChange(e)}
                />
                <label className="radio mx-1" htmlFor="negative">
                  negative
                </label>
                <input
                  type="radio"
                  name="status"
                  id="negative"
                  className="mx-1"
                  onChange={(e) => handleChange(e)}
                  value="negative"
                />
                <label className="radio mx-1" htmlFor="pending">
                  pending
                </label>
                <input
                  type="radio"
                  name="status"
                  id="pending"
                  className="mx-1"
                  value="pending"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="mx-1 p-1">
          <ResizeDetector handleWidth handleHeight onResize={handleResize}>
            <div className="sm:w-3/5 sm:h-3/5 lg:w-2/5 lg:h-2/5" ref={myMap}>
              <ReactMapGL
                {...viewport}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              >
                <GeolocateControl
                  positionOptions={{ enableHighAccuracy: true }}
                  trackUserLocation={false}
                  showUserLocation={true}
                  onGeolocate={handleGeolocate}
                />
                <Marker
                  latitude={latitude}
                  longitude={longitude}
                  offsetLeft={0}
                  offsetTop={0}
                  draggable={true}
                  captureScroll={true}
                  captureDrag={true}
                  onViewportChange={(marker) => setViewport(marker)}
                  onDragEnd={(event) => getCoordinates(event)}
                >
                  <FaMapMarkerAlt color="black" />
                </Marker>
                <div className="block m-2 w-2/5 sm:w-3/5  bg-gray-800 opacity-50">
                  <span className="text-gray-100 text-sm">
                    Latitude: {latitude}
                  </span>
                  <br />
                  <span className="text-gray-100 text-sm">
                    Longitude: {longitude}
                  </span>
                </div>
              </ReactMapGL>
            </div>
          </ResizeDetector>
          <button
            onClick={(e) => handleSubmit(e)}
            className="button is-primary m-2"
          >
            Record test
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mpaStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mpaStateToProps, { conductTest })(CreateTest);
