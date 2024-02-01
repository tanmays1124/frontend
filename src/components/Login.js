import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import log from "../images/Log.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = ({ token, setToken, setUser, setLogged, setUserId }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.username);
      setUser(response.data.username);
      setLogged(true);
      setUserId(response.data.id);
      navigate("/home");
    } catch (err) {
      setErrorMessage("Invalid credentials!");
      console.log(err);
    }
  };

  return (
    <>
      <center>
        <div className="partition">
          <div
            className="partition-image"
            style={{ backgroundImage: `url(${log})` }}
          ></div>
          <div className="login-container">
            <div className="title">Login</div>
            <div className="content">
              {errorMessage && (
                <div id="alert" className="error-message">
                  {errorMessage}
                </div>
              )}
              <form action="#" onSubmit={handleSubmit}>
                <div className="user-details">
                  <div className="inputbox">
                    <span className="details">Username</span>
                    <input
                      name="username"
                      type="text"
                      placeholder="Username"
                      id="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="inputbox">
                    <span className="details">Password</span>
                    <div className="password-input-container">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      {/* <span
                        className="toggle-password"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="button" >
                  <input type="submit" value="Login" />
                </div>
                <Link to="/register">Register?</Link>
                <Link to="/forgot">Forgot Password</Link>
              </form>
            </div>
          </div>
        </div>
      </center>
    </>
  );
};

export default Login;
