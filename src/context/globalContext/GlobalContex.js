import { createContext, useEffect, useState } from "react";
import axios from "axios";

 export const GlobalContext = createContext()
 export const GlobalProvider = ({children})=>{
    const [getdata, setGetData] = useState([])
    useEffect(()=>{
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
    },[])
    return(
        <GlobalContext.Provider value={{
            getdata: getdata,
            setGetData: setGetData
        }}>{children}</GlobalContext.Provider>
    )
}
