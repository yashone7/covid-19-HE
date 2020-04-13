import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const FeedsCard = (props) => {
  const { body } = props;

  let newArr = [...body].reverse();

  console.log(newArr);

  return (
    <Fragment>
      {newArr &&
        newArr.map((b) => (
          <Link
            to={{ pathname: `/feeds/${b._id}`, state: b }}
            className="text-gray-800"
            key={b._id}
          >
            <div className="p-2 m-2 shadow-md shadow-rounded">
              <p className="text-sm my-2 mx-1">Name: {b.name}</p>
              <p className="text-sm my-2 mx-1">phone: {b.phone}</p>
              <p className="text-sm my-2 mx-1">message: {b.message}</p>
            </div>
          </Link>
        ))}
    </Fragment>
  );
};

export default FeedsCard;
