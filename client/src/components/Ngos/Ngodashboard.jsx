import React, { Fragment, useEffect, useState } from "react";
import Pusher from "pusher-js";
import Navbar from "../common/Navbar";
import { connect } from "react-redux";
import { Redirect, Link, matchPath } from "react-router-dom";
import decoder from "jwt-decode";
import { getFeeds } from "../../redux/actions/feedAction";
import FeedsCard from "./FeedsCard";

const Ngodashboard = ({ isAuthenticated, token, feeds, getFeeds }) => {
  const [myFeeds, setMyFeeds] = useState(feeds);

  useEffect(() => {
    getFeeds();
  }, [getFeeds]);

  const object = token && decoder(token);

  useEffect(() => {
    let mount = true;
    let pushData = async () => {
      const pusher = new Pusher("1c411846fe7abef7b017", {
        cluster: "ap2",
        forceTLS: true,
      });
      // Pusher.logToConsole = true;

      const channel = pusher.subscribe("covid-feed");
      channel.bind("feed", (data) => {
        if (mount) {
          console.log(data);
          data && setMyFeeds([...feeds, data]);
        }
      });
    };
    pushData();

    return () => {
      mount = false;
    };
  });

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (isAuthenticated) {
    if (object.user.role !== "ngo") {
      return <Redirect to="/login" />;
    }
  }

  const match =
    object &&
    matchPath(`/ngos/create-message/${object.user.id}`, {
      path: "/ngos/create-message/:id",
      exact: true,
      strict: false,
    });

  return (
    <Fragment>
      <Navbar />
      <div className="p-2 m-3">
        <Link
          to={{ pathname: `/ngos/create-message/${match.params.id}` }}
          className={`bg-transparent m-2 py-3 px-3 mt-3 rounded border hover:bg-pink-400 text-gray-800 hover:text-gray-200`}
        >
          fill a message
        </Link>
      </div>
      <div className="sm:w-full h-auto md:w-2/5 p-3 m-5 bg-green-100">
        <p> Latest Feeds Refresh once if no feeds </p>
        <FeedsCard body={myFeeds} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  token: state.authReducer.token,
  feeds: state.feedReducer.feeds,
});

export default connect(mapStateToProps, { getFeeds })(Ngodashboard);

/**
   useEffect(() => {
    let mount = true;
    let pushData = async () => {
      const pusher = new Pusher("1c411846fe7abef7b017", {
        cluster: "ap2",
        forceTLS: true,
      });
      Pusher.logToConsole = true;

      const channel = pusher.subscribe("covid-feed");
      channel.bind("feed", (data) => {
        if (mount) {
          console.log(data);
          data &&
            setMyFeeds({
              ...feeds,
               data,
            });
        }
      });
    };
    pushData();

    return () => {
      mount = false;
    };
  }, []);



 */
