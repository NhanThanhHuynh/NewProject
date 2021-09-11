import React from "react";
import { Spinner } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { Route, Redirect } from "react-router";
import Navbarmenu from "../Layout/Navbarmenu";

const Protectedroutes = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthticated },
  } = useContext(AuthContext);
  if (authLoading) {
    return (
      <>
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" variant="info" />
        </div>
      </>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthticated ? (
          <>
            <Navbarmenu />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/Login" />
        )
      }
    />
  );
};

export default Protectedroutes;
