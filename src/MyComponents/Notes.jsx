import noteContext from '../context/notes/noteContext'
import React, { useContext } from 'react'

const Notes = (props) => {
   const onClickIt=()=>{
    delNote(note._id)
   }
const onClickEdit=()=>{
  
}
  const context = useContext(noteContext)
  const {delNote} = context
  const {note} = props
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
        <div className="d-flex align-items-center">
        <h5 className='card-title'>{note.title}</h5>
        <i className="fa-solid fa-trash mx-2" onClick={onClickIt}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={onClickEdit}></i>
         </div>
       
       <p className='card-text'>{note.description}</p>
        </div>
       
      </div>
    </div>
  )
}

export default Notes
