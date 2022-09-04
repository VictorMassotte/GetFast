import React from "react";
import { io } from "socket.io-client";

function App() {
  const [order, setOrder] = React.useState('fetching')    
  React.useEffect(()=>{
    const socket = io('http://91.236.239.56:3080')
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
   socket.on('order', (data)=>setOrder(data))
   socket.on('disconnect',()=>console.log('server disconnected'))
 },[])


 return (
   <div className="App">
     {order.delivery}
      {console.log(order)}
   </div>
 )

}

export default App;
