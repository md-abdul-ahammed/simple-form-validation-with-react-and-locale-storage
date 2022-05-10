import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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
    // check all required filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.type ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please Input Required Filled");
    } else {
      setError("");
    }

    //check password is matched?
    if (formData.password !== formData.confirmPassword) {
      return setError("Password Didn't Matched, Try Again");
    } else {
      setError("");
    }

    if (localStorage.getItem("users")) {
      const users = JSON.parse(localStorage.getItem("users"));
      const isEmailExist = users.filter(
        (user) => user.email === formData.email
      );
      //check email id is it exist
      if (isEmailExist.length) {
        setError("This Email Id Already Exist");
        return;
      }
      const newUser = [...users, formData];
      localStorage.setItem("users", JSON.stringify(newUser));
    } else {
      const users = [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
    }
    navigate(`/dashboard/${formData.email}`);
  };

  return (
    <div>
      {error && <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label> Enter Your First Name *</label>
          <input
            name="firstName"
            onChange={handleChange}
            type="text"
            placeholder="First Name"
          />
        </div>
        <div>
          <label> Enter Your Last Name *</label>
          <input
            name="lastName"
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
          />
        </div>
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
          <label>Enter Type *</label>
          <select name="type" defaultValue={"Type"} onChange={handleChange}>
            <option value="Type" disabled>
              Type
            </option>
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
        <div>
          <label> Enter Your Phone No *</label>
          <input
            name="phone"
            onChange={handleChange}
            type="text"
            placeholder="Phone No"
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
          <label> Confirm Password *</label>
          <input
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        already registered? Please, <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
