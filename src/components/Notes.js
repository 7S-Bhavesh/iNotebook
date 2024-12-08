import React from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useRef,useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const navigate=useNavigate()
  const context = useContext(noteContext)
  const { notes ,getNote,updateNote} = context
  const [note,setNote]=useState({id:"",etitle:"" ,edescription:"",etag:""})

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const handleClick=(e)=>{
    e.preventDefault()
    updateNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
    props.showAlert("Note Updated Successfully","success")
    
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  const ref=useRef(null)
  const refClose=useRef(null)
  const updatenote = (currentNote) => {
      ref.current.click()
      setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} onChange={onChange} required minLength={5} name='etitle' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" value={note.edescription}  minLength={5} required name='edescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                </div>
                
            </form>
      </div>
      <div className="modal-footer">
      <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className='row container my-3'>
        <h2>Your Notes</h2>
        {notes.length===0 && <div className='container'>No notes to display</div> }
        {
          notes.map((note) => {
            return <NoteItem key={note._id} showAlert={props.showAlert} updatenote={updatenote} note={note} />
          })
        }
      </div>
    </>
  )
}

export default Notes
