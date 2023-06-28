import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import VendorRegsitration from "./components/VendorRegsitration";
import VendorUpdate from "./components/VendorUpdate";
import VendorCreate from "./components/VendorCreate";



function App() {

  return (
    <div>

      <Router>
        <Routes>
          <Route>
          <Route exact path="/" element={<VendorRegsitration />} />
          <Route exact path="/update-vendor" element={<VendorUpdate />} />
          <Route exact path="/create-vendor" element={<VendorCreate />} />


          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App