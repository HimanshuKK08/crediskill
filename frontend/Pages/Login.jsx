import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
	const navigate = useNavigate();
  const handleSubmit = async (e) => {
	e.preventDefault();

	const res = await fetch("http://localhost:3000/login", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify({
		username: name,
		password,
	  }),
	  credentials: "include",
	});

	const data = await res.json();
	if(data.success) navigate('/dashboard')
  };

  return (
	<div className="wrapper signUp">
	  <div className="form">
		<div className="heading">Login to Your Account</div>

		<form onSubmit={handleSubmit}>
		{/* <form> */}
		  <div>
			<label>Name</label>
			<input
			  type="text"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			/>
		  </div>

		  <div>
			<label>Password</label>
			<input
			  type="password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
		  </div>

		  <button type="submit">Log In</button>
		</form>

		<p>
		  Don't Have an account? <Link to="/signup">Sign Up</Link>
		</p>
	  </div>
	</div>
  );
}

export default Signup;

