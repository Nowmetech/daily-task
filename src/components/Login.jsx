import { useState } from "react";
import axios from "axios";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Login() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [data, setdata] = useState({
    email: "",
    password: "null",
  });
  const GetValue = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log(data)

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const result = await axios.post(
        "https://daily-task-api.onrender.com/user/login",
        data
      );

      console.log(result?.data?.user?.Role?.type);
      if(result?.data?.user?.Role.type === "User"){
        localStorage.setItem("token", result?.data?.token);
        setIsLoading(false)
      nav("/taskpage");
      }else if(result?.data?.user?.Role.type === "Admin"){
        localStorage.setItem("token", result?.data?.token);
        setIsLoading(false)
        nav("/adminDashboard");
      }else{
        alert("invalid input")
      }
      
    } catch (error) {
      console.log(error);
    }
    // }if(data!== "" || data===""){
    //     alert(" please enter 8 character A one special character and number" )
    //   }else{
    //     console.log("successful")
    //   }
  };
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
      <div className="login"></div>
      <div className="sub sub-1">
      
        <div className="modal-container-login">
          {/* <button className='btn btn-info'><a href='/' style={{textDecoration:"none"}}>back</a></button>  */}
          <form className="page-1 page-2" onSubmit={HandleSubmit}>
            <label></label>        
            <input
              type="email"
              name="email"
              onChange={GetValue}
              placeholder="Email"
            />
         
            <label></label>
            
            <input
           
              type="password"
              name="password"
              onChange={GetValue}
              placeholder="password"
            />
            <button className="btn btn-primary mt-4" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
