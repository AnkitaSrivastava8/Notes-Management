import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const mystyle={
    width: '400px',
    height: '60vh'
  }

  const [credentials, setCredentials] = useState({ name: "", email: "", password: ""})
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0Zjk0NTg0ZTkxNDBlYTRmM2QyMTg0In0sImlhdCI6MTY4MjkzNzAwOH0.PJWBpEzf_uujcsboV63v1EfNwp5DXfxdCCNMVSqTUS4'
      },
      body: JSON.stringify({ name: credentials.name,email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //save authtoken and redirect
      localStorage.setItem('token', json.authtoken)
      navigate("/login")

    }
    else {
      alert("Invalid Credentials")
    }
  }

  const onChangeIt = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container text-white' style={mystyle}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' id="name" onChange={onChangeIt} />
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChangeIt} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChangeIt} />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChangeIt} />
        </div> */}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  )
}

export default Signup
