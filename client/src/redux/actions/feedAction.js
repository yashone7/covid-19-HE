import {
  // LISTEN_FOR_FEED_DATA,
  //LISTEN_FOR_FEED_DATA_ERROR,
  POST_FEED,
  POST_FEED_ERROR,
  GET_FEEDS_ERROR,
  GET_FEEDS,
} from "./types/actionTypes";
import axios from "axios";
import { apiEndpoint } from "../../utils/apiEndpoint";
import { setAlert } from "./alertAction";
import _ from "lodash";

export const postFeed = ({
  name,
  phone,
  id,
  address,
  latitude,
  longitude,
  message,
}) => async (dispatch) => {
  let location = {};
  let coordinates = [];

  coordinates.push(longitude, latitude);
  _.assign(location, {
    type: "Point",
    coordinates: coordinates,
  });

  const body = JSON.stringify({ name, phone, id, address, location, message });
  try {
    const res = await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      url: `${apiEndpoint}/api/feeds`,
      data: body,
    });
    dispatch({
      type: POST_FEED,
      payload: res.data,
    });
    dispatch(setAlert("message posted successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      for (let error of errors) {
        dispatch(setAlert(error.msg, "danger"));
      }
    }
    dispatch({ type: POST_FEED_ERROR });
  }
};

export const getFeeds = () => async (dispatch) => {
  try {
    const res = await axios.get(`${apiEndpoint}/api/feeds`);
    dispatch({ type: GET_FEEDS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      for (let error of errors) {
        dispatch(setAlert(error.msg, "danger"));
      }
    }
    dispatch({ type: GET_FEEDS_ERROR });
  }
};

// export const listenForFeeds = () => async (dispatch) => {
//   const pusher = new Pusher("3e31d7db63495173c9c6", {
//     cluster: "ap2",
//     forceTLS: true,
//   });

//   Pusher.logToConsole = true;
//   const channel = pusher.subscribe("covid-feed");
//   channel.bind("feed", function (data) {
//     console.log(data);
//     dispatch({ type: LISTEN_FOR_FEED_DATA, payload: data });
//   });
// };
