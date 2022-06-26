import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    try {
      const result = await axios.get("/users");
      if ((await result).status == 200) {
        setUsers(result.data);
        alert("running db");
      }
    } catch (err) {
      alert(err);
    }
  }, []);
  console.log(users);
  return (
    <>
      <div className="login--container">
        <div className="form--container">
          <legend>MUNICIPALITY OF BACOLOR PAMPANGA</legend>
          <form>
            <label>
              First Name:<input type="text"></input>
            </label>
            <label>
              Last Name :<input type="text"></input>
            </label>
            <input type="submit" value="Login"></input>
            <Link className="link" path="#">
              Sign up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
