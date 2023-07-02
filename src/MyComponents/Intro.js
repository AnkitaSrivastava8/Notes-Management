import React from 'react'
import img from '../images/icons8-notes-50.png'

const Intro = () => {
  return (
    <div className='container my-5 text-white'style={{height:"100vh"}} >
      <div style={{width:"70%",height:"70vh", backgroundColor: "black", borderRadius:"5%", margin:"25px 158px", boxShadow:"2px 3px 2px green"}}>
        <h1 style={{textAlign: "center", color: 'green',height: "30%"}}>Welcome to E-Notebook</h1>
        <div style={{height:"40%", textAlign:"center"}}>
        <img src={img} alt="no" style={{height:"15vh"}}/>
        </div>
        <div style={{height:"60%", textAlign:"center"}}>
        <h4>"We understand your privacy and emotions..save your notes without worrying"</h4>
        </div>
      </div>
  </div>
  )
}

export default Intro
