import {
  LISTEN_FOR_FEED_DATA,
  LISTEN_FOR_FEED_DATA_ERROR,
  POST_FEED,
  POST_FEED_ERROR,
  GET_FEEDS,
  GET_FEEDS_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  feeds: [],
  feed: null,
  incomingFeed: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LISTEN_FOR_FEED_DATA:
      return {
        ...state,
        incomingFeed: payload,
        loading: false,
      };
    case LISTEN_FOR_FEED_DATA_ERROR:
      return {
        ...state,
        loading: false,
      };
    case POST_FEED:
      return {
        ...state,
        feed: payload,
        loading: false,
      };
    case POST_FEED_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_FEEDS:
      return {
        ...state,
        feeds: payload,
        loading: false,
      };
    case GET_FEEDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
