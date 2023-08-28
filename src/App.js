import React from "react";
import "./App.css";
import { BrowserRouter as HashRouter, Route, Routes } from "react-router-dom";
import VendorRegsitration from "./components/VendorRegsitration";
import VendorUpdate from "./components/VendorUpdate";
import VendorCreate from "./components/VendorCreate";
import StaffAllocation from "./components/StaffAllocation";
import StaffRegister from "./components/Staff/StaffRegister";
import StaffProfile from "./components/Staff/StaffProfile";
import ShiftRoster from "./components/Staff/ShiftRoster";
// import ShiftRosterEdit from "./components/Staff/ShiftRosterEditModal";
import ShiftRosterUpdate from "./components/Staff/ShiftRosterUpdate";
import MasterDuty from "./components/MasterDuty";
// import Dashboard from "./components/Dashboard";
import NavBar from "./components/Basic/NavBar";
import Staffallocationbulkupdate from "./components/Staff/Staffallocationbulkupdate";
import Staffnurseallocation from "./components/Staffnurseallocation";
import StaffNurseRoster from "./components/Staff/StaffNurseRoster";
import StaffShiftrosterUpdate from "./components/Staff/StaffShiftrosterUpdate";

function App() {
  return (
    <div className="">
      <NavBar />
      <HashRouter>
        <Routes>
          <Route>
            <Route exact path="/" element={<VendorRegsitration />} />
            <Route
              exact
              path="/staffallocation"
              element={<StaffAllocation />}
            />
            <Route
              exact
              path="/update-vendor/:vendorId"
              element={<VendorUpdate />}
            />
            <Route exact path="/create-vendor" element={<VendorCreate />} />
            <Route exact path="/staffregister" element={<StaffRegister />} />
            <Route exact path="/staffprofile" element={<StaffProfile />} />
            <Route exact path="/shiftroster" element={<ShiftRoster />} />
            <Route
              exact
              path="/staffnurseroster"
              element={<StaffNurseRoster />}
            />
            <Route
              exact
              path="/staffnurseallocation"
              element={<Staffnurseallocation />}
            />
            <Route
              exact
              path="/VendorRegsitration"
              element={<VendorRegsitration />}
            />

            <Route
              exact
              path="/shiftrosterupdate/:shiftId"
              element={<ShiftRosterUpdate />}
            />
            <Route
              exact
              path="/staffshiftrosterupdate/:shiftId"
              element={<StaffShiftrosterUpdate />}
            />

            <Route
              exact
              path="/staffallocationupdate"
              element={<Staffallocationbulkupdate />}
            />

            <Route exact path="/masterduty" element={<MasterDuty />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
