import React, { useEffect, useState } from "react";
import "../../css/Task.css";
import axios from "axios";
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
// import { type } from '@testing-library/user-event/dist/type'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { HtmlEditor, Inject, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Link from "antd/es/typography/Link";
import moment from "moment";
import { useRef } from "react";


function Task() {
  const link = useNavigate()
  const [getdata, setGetData] = useState([]);
  const [work, setWork] = useState([]);
  const [status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const EditorText = useRef({});
  
  const toolbarSettings = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};

  const [inputValue, setInputValue] = useState({
    project_id: 0,
    designation_id: 0,
    task_details: "",
    start_date: moment(Date.now()).format('YYYY-MM-DD'),
    estimate_hours: 0,
    status_id: 0,
    hour_taken: 0,
    end_date: null,
    comments: "",
    attachment_url: "",
  });

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
    // console.log(inputValue)
  };

  const HandleSubmitTask = (e) => {   
    e.preventDefault();
    setIsLoading(true)
    const editorContent = EditorText.current && EditorText.current.value;
    const updatedInputValue = {
      ...inputValue,
      task_details: editorContent,
    };
    const token = localStorage.getItem("token");
    axios
      .post("https://daily-task-api.onrender.com/task/create", updatedInputValue,{
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setIsLoading(false)
        console.log(res);
        link('/tasklist')
        // setStatus(res?.data?.data)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      });
  };

  //   console.log(typeof(inputValue))

  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={() => setIsLoading(false)}
      > 
        <CircularProgress color="inherit" />
        Loding...
      </Backdrop>
      <div className="main-main-1 "></div>
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
              onChange={(e)=> console.log(e.target.value)}
              // onChange={handleProjectChange}
              placeholder="Enter your answer"
            />
            <label>Work in</label>
            <select
              className="dropdown-1"
              name="designation_id"
              onChange={handleProjectChange}
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
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Task Details</Form.Label>
        <Form.Control type="text" name="task_details"
              placeholder="Enter your answer"
              onChange={handleProjectChange} />
        <Form.Text className="text-muted">
           {/* We'll never share your email with anyone else.  
        </Form.Text>
      </Form.Group>
       */}
        <Form.Label>Task Details</Form.Label>
       <RichTextEditorComponent
  height={200}
  toolbarSettings={toolbarSettings}
  ref={EditorText}
>
  <Inject services={[Toolbar, HtmlEditor]} />
</RichTextEditorComponent>
      
            <label>Start Date</label>
            <input
              className="input-sort"
              type="date"
              name="start_date"
              onChange={handleProjectChange}
              placeholder="Please input Date"
              defaultValue={inputValue.start_date}
            />

            <label>Estimate Hours</label>
            <input
              className="input-sort"
              type="number"
              name="estimate_hours"
              onChange={handleProjectChange}
              placeholder="Please enter a number less than or equal to 24"  
              min={0}   
              
            />

            <label>Status</label>
            <select
              className="dropdown-1"
              name="status_id"
              onChange={handleProjectChange}
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
              type="text"
              name="hour_taken"
              onChange={handleProjectChange}
              placeholder="Please enter a number less than or equal to 30"
            />

            <label>End Date</label>
            <input
              className="input-sort"
              type="date"
              name="end_date"
              onChange={handleProjectChange}
              placeholder="Please input Date"
            />

            <label>Comments/Issues</label>
            <input
              name="comments"
              onChange={handleProjectChange}
              placeholder="Enter your answer"
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
              />
            </div>

           <div className="d-flex gap-4">
           <button className="btn btn-primary" type="submit">
              Submit
            </button>
          <button className="btn btn-danger"><a href="/taskpage" className="text-decoration-none text-white">Cancel</a></button>
           </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default Task;
