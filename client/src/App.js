import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Alert from "./components/common/Alert";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import Landing from "./components/common/Landing";
import { loadUser } from "./redux/actions/authAction";
import Login from "./components/Doctors/Login";
import DoctorDashboard from "./components/Doctors/DoctorDashboard";
import "./style/style.css";
import Createpatient from "./components/Doctors/Createpatient";
import CreateTest from "./components/Doctors/CreateTest";
import Ngodashboard from "./components/Ngos/Ngodashboard";
import MessageForm from "./components/Ngos/MessageForm";
import FeedMessage from "./components/Ngos/FeedMessage";
import Visualization from "./components/visualizations/Visualization";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/doctor" component={DoctorDashboard} />
          <Route exact path="/ngos" component={Ngodashboard} />
          <Route exact path="/visualization" component={Visualization} />
          <Route
            exact
            path="/ngos/create-message/:id"
            component={MessageForm}
          />
          <Route exact path="/feeds/:id" component={FeedMessage} />
          <DoctorDashboard>
            <Route exact path="/create-patient" component={Createpatient} />
            <Route exact path="/conduct-test" component={CreateTest} />
          </DoctorDashboard>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

/**
 *   1. should add geocoding
 *   2. should add address field in patient model
 */
