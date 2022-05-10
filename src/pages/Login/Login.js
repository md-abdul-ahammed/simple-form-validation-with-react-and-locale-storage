import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getAllUser = JSON.parse(localStorage.getItem("users"));
    const isEmailExist = getAllUser.find(
      (user) => user.email === formData.email
    );

    console.log(isEmailExist);

    if (!isEmailExist || formData.password !== isEmailExist.password) {
      return setError("Email or password not Matched");
    }
    if (isEmailExist && formData.password === isEmailExist.password) {
      navigate(`/dashboard/${isEmailExist.email}`);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Your Email *</label>
          <input
            name="email"
            onChange={handleChange}
            type="text"
            placeholder="Email"
          />
        </div>

        <div>
          <label> Enter Your Password *</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>

        <div>
          new member? Please , <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
