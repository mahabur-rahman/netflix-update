import React, { useState, useEffect } from "react";
// style
import "./home.scss";
import axios from "axios";
import Toolbar from "../../components/Toolbar/Toolbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";

// http://localhost:4000/api/lists?type=movies&genre=comedy

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTYwMTBiZjg2ZmFlZGU0YjExMTRjZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTQxMjc2MSwiZXhwIjoxNjYwMDE3NTYxfQ.ngCkNGvciUM5UbUbqg1tvGnlOqH2ZGk82G1sZy8jRpM`,
            },
          }
        );
        // console.log(res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Toolbar />
      <Featured type={type} />
      {lists?.map((list) => (
        <List key={Math.random()} list={list} />
      ))}
    </div>
  );
};

export default Home;
