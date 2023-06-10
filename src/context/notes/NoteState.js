import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)
//get all notes
const getNotes = async () => {
  const url = `${host}/api/notes/fetchnotes`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    }
  });
  const json = await response.json()
 // console.log(json)
 setNotes(json)
}


  //to add note
  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addnotes`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()
    console.log(json)
    const note = [{
      "_id": "644fe095f4a5b822d767cbf103",
      "user": "644fe029f45b8ed767cbf0ff",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-01T15:53:57.357Z",
      "__v": 0
    }]

    setNotes(notes.concat(note))
  }

  //to delete a Note
  const delNote = async (id) => {

    const url = `${host}/api/notes/delnote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json)
    const newNote = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNote)
  }

  //to edit a Note
  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/update/${id}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    console.log(json)

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag
      }
    }

  }


  return (
    < NoteContext.Provider value={{ notes, addNote, delNote, editNote, getNotes}}>

      {props.children}

    </ NoteContext.Provider>

  )
}

export default NoteState;