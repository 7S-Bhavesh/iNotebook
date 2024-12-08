import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    let navigate=useNavigate()
    const [credientials,setCredientials]=useState({email:"",password:""})
    const onChange=(e)=>{
        setCredientials({...credientials,[e.target.name]:e.target.value})
    }
    const handleClick=async (e)=>{
        e.preventDefault()
        let url="http://localhost:5000/api/auth/login"
    const response=await fetch(url,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email:credientials.email,password:credientials.password}),

    })
    const json= await response.json()
    if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate('/')
        props.showAlert("Logged in  Successfully","success")
    }
    else{
       props.showAlert("Invalid Credientials","danger")
    }
    }
    return (
        <div className='mt-3'>
            <h2>Login to the iNotebook</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credientials.email} onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credientials.password} onChange={onChange} name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
