import React, { useEffect, useState } from 'react'
import '../../css/TaskPage.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function TaskPage() {
  const link = useNavigate()
  localStorage.getItem("token")
  const HandleClick = ()=>{
     localStorage.removeItem("token")
     link("/login")
  }
  const [userName, setUserName] = useState()
  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios.get("https://daily-task-api.onrender.com/task/getTaskByUser", {
      headers:{
          Authorization: token
      }
  })
  .then((res)=>{
   
      console.log(res?.data?.tasks[0].User.firstName
        )
      setUserName(res?.data?.tasks[0].User.firstName)
  })
  .catch((err) =>{
    
      console.log(err)
  })
 
  },[])
  return (
    <>
    <div className='login'></div>
    <div className=' sub-1'>
      
      <div className='modal-container-task'>
       
      <h6 className='text-light-emphasis'>{`WELCOME ${userName}`}</h6>
       <div className='head'>DAILY TASK UPDATE</div>
       <p className='body'>A daily task report is a record of a team member's activities, accomplishments, and performance for a given day. It's an internal communication from the employee to their manager.</p>
          
      
      <div className='d-flex g-4'>
      <Link to={'/task'}><button className='btn btn-primary mx-3'>Start Now</button></Link>
      <Link to={'/tasklist'}><button className='btn btn-primary'>View Task</button></Link>
       
      </div>
   
         <div className='d-flex justify-content-end'> <button className='btn btn-danger' onClick={HandleClick}>Logout</button></div>
       
       
       </div>
      </div></>
  )
}

export default TaskPage