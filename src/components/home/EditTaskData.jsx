import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

function EditTaskData() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const link = useNavigate()
  const [getdata, setGetData] = useState([]);
  const [work, setWork] = useState([]);
  const [status, setStatus] = useState([]);
//   const [editTask, setEditTask] = useState({})

  const [inputValue, setInputValue] = useState({
    project_id: 0,
    designation_id: 0,
    task_details: "",
    start_date: "",
    estimate_hours: 0,
    status_id: 0,
    hour_taken: 0,
    end_date: null,
    comments: "",
    attachment_url: "",
  });
    useEffect(()=>{
        const token = localStorage.getItem("token")
    axios.get(`https://daily-task-api.onrender.com/task/getTaskById/${id}`,  {
        headers:{
            Authorization: token
        }
    })
    .then((res)=>{
     
        console.log(res?.data?.task)
        setData(res?.data?.task)
        setInputValue({
            project_id: res?.data?.task.project_id || 0,
            designation_id: res?.data?.task.designation_id || 0,
            task_details: res?.data?.task.task_details || "",
            start_date: res?.data?.task.start_date || "",
            estimate_hours: res?.data?.task.estimate_hours || 0,
            status_id: res?.data?.task.status_id || 0,
            hour_taken: res?.data?.task.hour_taken || 0,
            end_date: res?.data?.task.end_date || null,
            comments: res?.data?.task.comments || "",
            attachment_url: res?.data?.task.attachment_url || "",
          });
       
    })
    .catch((err) =>{
     
        console.log(err)
    })
    },[])

//


  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token)
    axios
      .get("https://daily-task-api.onrender.com/task/projects", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res?.data?.data)
        setGetData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });

   
    axios
      .get("https://daily-task-api.onrender.com/task/designations", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res?.data?.data)
        setWork(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //
    axios
      .get("https://daily-task-api.onrender.com/task/statuses", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res?.data?.data)
        setStatus(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const handleProjectChange = (e) => {
    const { name, value } = e.target;    
    const numericValue =
      name.trim() === "project_id" ||
      name.trim() === "designation_id" ||
      name.trim() === "estimate_hours" ||
      name.trim() === "status_id" ||
      name.trim() === "hour_taken"
        ? parseInt(value, 10)
        : value;

        setInputValue((inputValue) => ({
      ...inputValue,
      [name]: numericValue,
    }));
    console.log(inputValue)
  };

  const HandleSubmitTask = (e) => {   
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(`https://daily-task-api.onrender.com/task/editTask/${id}`, inputValue, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        link('/tasklist')
        // setStatus(res?.data?.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };





  return (
    <>
     <div className="main-1 "></div>
      <div className=" sub-1">
        <div className="modal-container-2 ">
          {/* <button className='btn btn-info'><a href='/' style={{textDecoration:"none"}}>back</a></button>  */}

          <div className="box-1">
            <h2 className="box-text">DAILY TASK UPDATE</h2>
          </div>

          <form className="page-1 page-2" onSubmit={HandleSubmitTask}>
          
            <label>Project Name</label>
            <select
              className="dropdown-1"
              name="project_id"
              onChange={handleProjectChange}
              value={inputValue.project_id}
            >
              {/* <option value="">Other</option> */}
              {getdata.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label></label>
            <input
              className="input-sort"
              type="text"
              onChange={handleProjectChange}
              placeholder="Enter your answer"
            />
            <label>Work in</label>
            <select
              className="dropdown-1"
              name="designation_id"
              onChange={handleProjectChange}
              value={inputValue.designation_id}
            >
              <option className="drop-item" value="">
                Write your Answer
              </option>
              {work.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* <label>Tasks Details</label>
            <input
              name="task_details"
              placeholder="Enter your answer"
              onChange={handleProjectChange}
            /> */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Details</Form.Label>
        <Form.Control type="text" name="task_details"
              placeholder="Enter your answer"
              onChange={handleProjectChange}  value={inputValue.task_details}/>
        <Form.Text className="text-muted">
          {/* We'll never share your email with anyone else. */}
        </Form.Text>
      </Form.Group>

            <label>Start Date</label>
            <input
              className="input-sort"
              type="date"    
              name="start_date"
              onChange={handleProjectChange}
              value={moment(inputValue.start_date).format("YYYY-MM-DD") }
              placeholder="Please input Date"
              disabled={true}
            />

            <label>Estimate Hours</label>
            <input
              className="input-sort"
              type="number"
              name="estimate_hours"
              onChange={handleProjectChange}
              value={inputValue.estimate_hours}
              placeholder="Please enter a number less than or equal to 24"
            />

            <label>Status</label>
            <select
              className="dropdown-1"
              name="status_id"
              onChange={handleProjectChange}
              value={inputValue.status_id}
            >
              <option className="drop-item" valu="">
                Write your Answer
              </option>
              {status.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Hour Taken</label>
            <input
              className="input-sort"
              type="number"
              name="hour_taken"
              onChange={handleProjectChange}
              value={inputValue.hour_taken}
              placeholder="Please enter a number less than or equal to 30"
            />

            <label>End Date</label>
            <input
              className="input-sort"
              type="date"
              name="end_date"
              onChange={handleProjectChange}
              value={inputValue.end_date}
              placeholder="Please input Date"

            />

            <label>Comments/Issues</label>
            <input
              name="comments"
              onChange={handleProjectChange}
              placeholder="Enter your answer"
              value={inputValue.comments}
            />

            <label>Attachment </label>

            <h3 style={{ color: "whitesmoke" }}>(Non-anonymous question)</h3>
            <div
              style={{ width: "10rem", height: "1rem", marginBottom: "2rem" }}
            >
              {" "}
              <input
                type="file"
                name="attachment_url"
                onChange={handleProjectChange}
                // value={data.attachment_url}
              />
            </div>

            <button className="btn-submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
  </>
  )
}

export default EditTaskData