import React from 'react'
import '../../css/TaskPage.css'
import { Link } from 'react-router-dom'
function TaskPage() {
  return (
    <>
    <div className='login'></div>
    <div className=' sub-1'>
      
      <div className='modal-container-task'>
       
      {/* <button className='btn btn-info'><a href='/' style={{textDecoration:"none"}}>back</a></button>  */}
       <div className='head'>DAILY TASK UPDATE</div>
       <p className='body'>A daily task report is a record of a team member's activities, accomplishments, and performance for a given day. It's an internal communication from the employee to their manager.</p>
          
      
      <div className='d-flex g-4'>
      <Link to={'/task'}><button className='btn btn-primary mx-3'>Start Now</button></Link>
      <Link to={'/tasklist'}><button className='btn btn-primary'>View Task</button></Link>
       
      </div>
   
          
       
       
       </div>
      </div></>
  )
}

export default TaskPage