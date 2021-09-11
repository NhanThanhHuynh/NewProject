import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/index";
import Alertmessage from "../Layout/Alertmessage";

export default function Login() {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Use history
  const history = useHistory();

  const [loginForm, setloginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);
  const { username, password } = loginForm;

  const OnchangeLogin = (e) =>
    setloginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        // history.push('/dashboard')
      } else {
        setAlert({ type: "danger", message: loginData.message })
        setTimeout(()=>setAlert(null),5000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <Alertmessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={OnchangeLogin}
          />
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={OnchangeLogin}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Dont have account ?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}
