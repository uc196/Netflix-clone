// src/pages/Login/Login.jsx

import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { serverTimestamp } from 'firebase/firestore';

const Login = () => {

  const [signState, setSignState] = useState("sign in");
  const [name, setName] = useState("");       // For sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signState === "sign up") {
      if (!name) return alert("Please enter your name.");
      await signup(name, email, password);
          setSignState("sign in");
    } else {
      await login(email, password);
    }
    setLoading(false)
  };

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} alt="Netflix Logo" className='login-logo' />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "sign up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "sign in" ? (
            <p>
              First time on Netflix?{' '}
              <span onClick={() => setSignState("sign up")}>Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setSignState("sign in")}>Sign In Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
