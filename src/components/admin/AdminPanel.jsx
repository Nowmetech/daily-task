import axios from "axios";
import "../../css/Home.css"
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";


// const { RangePicker } = DatePicker;

function AdminPanel() {
  const { id } = useParams();
  const { RangePicker } = DatePicker;
  const link = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [getTask, setGetTask] = useState([]);
  const [records, setRecord] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://daily-task-api.onrender.com/task/getTaskAsAdmin", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        // console.log(res)
        setGetTask(res?.data?.data);
        setRecord(res?.data?.data);
        
        // setDateRange(res?.data?.data[0])
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  //search filter
  const Userfilter = (e) => {
    setRecord(
      getTask?.filter((f) =>
        f?.User?.firstName.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };

  //date filter
  const rangePresets = [
    { label: "Today", value: [dayjs().add(0, "d"), dayjs()] },
    { label: "Yesterday", value: [dayjs().add(-1, "d"), dayjs()] },
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  ];

  const handleDateChange = (dates, preset) => {
    // Make sure to format the dates consistently
    const formattedDates = dates.map((date) => date.format("YYYY-MM-DD"));

    setDateRange(dates);

    // Calculate start date based on the selected preset
    const startDate =
      preset && preset.value && preset.value[0]
        ? preset.value[0].format("YYYY-MM-DD")
        : null;

    // Filter records based on the selected date range or preset
    setRecord(
      getTask?.filter((task) => {
        const taskStartDate = moment(task.start_date);
        const taskEndDate = moment(task.end_date);

        return (
          (startDate &&
            taskStartDate.isBetween(
              startDate,
              formattedDates[1],
              null,
              "[]"
            )) ||
          taskStartDate.isBetween(
            formattedDates[0],
            formattedDates[1],
            null,
            "[]"
          ) ||
          taskEndDate.isBetween(
            formattedDates[0],
            formattedDates[1],
            null,
            "[]"
          ) ||
          (taskStartDate.isBefore(formattedDates[0]) &&
            taskEndDate.isAfter(formattedDates[1]))
        );
      })
    );
  };
  //date filter ends here

  //logout function
  const HandleLogout = () => {
    localStorage.removeItem("token");
    link("/login");
  };
  //delete function
  const HandleDelete = (id) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://daily-task-api.onrender.com/task/deleteTask/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        window.location.reload();
        console.log(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
// pagination
const [currentPage, setCurrentPage] = useState(1)
const [rowPerPage, setRowPerPage] = useState(10); 
const postPerPage = rowPerPage;
const lastIndex = currentPage * postPerPage
const firstIndex = lastIndex - postPerPage
const record = records.slice(firstIndex, lastIndex)
const newPage = Math.ceil(records.length / postPerPage)
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
const stripHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit" />
        Lodding...
      </Backdrop>
      <div className="main-1">
        <h1 style={{ textAlign: "center", fontWeight: "700" }}>Admin Panel</h1>

        <div style={{ margin: "1rem", textAlign: "center" }}>
          <Space direction="vertical" size={12}>
            <RangePicker
              presets={rangePresets}
              onChange={(dates, preset) => handleDateChange(dates, preset)}
              value={dateRange}
            />
          </Space>
        </div>
        <button onClick={HandleLogout} className="btn btn-primary mx-2 my-1">
          Logout
        </button>
        <input className=" my-3  mr-sm-2  " type="search" placeholder="Search Submitter" onChange={Userfilter}/>
        {/* < div className='d-flex justify-content-end avatar'>
          <strong className="text-primary">Page</strong>
      <p className='h5 text-white round'>{currentPage}</p>
     </div> */}
        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
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
          {getTask && records && record?.map((item, index) => (
            <>
             
              <tbody>
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                  <div className="round"               
                    >
                      {item.User?.firstName[0]}
                      {item.User?.lastName[0]}
                    
                    </div>
                  <small className='text-primary'>{item.User?.firstName}{" "}{item.User?.lastName}</small>
        
                    
                  </td>
                  <td>{item.Project?.name}</td>

                  <td>{item.Designation.name}</td>

                  <td>{stripHtmlTags(item.task_details)}</td>
                  <td>{`${item.estimate_hours}hr`}</td>
                  <td>{item.Status?.name}</td>
                  <td>{item.hour_taken}</td>
                  <td>{moment(item.start_date).format("DD-MM-YYYY")}</td>
                  <td>{moment(item.end_date).format("DD-MM-YYYY" || "0")}</td>
                  <td>{item.comments}</td>
                  <td>
                    <Link to={`/adminEditPanel/${item.id}`}>
                      {" "}
                      <button className="btn btn-info mx-3">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => HandleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
        <ul className="pagination mx-4 my-3">
          <li className="page-item">
            <a href="#" onClick={prevPage} className="page-link">prev</a>
          </li>
           {
            numbers.map((number, index)=>(
              <li key={index} className="page-item"><a href="#" className="page-link" onClick={()=> changePage(number)}>{number}</a></li>

            ))
           }
            <li className="page-item">
            <a href="#" onClick={nextPage} className="page-link">Next</a>
          </li>
          <div>
      <label className="bg-white">Rows per Page:</label>
      <select
        value={rowPerPage}
        onChange={(e) => setRowPerPage(parseInt(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
        </ul>
        
      </div>
    </>
  );
}

export default AdminPanel;
