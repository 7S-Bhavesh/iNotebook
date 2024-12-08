import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'

const NoteItem = (props) => {
  const { note,updatenote } = props
  const context = useContext(noteContext)
  const { DeleteNote } = context

  return (
    <div className='col-md-3'>
      <div className="card">
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 className="card-title">{note.title} </h5>
            <i className="fa-solid fa-trash mx-2" onClick={() => { DeleteNote(note._id); props.showAlert("Note Deleted Successfully","success") }}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}} ></i>
          </div>
          <p className="card-text">{note.description}</p>

        </div>
      </div>
    </div>
  )
}

export default NoteItem
