import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useContext,useState} from 'react'
import { AuthContext } from "../../contexts/index";
import Alertmessage from "../Layout/Alertmessage";

export default function Register() {
  //Context
  const { registerUser } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword : ''
  });

  const [alert, setAlert] = useState(null);
  const { username, password,confirmPassword } = registerForm;

  const OnchangeRegisterForm = (e) =>
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });

  const register = async (e) => {
    e.preventDefault();
    if(password !==confirmPassword){
      setAlert({type:'danger',message:'Password do not match'})
      setTimeout(()=>setAlert(null),5000)
      return
    }
    
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success){
        setAlert({ type: "danger", message: registerData.message })
        setTimeout(()=>setAlert(null),5000)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit= {register} >
        <Alertmessage info = {alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value = {username}
            onChange= {OnchangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value = {password}
            onChange= {OnchangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value = {confirmPassword}
            onChange= {OnchangeRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have account ?
        <Link to="/Login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}
