import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";

// import styles from './Login.module.css';

const Login = ({ token, setToken, user, setUser, setLogged, userId, setUserId }) => {
  const [formData, setFormData] = useState({
  
    username: "",
    password: "",  
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );

      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('username',response.data.username)

      setUser(response.data.username);
      console.log("token is " + token + " u -" + user);
      setLogged(true);
      setUserId(response.data.id)
      console.log(response.data)

      navigate("/home");


    } catch (err) {
      setMessage("Wrong credentials !");
      document.getElementById("alert").style.display = "block";
      console.log(err);
    }
  };

  

  return (
    <>
       
<center>
        <div className="login-container">
    <div className="title">Login</div>
    <div className="content">
      <form action="#" onSubmit={handleSubmit}>
        <div className="user-details">
        
          <div className="input-box">
            <span className="details">Username</span>
            <input name ="username" type="text" placeholder="Username" id="username" value={formData.username} onChange={handleInputChange} required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input name ="password" type="password" placeholder="Password" id="password" value={formData.password} onChange={handleInputChange} required/>
          </div>

        </div>


        <div className="button">
          <input type="submit" value="Login"/>
        </div>
        <Link to="/register">Register?</Link>
        <Link to="/forgot" >Forgot Password</Link>
      </form>
    </div>
  </div>



</center>

        
    </>
  );
};

export default Login;
