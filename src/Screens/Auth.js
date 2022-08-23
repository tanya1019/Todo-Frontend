import { Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthWrapper from "../Components/AuthWrapper";

function Auth() {
  const [status, setStatus] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const changeStatus = (status) => {
    setStatus(status);
  };
  const signUp = async () => {
    await axios
      .post("https://todo-tanya.herokuapp.com/signup", {
        email: email,
        password: password,
        name: username,
      })
      .then((res) => {
        changeStatus("login");
        console.log("====", res);
      });
    // navigate("/dashboard");
  };
  const Login = async () => {
    const res = await axios.post("https://todo-tanya.herokuapp.com/login", {
      email: email,
      password: password,
    });
    //  console.log("====", res);
    if (res.status === 200) {
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("user", JSON.stringify(res?.data?.user));
      navigate("/dashboard");
      console.log(res.data);
    } else {
      console.log(res.data);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "red",
        height: "100vh",
        backgroundImage: "url(https://wallpaperaccess.com/full/1489353.jpg)",

        objectFit: "none",
      }}
    >
      {status === "login" ? (
        <AuthWrapper>
          <h1
            style={{
              //  color: "#24464F"
              color: "#C9B9AC",
            }}
          >
            Login
          </h1>

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            style={{
              width: "50%",
              height: 30,
              marginBottom: 10,
              outline: "none",
            }}
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            style={{
              width: "50%",
              height: 30,
              outline: "none",
            }}
          />
          <button
            onClick={() => {
              Login();
            }}
            style={{ width: "20%", height: 20, marginTop: 10 }}
          >
            Login
          </button>
          <div style={{ marginTop: 10 }}>
            <a style={{ marginRight: 10, color: "white" }}>
              Don't have an account ?
            </a>
            <button
              onClick={() => {
                changeStatus("signup");
              }}
            >
              SignUp
            </button>
          </div>
        </AuthWrapper>
      ) : (
        <AuthWrapper>
          <h1 style={{ color: "white" }}>SignUp</h1>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
            style={{
              width: "50%",
              height: 30,
              marginBottom: 10,
              outline: "none",
            }}
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            style={{
              width: "50%",
              height: 30,
              marginBottom: 10,
              outline: "none",
            }}
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            style={{ width: "50%", height: 30, outline: "none" }}
          />
          <button
            onClick={() => {
              signUp();
            }}
            style={{ width: "20%", height: 20, marginTop: 10 }}
          >
            SignUp
          </button>
          <div style={{ marginTop: 10 }}>
            <a style={{ marginRight: 10, color: "white" }}>
              Don't have an account ?
            </a>
            <button
              onClick={() => {
                changeStatus("login");
              }}
            >
              Login
            </button>
          </div>
        </AuthWrapper>
      )}
    </div>
  );
}

export default Auth;
