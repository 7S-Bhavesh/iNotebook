import React, { useState } from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial=
    [
      {
        "_id": "6752e14f3607372bd98227bf",
        "user": "67518e982f659a9faea9b1a8",
        "title": "My Title2",
        "description": "Wake up Early2",
        "tag": "General2",
        "date": "2024-12-06T11:34:39.222Z",
        "__v": 0
      },
      {
        "_id": "6753dc24c41c12a828b760be",
        "user": "67518e982f659a9faea9b1a8",
        "title": "My Title4",
        "description": "Wake up Early3",
        "tag": "General2",
        "date": "2024-12-07T05:24:52.492Z",
        "__v": 0
      },
      {
        "_id": "6753dc2ec41c12a828b760c0",
        "user": "67518e982f659a9faea9b1a8",
        "title": "My Title5",
        "description": "Wake up Early3",
        "tag": "General2",
        "date": "2024-12-07T05:25:02.386Z",
        "__v": 0
      },
      {
        "_id": "6753dc6ac41c12a828b760c7",
        "user": "67518e982f659a9faea9b1a8",
        "title": "My Title6",
        "description": "Wake up Early3",
        "tag": "General2",
        "date": "2024-12-07T05:26:02.486Z",
        "__v": 0
      }
    ]
    const getNote=async ()=>{
      //Api CALL
      let url=`${host}/api/notes/fetchallnotes`
      const response=await fetch(url,{
        method: "GET",
        headers: {
          "auth-token":localStorage.getItem('token')
        },
  
      })
     const json=await response.json()
   setNotes(json)
    }

  const [notes,setNotes]=useState(notesInitial)
  const addNote=async (title,description,tag)=>{
    //Api CALL
    let url=`${host}/api/notes/add`
    const response=await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title,description,tag }),

    })
    const note=await response.json()
    console.log('Adding a new Note')
    setNotes(notes.concat(note))
  }

  const DeleteNote=async(id)=>{
    //API CALL
    let url=`${host}/api/notes/delete/${id}`
    const response=await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
    })
    const json=await response.json()
    console.log(json)

    console.log("deleted note with id:",id)
    const newNote=notes.filter((note)=>{return note._id!==id})
    setNotes(newNote)
  }

  const updateNote=async (id,title,description,tag)=>{
    //API CALL
    let url=`${host}/api/notes/update/${id}`
    const response=await fetch(url,{
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title,description,tag }),

    })
    const json= await response.json()
    console.log(json)

    let newNOTES=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNOTES.length; index++) {
      const element = newNOTES[index];
      if(element._id==id){
        newNOTES[index].title=title
        newNOTES[index].description=description
        newNOTES[index].tag=tag
        break;
      }  
    }
    setNotes(newNOTES)
  }
  return (
    <noteContext.Provider value={{notes,addNote,DeleteNote,updateNote,getNote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState
