import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Header=()=> {
    let navigate = useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem('token')
        navigate("/login")
    }
   
  
    return (
       
        <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{textAlign: "center", color: 'green'}} to="/home">E-Notebook</Link>
                    <i className="fa-solid fa-house" style={{color: "#ffffff"}} onClick={()=>{navigate('/')}}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
              </li>
                 </ul>
                {!localStorage.getItem('token')? <form className='d-flex'>  
                  <Link className='btn btn-success mx-2' to="/login" role="button" >Login</Link>
                  <Link className='btn btn-primary mx-2' to="/signup" role="button">Sign-up</Link>
                 </form>:<button onClick={handleLogOut} className='btn btn-danger'>Log Out</button>}
                 </div>
                </div>
            </nav>
        </>
    )
}

export default Header;
