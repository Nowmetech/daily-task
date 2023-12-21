import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
// const { RangePicker } = DatePicker;


function AdminPanel() {
  const { RangePicker } = DatePicker;
  const link = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const[getTask, setGetTask] = useState([])
  const [records, setRecord] = useState([])
  const [dateRange, setDateRange] = useState([]);


  useEffect(()=>{
    setIsLoading(true)
        const token = localStorage.getItem("token")
        axios.get("https://daily-task-api.onrender.com/task/getTaskAsAdmin", {
            headers:{
                Authorization: token
            }
        })
        .then((res)=>{
          setIsLoading(false)
            // console.log(res)
            setGetTask(res?.data?.data)
            setRecord(res?.data?.data)
            // setDateRange(res?.data?.data[0])
        })
        .catch((err) =>{
          setIsLoading(false)
            console.log(err)
        })
       
        
    },[])
    const Userfilter = (e) => {
      
      setRecord(getTask?.filter(f => f?.User?.firstName.toUpperCase().includes(e.target.value.toUpperCase())))
      }
      const handleDateChange = (dates) => {
        setDateRange(dates)
        // Filter records based on the selected date range 
        setRecord(
          getTask?.filter((task) => {
            const taskStartDate = moment(task.start_date);
            return taskStartDate.isBetween(dates[0], dates[1], null, '[]') ||
            taskStartDate.isSame(dates[0], 'day') ||
            taskStartDate.isSame(dates[1], 'day');
          })
        );
      };
   const HandleLogout = () =>{
   localStorage.removeItem("token")
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
   <div className='main-1'>
    <h1 style={{textAlign:"center", fontWeight:"700",}}>Admin Panel</h1>
  
   <div style={{margin:"1rem", textAlign:"center"}}
    >
   <Space direction="vertical" size={12}>
    <RangePicker renderExtraFooter={() => 'extra footer'} showTime onChange={handleDateChange}
    value={dateRange}
           />
    </Space>
   </div>
   <button onClick={HandleLogout} className='btn btn-primary mx-2 my-1'>Logout</button>
   <Table striped bordered hover variant="dark" className='opacity-75'>
      <thead>
      
        <tr>
        <input className=" my-3  mr-sm-2  " type="search" placeholder="Search Submitter" onChange={Userfilter}     />
        <th>Id</th>
        <th>User</th>
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
       records?.map((item, index)=>(
                <> <tbody>
                 <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.User?.firstName} {item.User?.lastName}</td>
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
                <Link to={`/adminEditPanel/${item.id}`}> <button className='btn btn-info mx-3'>Edit</button></Link>
                  <button className='btn btn-danger'>Delete</button>
                  
                 </td>
                 
                 </tr>
              

                
                </tbody>
                </>
            ))
          }
    </Table>
   
   </div>
  
   </>
  )
}

export default AdminPanel