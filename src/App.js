import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/projects/:id" element={<ProjectDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;

