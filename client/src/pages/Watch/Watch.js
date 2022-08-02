import React from "react";
// style
import "./watch.scss";
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  // console.log(location);
  const movie = location.movie;

  console.log(movie);

  return (
    <div className="watch">
      <Link className="back" to="/" style={{ textDecoration: "none" }}>
        <ArrowBackOutlined />
        Home
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie?.video}
      />
    </div>
  );
};

export default Watch;
