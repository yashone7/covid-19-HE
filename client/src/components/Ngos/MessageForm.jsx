import React, { Fragment, useState, useRef } from "react";
import { connect } from "react-redux";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import ResizeDetector from "react-resize-detector";
import { FaMapMarkerAlt } from "react-icons/fa";
import { postFeed } from "../../redux/actions/feedAction";

const MessageForm = ({ match, postFeed }) => {
  const [marker, setMarker] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
  });

  const { latitude, longitude } = marker;
  const [formData, setFormData] = useState({
    name: "",
    id: match.params.id,
    message: "",
    address: "",
    phone: "",
    latitude: latitude,
    longitude: longitude,
  });

  const { name, id, message, address, phone } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const myMap = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
    zoom: 8,
    width: "400px" || myMap.current.clientWidth,
    height: "400px" || myMap.current.clientHeight,
  });

  const handleResize = () => {
    myMap.current &&
      setViewport({
        ...viewport,
        height: myMap.current.clientHeight,
        width: myMap.current.clientWidth,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postFeed({ name, phone, address, latitude, longitude, id, message });
    window.scrollTo(0, 0);
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
      <h1 className="text-xl p-2 m-2">
        Please enter a message to publish in the feed
      </h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="m-1 p-2 sm:w-full lg:w-2/5">
            <div className="field">
              <div className="control">
                <label htmlFor="name">
                  Name of the organisation
                  <input
                    type="text"
                    className="input"
                    value={name}
                    name="name"
                    id="name"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label htmlFor="address">
                  Address
                  <input
                    type="text"
                    className="input"
                    value={address}
                    name="address"
                    id="address"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label htmlFor="phone">
                  phone
                  <input
                    type="text"
                    className="input"
                    value={phone}
                    pattern="[0-9]*"
                    minLength={10}
                    name="phone"
                    id="phone"
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label htmlFor="message">
                  message
                  <textarea
                    name="message"
                    id="message"
                    cols="10"
                    className="textarea"
                    value={message}
                    onChange={(e) => handleChange(e)}
                    rows="10"
                    required
                  ></textarea>
                </label>
              </div>
            </div>
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
            <button type="submit" className="button is-primary m-2">
              Add message
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alterReducer,
});

export default connect(mapStateToProps, { postFeed })(MessageForm);
