import noteContext from '../context/notes/noteContext'
import React, { useContext, useState } from 'react'
import NotesItem from './NotesItem'
import './MyStyle.css'


const Home = () => {
  const [note, setNote] = useState({title:"", description:"", tag: "default"})
  const handleOnClick=(e)=>{
    e.preventDefault()
   addNote(note.title, note.description, note.tag)
  }
  const onChangeit=(e)=>{
     setNote({...note, [e.target.name]: e.target.value})
  }
  const context = useContext(noteContext)
  const {addNote} = context
  
  return (
    <>
    <div className="container text-white my-3" style={{backgroundColor:"rgb(41, 39, 39)"}}>
      <h2>Add Notes</h2>
   <form >
  <div className="mb-3">
    <label htmlFor="title" className="form-label ">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChangeit}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChangeit}/>
  </div>
 
  <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
</form>
<div className="my-3">
<NotesItem/>
</div>
</div>


  </>
  )
}

export default Home;
