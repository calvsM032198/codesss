import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import User from "./Components/User";
import AddingOfViolators from "./Components/AddingOfViolators";
import Records from "./Components/Records";
import AddingOrdinance from "./Components/AddingOrdinance";
import Ordinances from "./Components/Ordinances";
import React, { useState } from "react";
import Login from "./Components/Login";
function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      <Router>
        {isLogged ? (
          <Login />
        ) : (
          <div className="app--container">
            <div className="header">
              {" "}
              <h3> Bacolor Ticketing Assistant </h3>{" "}
            </div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/users" component={User} />
              <Route path="/adding" component={AddingOfViolators} />
              <Route path="/records" component={Records} />
              <Route path="/addOrdinances" component={AddingOrdinance} />
              <Route path="/ordinances" component={Ordinances} />
            </Switch>
            <Footer />
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
const Home = () => {
  return <div className="home--container">Home</div>;
};
