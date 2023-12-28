import React, { useContext, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { GlobalContext } from '../../context/globalContext/GlobalContex';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import "../../css/Home.css"




function TaskLists() {
  const link = useNavigate()
// const {getdata} = useContext(GlobalContext)
const [isLoading, setIsLoading] = useState(false)
//  console.log(getdata)
const[getTask, setGetTask] = useState([])
const [ userName, setuserName] = useState({
  firstName:'',
  lastName:''
})
const [ user, setUser] = useState({
  firstName:'',
  lastName:'',
  email:""
})
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
        console.log(res?.data?.tasks)
        setGetTask(res?.data?.tasks)
        setuserName({...userName,firstName:res?.data?.tasks[0].User.firstName, lastName:res?.data?.tasks[0].User.lastName, email:res?.data?.tasks[0].User.email})
        setUser({...user,firstName:res?.data?.tasks[0].User.firstName[0],lastName:res?.data?.tasks[0].User.lastName[0]})
        // setUserLastName()
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
const stripHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};
//pagination
const [currentPage, setCurrentPage] = useState(1)

const postPerPage = 5

const lastIndex = currentPage * postPerPage
const firstIndex = lastIndex - postPerPage
const record = getTask.slice(firstIndex, lastIndex)
const newPage = Math.ceil(getTask.length / postPerPage)
const numbers = [...Array(newPage + 1).keys()].slice(1)


const prevPage = ()=>{
 if(currentPage !== 1){
  setCurrentPage(currentPage - 1)
 }
}
const changePage = (id) =>{
  setCurrentPage(id)
}
const nextPage = ()=>{
  if(currentPage !== newPage){
    setCurrentPage(currentPage + 1)
   }
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
      <div className='login'>
      <div className='avatar'>
       <div className='round'>
       {user.firstName}{user.lastName}       
       </div>
  <div className='d-flex gap-1'>
  <h6 className='text-white'>{userName.firstName}</h6>
        <h6 className='text-white'>{userName.lastName}</h6>
  </div>      
   </div>
   <h6 className='text-white mx-5'>{userName.email}</h6>
   
     <Table striped bordered hover variant="secondary">
      
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
            record.map((item, index)=>(
                <> <tbody>
                 <tr key={item.id}>
                  <td>{index + 1}</td>
                 <td>{item.Project?.name}</td>
                 <td>{item.Designation.name}</td>
                
                 <td>{stripHtmlTags(item.task_details)}</td>
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
    <ul className="pagination">
          <li className="page-item">
            <a href="#" onClick={prevPage} className="page-link">prev</a>
          </li>
           {
            numbers.map((number, index)=>(
              <li key={index}  className='page-item'><a href="#" className="page-link" onClick={()=> changePage(number)}>{number}</a></li>

            ))
           }
            <li className="page-item">
            <a href="#" onClick={nextPage} className="page-link">Next</a>
          </li>
        </ul>
    
    </div>
    </>
    
    
    
    )
}

export default TaskLists