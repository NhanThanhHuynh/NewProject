import React from "react";
import Login from "../Auth/LoginForm";
import Register from "../Auth/RegisterForm";
import { AuthContext } from "../../contexts/index";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Auth({ authRoute }) {
  const {
    authState: { authLoading, isAuthticated },
  } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = <div className="d-flex justify-content-center mt-2">
      <Spinner animation="border" variant="info" />
    </div>
  } else if (isAuthticated) return <Redirect to="/dashboard"/>;
  else
    {
      body = (
        <>
          Learnit
          {authRoute === "login" && <Login />}
          {authRoute === "register" && <Register />}
        </>
      )
    }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learnit</h1>
          <h4> Keep track what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
