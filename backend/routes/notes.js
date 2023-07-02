const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const bodyparser = require('body-parser');
const encoder = bodyparser.urlencoded();
const { body, validationResult } = require('express-validator');

//get all the notes 
router.get('/fetchnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Notes.find({ user: req.user.id })
      res.json(notes)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
   }
})

// to add Notes
router.post('/addnotes', fetchuser, encoder, [
   body('title', 'Enter a valid title').isLength({ min: 1 }),
   body('description', 'Description must be atleast of 5 charcters').isLength({ min: 1 })
], async (req, res) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }
      const { title, description, tag } = req.body;

      const note = new Notes({
         title, description, tag, user: req.user.id
      })
      const savenote = await note.save();
         res.json(savenote)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
   }
})

//update an existing node
//for updation we use PUT request
router.put('/update/:id', fetchuser, encoder, async (req, res) => {
  const {title, description, tag} = req.body;
  const newNote = {}
  if(title){
    newNote.title = title
  }
  if(description){
   newNote.description = description
  }
  if(tag){
   newNote.tag = tag
  }

  let note = await Notes.findById(req.params.id)
  if(!note){
   return res.status(404).send("Not Found");
  }
  if(note.user.toString() !== req.user.id){
   return res.send(401).send("Not Allowed")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
  res.json(note)
})


//Delete an existing note

router.delete('/delnote/:id', fetchuser, encoder, async (req, res) => {
  //const {title, description, tag} = req.body;
  try {
   
   let note = await Notes.findById(req.params.id)
   if(!note){
    return res.status(404).send("Not Found");
   }
   if(note.user.toString() !== req.user.id){
    return res.send(401).send("Not Allowed")
   }
 
   note = await Notes.findByIdAndDelete(req.params.id)
   res.json({"Success" : "Note has been deleted"})
  } catch (error) {
   console.error(error.message);
      res.status(500).send("Internal server error")
  }
})





module.exports = router