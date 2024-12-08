const express = require('express')
const Note = require('../models/noteSchema')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const router = express.Router()


//Route 1:fetch all notes login required:Get Request
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.json(notes)
   } catch (error) {
      console.error("Some intrnal eroor occured")
   }

})


//Route 2:Add a note Post:
router.post('/add', fetchuser, [
   body('title', 'Please eneter a valid title').isLength({ min: 3 }),
   body('description', 'Please enter valid description').isLength({ min: 3 }),
], async (req, res) => {
   const { title, description, tag } = req.body
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
   }

   const note = new Note({
      user: req.user.id, title, description, tag
   })
   console.log(note)
   const savedNote = await note.save()
   res.json(savedNote)
})

//Route 3:Updating  a note Put:
router.put('/update/:id', fetchuser, async (req, res) => {
   const { title, description, tag } = req.body
   let newNote = {}
   if (title) { newNote.title = title }
   if (description) { newNote.description = description }
   if (tag) { newNote.tag = tag }

   let note = await Note.findById(req.params.id)
   if (!note) { return res.status(401).send('Not Found') }
   if (note.user.toString()!== req.user.id) {
      return res.status(401).send( "Not allowed")
   }
   note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
   // console.log(note)
   res.json({note})
})

//Route 4:deleting  a note Delete:Login required
router.delete('/delete/:id',fetchuser,async(req,res)=>{
   let note=await Note.findById(req.params.id)
   if(!note){return res.status(401).send("Not Found")}

   if(note.user.toString()!==req.user.id){
     return res.status(401).send("Not allowed")
   }
   note=await Note.findByIdAndDelete(req.params.id)
   res.json({"Success":"Succesfully deleted a note",note:note})

})
module.exports = router;
