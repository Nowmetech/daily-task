import React, { useState } from 'react'
import '../../css/Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {

const nav = useNavigate()
const [isLoading, setIsLoading] = useState(false)

    const[data, setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })
    //get value from input
    const GetValue = (e) => {
     const {name, value} = e.target
     setData((prev)=>({
       ...prev,
       [name]: value
     }))
    //  console.log(data)
    }
  //Email & password validaton
//    const InvalidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email)
//    }    
//    const IsPasswordValid = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password) 
// }

    // submit the value
    const HandleSubmit = (e) =>{
      setIsLoading(true)
    e.preventDefault();
      const { firstName, lastName, email, password} = data
      console.log(data)

      if (firstName === "" && lastName === "" && email === "" && password ===""){
        alert("All field required ")
      }
    //   if(!InvalidEmail(email)){
    //    alert("Please input a valid email address.")
       
    //  }
    //  if(!IsPasswordValid(password)){
    //     alert("Allows only letters, digits, and the specified special characters")
    //  }
     
      
         axios.post('https://daily-task-api.onrender.com/user/signup', data)      
       .then((res)=>{
        setIsLoading(false)
            console.log(res)
            nav('/login')
        })
       .catch((error)=>{
          console.log("error")
          setIsLoading(false)
       })  
    //   console.log("click")
   
}
  return (
  <>
<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
        Lodding...
      </Backdrop>
<div className='main-3 '></div>
    
    <div className='sub sub-1'>
     
   <div className='modal-container-1'>
   {/* <button className='btn btn-info'><a href='/' style={{textDecoration:"none"}}>back</a></button>  */}
   <form className='page-1 page-2' onSubmit={HandleSubmit}>
       
    <label></label>
    <input className='inp' type="text" name='firstName' onChange={GetValue} placeholder='FirstName'/> 
    <label></label>    
    <input  className='inp' name="lastName"  type="text" onChange={GetValue} placeholder='LastName'/> 
    <label></label>    
    <input className='inp'type="email" name="email" onChange={GetValue}    placeholder='Email'/> 
    <label></label>     
    <input className='inp' type="password" name="password" onChange={GetValue}   placeholder='Password'/>
    <button className='btn btn-primary my-4' type='submit'  >Signup</button>
    <p className='text-account' >Already have an account? <a className='a-tag' href="./login">Login...</a></p>

       
    
    </form> 
    </div>
   </div>
  </>
  )
}

export default Signup