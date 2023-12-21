import React, { useContext, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { GlobalContext } from '../../context/globalContext/GlobalContex';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
function TaskLists() {
  const link = useNavigate()
// const {getdata} = useContext(GlobalContext)
const [isLoading, setIsLoading] = useState(false)
//  console.log(getdata)
const[getTask, setGetTask] = useState([])
// const [ filter, setFilter] = useState([])
useEffect(()=>{
setIsLoading(true)
    const token = localStorage.getItem("token")
    axios.get("https://daily-task-api.onrender.com/task/getTaskByUser", {
        headers:{
            Authorization: token
        }
    })
    .then((res)=>{
      setIsLoading(false)
        console.log(res?.data?.tasks[0])
        setGetTask(res?.data?.tasks)
    })
    .catch((err) =>{
      setIsLoading(false)
        console.log(err)
    })
   
    
},[])

const HandleLogout = () =>{
  localStorage.removeItem("token")
  console.log("logout")
  link('/login')
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
      
     <Table striped bordered hover variant="dark">
      
      <thead>
        <button onClick={HandleLogout} className='btn btn-primary m-4'>Logout</button>
        <tr>
          <th>Id</th>
          <th>Project</th>
          <th>Work in</th>
          <th>Task Details</th>
          <th>Estimate hours</th>
          <th>Status</th>
          <th>Hour taken</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Comment/issue</th>
          <th>Action</th>
          
        </tr>
      </thead>
     
        
          {
            getTask.map((item, index)=>(
                <> <tbody>
                 <tr key={item.id}>
                  <td>{index + 1}</td>
                 <td>{item.Project?.name}</td>
                 <td>{item.Designation.name}</td>
                
                 <td>{item.task_details}</td>
                 <td>{`${item.estimate_hours}hr`}</td>
                 <td>{item.Status?.name}</td>
                 <td>{item.hour_taken}</td>
                 <td>{moment(item.start_date).format('DD-MM-YYYY')}</td>
                 <td>{moment(item.end_date).format('DD-MM-YYYY' || "0")}</td>
                 <td>{item.comments}</td>
                 <td>
                <Link to={`/editdata/${item.id}`}> <button className='btn btn-info mx-3'>Edit</button></Link>
                  {/* <button className='btn btn-danger'>Delete</button> */}
                  
                 </td>
                 
                 </tr>
              

                
                </tbody>
                </>
            ))
          }
                
          
       
       
      
    </Table>
    </>
    
    
    
    )
}

export default TaskLists