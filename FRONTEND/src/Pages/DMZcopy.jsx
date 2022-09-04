import { Button, Typography } from "@mui/material";
import React from "react";
import PayPal from "../Components/PayPal";
import API from "../API/API";

function App() {
 const classAPI = new API()
 const send = () => {
    classAPI.testNotif()
 }

 return (
   <div className="App">
     <Button onClick={send}>Hello</Button>
   </div>
 )

}

export default App;
