import { combineReducers } from "redux";
import patientReducer from "./patientReducer";
import doctorReducer from "./doctorReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import feedReducer from "./feedReducer";
import testReducer from "./testReducer";

export default combineReducers({
  patientReducer,
  doctorReducer,
  alertReducer,
  feedReducer,
  authReducer,
  testReducer,
});
