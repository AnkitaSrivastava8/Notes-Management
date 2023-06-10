import noteContext from '../context/notes/noteContext'
import React, { useContext, useEffect } from 'react'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'

const NotesItem = () => {
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const {notes, getNotes} = context
   
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        navigate("/login")
      }
      
    })
  return (
    <div className='row my-3'>
        <h2>Your Notes</h2>
       {notes.map((note)=>{
         return <Notes key = {note._id} note={note}/>
       })}
      
    </div>
  )
}

export default NotesItem
