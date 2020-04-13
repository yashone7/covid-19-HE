import {
  CREATE_PATIENT,
  CREATE_PATIENT_ERROR,
} from "../actions/types/actionTypes";

const initialState = {
  patient: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PATIENT:
      return {
        ...state,
        patient: payload,
        loading: false,
      };
    case CREATE_PATIENT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
