import { useState } from "react";
import axios from "axios";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

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

    try {
      const result = await axios.post(
        "https://daily-task-api.onrender.com/user/login",
        data
      );

      console.log(result?.data?.user?.Role?.type);
      if(result?.data?.user?.Role.type === "User"){
        localStorage.setItem("token", result?.data?.token);
      nav("/taskpage");
      }else if(result?.data?.user?.Role.type === "Admin"){
        localStorage.setItem("token", result?.data?.token);
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
