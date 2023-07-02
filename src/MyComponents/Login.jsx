import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const mystyle={
    backgroundColor: 'rgb(41, 39, 39)',
    width: '50%',
    height: '60%'
  }
   
    const[credentials, setCredentials] = useState({email: "", password:""})
    let navigate = useNavigate();

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const url = "http://localhost:5000/api/login"
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
     //'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({email: credentials.email,password: credentials.password})
  });
  const json = await response.json()
   console.log(json)
   if(json.success){
    //save authtoken and redirect
    localStorage.setItem('token', json.authtoken)
    navigate("/home")
   
   }
   else {
    alert("Invalid Credentials")
   }
    }

    const onChangeit=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
     }
  return (
    <div className='container' style={mystyle} >
     <form  onSubmit={handleSubmit}>
  <div className="mb-3 my-5 text-white ">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={onChangeit}/>
    <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 text-white">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChangeit}/>
  </div>
  <button type="submit" className="btn btn-success" >Login</button>
</form>
<Link to='/signup' style={{textDecoration:"none", color:"blueviolet"}}>Don't have an account?</Link>

    </div>
  )
}

export default Login
