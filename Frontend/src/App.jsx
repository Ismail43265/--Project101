import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"
import Friend_requests from "./pages/Friend-Requests";
import GroupChat from "./pages/groupChat";


const App= ()=>{
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/friend-requests" element={<Friend_requests/>}/>
          <Route path="/group/:id" element={<GroupChat/>}/>
      </Routes>
    </div>
  )
}

export default App;