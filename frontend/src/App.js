import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchTrack from "./components/SearchTrack";
import AddTrack from "./components/AddTrack";
import Banner from "./components/Banner";


function App() {
  return (
    <BrowserRouter>
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/search" element={<SearchTrack />}/>
        <Route path="/add" element={<AddTrack/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
