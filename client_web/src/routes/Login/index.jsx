import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import BasicButton from "../../components/BasicButton";
import { setCredentials } from "../../redux/authSlice";
import "./index.css";
import { setAuthToken } from "../../api/setAuthToken";

const google = {
  title: "Google",
  name: "google",
  logo: "/services/google.png",
};

export default function Login() {
  const [signIn, setSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = searchParams.get("jwt");

    if (jwt) {
      localStorage.setItem("token", jwt);
      setAuthToken(jwt);
      navigate("/home");
    }

    if (token) {
      navigate("/home");
    }
    setErrMsg("");
  }, [user, pwd]);

  const handleErrorMessage = (msg) => {
    setErrMsg(msg);
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  };

  const handleLogin = () => {
    axios
      .post(`/auth/login?username=${user}&password=${pwd}`)
      .then((res) => {
        const userData = {
          user: user,
          token: res.data.token,
        };
        dispatch(setCredentials(userData));
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        setUser("");
        setPwd("");
        axios
          .get("/admin/users")
          .then((res) => {
            navigate("/admin");
          })
          .catch((err) => {
            navigate("/home");
          });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          handleErrorMessage("Username or password incorrect");
        } else {
          handleErrorMessage("Connection to server failed");
        }
        console.log(err);
      });
  };

  const handleRegister = () => {
    if (user === "" || pwd === "") {
      handleErrorMessage("Username or password incorrect");
      return;
    }
    axios
      .post(`/auth/register`, {
        username: user,
        password: pwd,
      })
      .then((res) => {
        setUser("");
        setPwd("");
        setSignIn(true);
        alert("Successfuly registered, please log in");
      })
      .catch((err) => {
        if (err.response.status === 405) {
          handleErrorMessage(err.response.data);
        } else {
          handleErrorMessage("Connection to server failed");
        }
        console.log(err);
      });
  };

  const connectWithGoogle = () => {
    window.location.href =
      "http://localhost:8080/auth/login/google?callback=http://localhost:8081/login";
  };

  const registerWithGoogle = () => {
    window.location.href =
      "http://localhost:8080/auth/register/google?callback=http://localhost:8081/login";
    setSignIn(true);
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <div className="login-container">
      <img className="login-area-logo" src="./logo.svg" alt="AREA" />
      <div className="login-buttons-container">
        <span
          className={"sign-button " + (signIn && "selected")}
          onClick={() => setSignIn(true)}
        >
          Sign in
          {signIn && <span className="line" />}
        </span>
        <span
          className={"sign-button " + (!signIn && "selected")}
          onClick={() => setSignIn(false)}
        >
          Register{!signIn && <span className="line" />}
        </span>
      </div>
      <span className="login-error-msg">{errMsg}</span>
      <div className="login-inputs-container">
        <input
          className="login-input"
          placeholder="Enter Email"
          id="username"
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
        />
        <input
          className="login-input password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          value={pwd}
          onChange={handlePwdInput}
          required
        />
        <span
          className="login-input-show-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </div>
      <BasicButton
        onClick={signIn ? handleLogin : handleRegister}
        title={signIn ? "Sign in" : "Register"}
        addClass="login"
      />
      <div className="login-oauth-container">
        <div className="login-oauth-divider-container">
          <hr className="login-oauth-divider-line" size="1" color="#000" />
          <span className="login-oauth-divider-text">or continue with</span>
          <hr className="login-oauth-divider-line" size="1" color="#000" />
        </div>
        <div
          className="login-oauth-buttons-container"
          onClick={signIn ? connectWithGoogle : registerWithGoogle}
        >
          <img
            className="login-oauth-button"
            src={google.logo}
            alt={google.name}
          />
        </div>
      </div>
      <a href="/client.apk" className="download-apk-container">
        <BasicButton title="Download APK" style={{ background: "black" }} />
      </a>
    </div>
  );
}
