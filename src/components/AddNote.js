import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

const AddNote = (props) => {
    const context=useContext(noteContext)
      const {notes,addNote}=context
      const [note,setNote]=useState({title:"" ,description:"",tag:""})

      const handleClick=(e)=>{
        e.preventDefault()
        setNote({title:"" ,description:"",tag:""})
        addNote(note.title,note.description,note.tag)
        props.showAlert("Note Added Successfully","success")
      }
      const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }
    return (
        <>
            <h2>Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" onChange={onChange} required minLength={5} name='title' value={note.title}aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' required  minLength={5} value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<5} onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
        </>
    )
}

export default AddNote
