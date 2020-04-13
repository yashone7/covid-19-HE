import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createPatient } from "../../redux/actions/patientAction";
import { v4 as uuidv4 } from "uuid";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import ResizeDetector from "react-resize-detector";
import { FaMapMarkerAlt } from "react-icons/fa";

const CreatePatient = ({ createPatient }) => {
  const [marker, setMarker] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
  });

  const { latitude, longitude } = marker;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    uniqueID: "",
    email: "",
    phone: "",
    address: "",
    latitude: latitude,
    longitude: longitude,
    isDiabetic: false,
    isAsthmatic: false,
    isHighRisk: false,
    hasHighBloodPressure: false,
    remarks: "",
    occupation: "",
    category: "",
  });

  const myMap2 = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: 83.32147657871246,
    latitude: 17.71590375180617,
    zoom: 8,
    width: "400px" || myMap2.current.clientWidth,
    height: "400px" || myMap2.current.clientHeight,
  });

  const handleResize = () => {
    myMap2.current &&
      setViewport({
        ...viewport,
        height: myMap2.current.clientHeight,
        width: myMap2.current.clientWidth,
      });
  };

  const {
    name,
    age,
    uniqueID,
    gender,
    email,
    phone,
    address,
    isAsthmatic,
    isDiabetic,
    hasHighBloodPressure,
    isHighRisk,
    occupation,
    category,
    remarks,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUUID = () => {
    const uuid = uuidv4();
    setFormData({ ...formData, uniqueID: uuid });
  };

  useEffect(() => {
    getUUID();
    // eslint-disable-next-line
  }, []);

  const handleCheckBox = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.checked });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    createPatient({
      name,
      age,
      gender,
      uniqueID,
      latitude,
      longitude,
      phone,
      email,
      address,
      isAsthmatic,
      isDiabetic,
      hasHighBloodPressure,
      isHighRisk,
      occupation,
      category,
      remarks,
    });
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
      <div className={`m-2`}>
        <div className={`m-1 sm:w-full lg:w-2/5`}>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="name">Name</label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="age">Age </label>
                <input
                  className="input"
                  type="text"
                  id="age"
                  name="age"
                  pattern="[0-9]*"
                  value={age}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="control m-2">
              <label className="radio mx-2" htmlFor="male">
                male
              </label>
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                className="mx-1"
                onChange={(e) => handleChange(e)}
              />
              <label className="radio mx-2" htmlFor="other">
                other
              </label>
              <input
                type="radio"
                name="gender"
                id="other"
                className="mx-1"
                onChange={(e) => handleChange(e)}
                value="other"
              />
              <label className="radio mx-2" htmlFor="female">
                female
              </label>
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                className="mx-1"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field my-1">
              <div className="control">
                <span>uniqueID of patient:</span>
                <p className="m-2 text-md"> {uniqueID} </p>
              </div>
            </div>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="text"
                  className="input"
                  pattern="[0-9]*"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => handleChange(e)}
                />
                <small>Optional</small>
              </div>
            </div>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
                <small>Optional</small>
              </div>
            </div>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="address">Address</label>
                <textarea
                  className="textarea"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => handleChange(e)}
                />
                <small>Recomended</small>
              </div>
            </div>
            <p className="my-2 mx-2">Enter medical history</p>
            <div className="field my-1">
              <div className="control">
                <label className="checkbox" htmlFor="isDiabetic">
                  <input
                    type="checkbox"
                    id="isDiabetic"
                    checked={isDiabetic}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  Is Diabetic
                </label>
              </div>
              <div className="control">
                <label htmlFor="isAsthmatic" className="checkbox">
                  <input
                    type="checkbox"
                    id="isAsthmatic"
                    checked={isAsthmatic}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  Is Asthmatic
                </label>
              </div>
              <div className="control">
                <label htmlFor="isHighRisk" className="checkbox">
                  <input
                    type="checkbox"
                    id="isHighRisk"
                    checked={isHighRisk}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  Is High Risk category
                </label>
              </div>
              <div className="control">
                <label htmlFor="hasHighBloodPressure" className="checkbox">
                  <input
                    type="checkbox"
                    id="hasHighBloodPressure"
                    checked={hasHighBloodPressure}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  Has high blood pressure
                </label>
              </div>
              <div className="control">
                <label htmlFor="remarks">remarks</label>
                <textarea
                  name="remarks"
                  value={remarks}
                  className="textarea"
                  id="remarks"
                  cols="10"
                  onChange={(e) => handleChange(e)}
                  rows="10"
                ></textarea>
              </div>
            </div>
            <p className="my-2 mx-2">Enter occupation details</p>
            <div className="field my-1">
              <div className="control">
                <label htmlFor="occupation">
                  Occupation
                  <input
                    type="text"
                    className="input"
                    id="occupation"
                    name="occupation"
                    value={occupation}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
            </div>
            <div className="field my-1">
              <label htmlFor="category" className="pt-1 mx-1">
                Please select a category
              </label>
              <div className="control">
                <div className="select my-2">
                  <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>daily wage worker</option>
                    <option>working class</option>
                    <option>student</option>
                    <option>middle class</option>
                    <option>other</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mx-1 p-1">
          <ResizeDetector handleWidth handleHeight onResize={handleResize}>
            <div className="sm:w-3/5 sm:h-3/5 lg:w-2/5 lg:h-2/5" ref={myMap2}>
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
            onClick={(e) => onSubmit(e)}
            className="button is-primary m-2"
          >
            Create patient
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { createPatient })(CreatePatient);

//uninstall socket.io
