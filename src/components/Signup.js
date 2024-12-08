import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate=useNavigate()
  const [credientials,setCredientials]=useState({name:"",email:"",password:"",cpassword:""})


  const handleClick=async (e)=>{
    // const {name,email,password}=credientials
    e.preventDefault()
    let url="http://localhost:5000/api/auth/createUser"
const response=await fetch(url,{
  method: "POST",
  headers: {
    "Content-Type":"application/json",
  },
  body: JSON.stringify({name:credientials.name,email:credientials.email,password:credientials.password}),
})
const json= await response.json()
if(json.success){
    localStorage.setItem('token',json.authtoken)
    navigate('/')
    props.showAlert("Account Created Successfully","success")
}
else{
   props.showAlert("Invalid Credientials","danger")
}
}
const onChange=(e)=>{
  setCredientials({...credientials,[e.target.name]:e.target.value})
}

  return (
    <div className='container mt-3'>
      <h2>Create an account in the iNotebook</h2>
      <form onSubmit={handleClick}>
      <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' minLength={5}  required onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' minLength={5}  required onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" minLength={5} required  onChange={onChange} name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" minLength={5} required onChange={onChange} name='cpassword'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
