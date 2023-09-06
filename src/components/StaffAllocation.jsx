import React, { useState, useEffect } from "react";
import Select from "react-select";
import { URLDevelopment } from "../utilities/Url";
import axios from "axios";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

function DependentDropdown() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [dutyMaster, setDutyMaster] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffOptions, setStaffOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [locationId, setLocationId] = useState("");
  const [towerInfo, setTowerInfo] = useState([]);
  const [floorInfo, setFloorInfo] = useState([]);
  const [floorId, setFloorId] = useState("");
  const [towerId, setTowerId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sectioninfo, setSectionInfo] = useState([]);
  const [selectedDuty, setSelectedDuty] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [vendordata, setVendordata] = useState([]);
  const [payableInput, SetPayableInput] = useState([]);
  const [payable, setPayable] = useState([]);
  const [payVendorId, SetPayablevendorId] = useState([]);
  const [fetchEmployeesCalled, setFetchEmployeesCalled] = useState(false);

  const navigate = useNavigate();

  //----------------------------------------------------------------fetching data, directly from  Function ----------------------------------------------------------------
  // useEffect(() => {
  //   fetchCountries();
  //   fetchDutyMaster();
  //   fetchEmployees();
  //   fetchShifts();
  //   fetchBranchesTower();
  //   fetchFloorInfo(locationId);
  //   fetchSectionInfo(floorId, locationId);
  //   fetchvendor(selectedVendorId);
  //   // Pass locationId as a parameter to fetchFloorInfo
  // }, [locationId, floorId, selectedVendorId]);

  useEffect(() => {
    fetchCountries();

    if (!fetchEmployeesCalled) {
      fetchEmployees(selectedStaff);
      setFetchEmployeesCalled(true);
    }

    if (selectedVendorId) {
      fetchvendor(selectedVendorId);
      // fetchStaffRole(staffRoles);
    }

    if (dutyMaster) {
      fetchShifts();
    }
    if (dutyMaster) {
      fetchDutyMaster();
    }

    if (towerId) {
      fetchFloorInfo(locationId, floorId);

      if (floorId) {
        fetchSectionInfo(locationId, floorId);
      }
    }
  }, [locationId, floorId, selectedVendorId, fetchEmployeesCalled]);

  //----------------------------------------------------------------API data Fetching----------------------------------------------------------------

  //----------------------------------------------------------------Coutries data Fetching----------------------------------------------------------------

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${URLDevelopment}/api/branches/countries`);
      const data = await response.json();
      setCountries(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  //----------------------------------------------------------------States data Fetching----------------------------------------------------------------
  const fetchStates = async (countryId) => {
    console.log(countryId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/states?branch_country_id=${countryId}`
      );
      const data = await response.json();
      console.log(data);
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  //---------------------------------------------------------------Cites data Fetching--------------------------------------------------------------------

  const fetchCities = async (stateId) => {
    console.log(stateId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/cities?branch_state_id=${stateId}`
      );
      const data = await response.json();
      setCities(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  //---------------------------------------------------------------Location data Fetching--------------------------------------------------------------------

  const fetchBranchLocations = async (cityId) => {
    console.log(cityId);

    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/location?branch_city_id=${cityId}`
      );
      const data = await response.json();
      setBranchLocations(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };

  //---------------------------------------------------------------Tower data Fetching--------------------------------------------------------------------

  const fetchBranchesTower = async (branchId) => {
    console.log(branchId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/getTowers?branch_id=${branchId}`
      );
      const data = await response.json();
      console.log(data);
      setTowerInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };

  //---------------------------------------------------------------Floor data Fetching--------------------------------------------------------------------

  const fetchFloorInfo = async (branchId, towerId) => {
    console.log(branchId);
    console.log(towerId);

    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/floor?branch_id=${branchId}&tower_id=${towerId}`
      );
      const data = await response.json();
      setFloorInfo(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };
  //---------------------------------------------------------------Section data Fetching--------------------------------------------------------------------

  const fetchSectionInfo = async (branchId, floorId) => {
    console.log(floorId);
    console.log(branchId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/section/${branchId}/${floorId}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Log the response data to see its structure
      setSectionInfo(data); // Make sure data is an array with 'section' property
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };

  //---------------------------------------------------------------DutyMaster data Fetching--------------------------------------------------------------------

  const fetchDutyMaster = async () => {
    try {
      const response = await fetch(`${URLDevelopment}/api/floor/masterduty`);
      const data = await response.json();
      setDutyMaster(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching master duty:", error);
    }
  };

  //---------------------------------------------------------------fetchEmployees data Fetching--------------------------------------------------------------------

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${URLDevelopment}/api/staff/staffsearch`);
      const data = await response.json();
      console.log(data);
      const staffOptions = data.map((staff) => ({
        value: staff.employee_id,
        label: `${staff.employee_id} - ${staff.full_name}`,
        vendorid: `${staff.vendor_id}`,
      }));
      setStaffOptions(staffOptions);
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  //---------------------------------------------------------------Fetchshift data Fetching--------------------------------------------------------------------

  const fetchShifts = async () => {
    try {
      const response = await fetch(`${URLDevelopment}/api/shift/shiftsearch`);
      const data = await response.json();

      const shiftedData = data.map((shift) => ({
        ...shift,
        combinedDescription: `${shift.shift_name} - ${shift.description}`,
      }));

      setShiftOptions(shiftedData);
      console.log(shiftedData);
    } catch (error) {
      console.log("Error fetching shifts:", error);
    }
  };

  const fetchvendor = async (vendorId) => {
    console.log(vendorId);

    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/vendorsearch/${vendorId}`
      );
      const data = await response.json();
      setVendordata(data);

      SetPayableInput(data[0].name);
      SetPayablevendorId(data[0].id);

      console.log(data[0].name);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  };

  //---------------------------------------------------------------API data Fetching--------------------------------------------------------------------

  //---------------------------------------------------------------SET ID parameters ----------------------------------------------------------------

  //--------------------------------------------------------------- Get Country Id --------------------------------------------------------------------------------

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    fetchStates(countryId);
    setSelectedState("");
    console.log(countryId);
    setCities([]);
  };

  //--------------------------------------------------------------- Get State Id --------------------------------------------------------------------------------
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    fetchCities(stateId);
    console.log(stateId);
  };

  //--------------------------------------------------------------- Get City Id --------------------------------------------------------------------------------
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    fetchBranchLocations(cityId);
    console.log(cityId);
  };

  //--------------------------------------------------------------- Get Location Id --------------------------------------------------------------------------------
  const handleLocationChange = (e) => {
    const branchId = e.target.value;
    setLocationId(branchId);
    fetchBranchesTower(branchId);
    console.log(branchId);
  };

  //--------------------------------------------------------------- Get Tower Id --------------------------------------------------------------------------------
  const handleTowerChange = (e) => {
    const towerId = e.target.value;
    setTowerId(towerId);

    fetchFloorInfo(locationId, towerId);
    // Fetch section info with the selected floorId and branchId
    console.log(towerId);
  };

  //--------------------------------------------------------------- Get Floor Id --------------------------------------------------------------------------------
  const handleFloorsChange = (e) => {
    const floorId = e.target.value;
    const branchId = locationId; // Use the selected locationId as the branchId

    setFloorId(floorId);
    fetchSectionInfo(branchId, floorId);
    console.log(branchId);
    console.log(floorId);
  };

  // ...existing code...

  //--------------------------------------------------------------- Get Duty Id --------------------------------------------------------------------------------
  const handleDutyChange = (e) => {
    const dutyId = e.target.value;
    setSelectedDuty(dutyId);
    console.log(dutyId);
  };

  //--------------------------------------------------------------- Get Shift Id --------------------------------------------------------------------------------
  const handleShiftChange = (e) => {
    const shiftId = e.target.value;
    setSelectedShift(shiftId);
    console.log(shiftId);
  };

  // ...existing code...

  //--------------------------------------------------------------- Get Section Id --------------------------------------------------------------------------------
  const handleSectionChange = (e) => {
    const floorId = e.target.value;
    // const branchId = e.target.value;
    setSectionId(floorId); // Update the sectionId state with the selected floorId
    // fetchBranchLocations(branchId);

    // Fetch section information based on the selected floorId and branchId
    // fetchSectionInfo(floorId);

    // Assuming locationId is the selected branchId

    console.log(floorId);
  };

  // const handleVendorChange = (e) => {
  //   const vendorId = e.target.value;
  //   setSelectedVendorId(vendorId); // Update the selectedVendorId state with the selected vendorId
  //   console.log(vendorId); // Log the selected vendorId
  // };

  const handleChange = (e) => {
    // If payableInput is "Athulya", set the value to "0", otherwise use the user's input
    const inputValue = payableInput === "Athulya" ? "0" : e.target.value;
    setPayable(inputValue);
  };

  //--------------------------------------------------------------- Staff Section Id --------------------------------------------------------------------------------
  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    console.log(selectedOption.vendorid);
    setSelectedVendorId(selectedOption.vendorid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("branch_id", locationId);
    formData.append("tower", towerId);
    formData.append("floor", floorId);
    formData.append("section", sectionId);
    formData.append("duty", selectedDuty); // Replace with the actual duty type value
    formData.append("emp_id", selectedStaff.value);
    formData.append("shift", selectedShift); // Replace with the actual shift name value
    formData.append("vendor", payVendorId);
    formData.append("staff_payable", payableInput);

    // Convert formData to a regular JSON object
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await axios.post(
        `${URLDevelopment}/api/shiftallocation/floorallocation`,
        jsonData, // Use the jsonData as the request body
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      if (response.status === 200) {
        console.log("Data inserted successfully");
        // Reset the form or clear the input fields if needed

        // Show SweetAlert2 success message
        Swal.fire({
          icon: "success",
          title: "Data Inserted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigate to shiftroster page
        navigate("/shiftroster");
      } else if (response.status === 204) {
        console.log(" already Record exists.");
        // Reset the form or clear the input fields if needed

        // Show SweetAlert2 success message
        Swal.fire({
          icon: "error",
          title: "already Record exists",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Failed to insert data");

        // Show SweetAlert2 error message
        Swal.fire({
          icon: "error",
          title: "Data Not Inserted ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      // Show SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Error inserting data",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="">
        <div className="container mx-auto lg:pl-60 xl:pl-60">
          <Dashboard />
          <div>
            <h5 className="pt-44 subheading">Staff Duty Allocation</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2">
              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Country:
                </div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                  htmlFor="country"
                />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  id="country"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option
                      value={country.branch_country_id}
                      key={country.branch_country_id}
                    >
                      {country.branch_country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  State:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="state" />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option
                      value={state.branch_state_id}
                      key={state.branch_state_id}
                    >
                      {state.branch_state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  City:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="city" />

                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  id="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option
                      value={city.branch_city_id}
                      key={city.branch_city_id}
                    >
                      {city.branch_city}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Branch:
                </div>
                <label
                  className="block mb-2 text-sm font-xl"
                  htmlFor="branchLocation"
                />

                <select
                  value={locationId}
                  onChange={handleLocationChange}
                  id="branchLocation"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select Branch Location</option>
                  {branchLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Tower:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="tower" />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={towerId}
                  onChange={handleTowerChange}
                  id="tower"
                >
                  <option value="">Select Branch Tower</option>
                  {towerInfo.map((tower) => (
                    <option key={tower.id} value={tower.towerno}>
                      {tower.tower}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Floor:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="floor" />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={floorId}
                  onChange={handleFloorsChange}
                  id="floor"
                >
                  <option value="">Select Branch Floor</option>
                  {floorInfo.map((flr) => (
                    <option key={flr.id} value={flr.floor}>
                      {flr.floor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Section:
                </div>
                <label
                  className="block mb-2 text-sm font-xl"
                  htmlFor="section"
                />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={sectionId}
                  onChange={handleSectionChange}
                  id="section"
                >
                  <option value="">Select Branch Floor</option>
                  {sectioninfo.map((sec) => (
                    <option key={sec.id} value={sec.section}>
                      {sec.section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Staff:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="staff" />

                <Select
                  className="w-full "
                  name="staff"
                  value={selectedStaff}
                  onChange={handleStaffChange}
                  options={staffOptions}
                />
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Vendor:
                </div>
                <label
                  className="block mb-2 text-sm font-xl"
                  htmlFor="staffvendor"
                />

                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={selectedVendorId}
                >
                  <option value="">Vendor</option>
                  {vendordata.map((vdr) => (
                    <option value={vdr.id} key={vdr.id}>
                      {vdr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Payable:
                </div>
                <label
                  className="block mb-2 text-sm font-xl"
                  htmlFor="staffpayable"
                />

                <input
                  placeholder="type here"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 "
                  type="text"
                  name="staffpayable"
                  disabled={payableInput === "Athulya"}
                  value={payable}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Duty:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="duty" />

                <select
                  value={selectedDuty}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  id="duty"
                  onChange={handleDutyChange}
                >
                  <option value="">Select Duty</option>
                  {dutyMaster.map((duty) => (
                    <option value={duty.id} key={duty.id}>
                      {duty.duty_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Shift:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="shift" />

                <select
                  value={selectedShift}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  id="shift"
                  onChange={handleShiftChange}
                >
                  <option value="">Select Shift</option>
                  {shiftOptions.map((shift) => (
                    <option value={shift.id} key={shift.id}>
                      {shift.combinedDescription}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <div>
                <button
                  type="submit"
                  className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#ed4880] before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
                >
                  <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
                    Submit
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DependentDropdown;
