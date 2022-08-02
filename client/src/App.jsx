// app.scss
import "./app.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

const App = () => {
  const user = true;

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* {user ? <Home /> : <Register />} */}
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>

          <Route exact path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
            <Home />
          </Route>

          <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>

          {user && (
            <>
              <Route path="/movies">
                <Home type="movies" />
              </Route>

              <Route path="/series">
                <Home type="series" />
              </Route>

              <Route path="/watch">
                <Watch />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
