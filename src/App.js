import React from 'react';
import Header from './MyComponents/Header';
import Home from './MyComponents/Home'
import About from './MyComponents/About'
import Intro from './MyComponents/Intro'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './MyComponents/Login';
import Signup from './MyComponents/Signup';


function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Header/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Intro/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
        </div>
      </Router>
</NoteState>
    </>
  );
}

export default App;
