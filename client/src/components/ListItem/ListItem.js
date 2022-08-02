import React, { useState, useEffect } from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const ListItem = ({ index, item }) => {
  // console.log(item); // return (movie : id)

  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTYwMTBiZjg2ZmFlZGU0YjExMTRjZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQxMjc2MSwiZXhwIjoxNjYwMDE3NTYxfQ.ngCkNGvciUM5UbUbqg1tvGnlOqH2ZGk82G1sZy8jRpM",
          },
        });

        // console.log(res);
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [item]);

  // const trailer =
  //   "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      >
        <img src={movie?.imgSm} alt={movie?.title} />

        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />

                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie?.title}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">{movie?.desc}</div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
