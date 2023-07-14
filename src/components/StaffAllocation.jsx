import React, { useState, useEffect } from "react";
import Select from "react-select";
import { URLDevelopment } from "../utilities/Url";

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

  //----------------------------------------------------------------fetching data, directly from  Function ----------------------------------------------------------------
  useEffect(() => {
    fetchCountries();
    fetchDutyMaster();
    fetchEmployees();
    fetchShifts();
    fetchBranchesTower();
    fetchFloorInfo();
    fetchSectionInfo();
  }, []);

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
      setTowerInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };

  //---------------------------------------------------------------Floor data Fetching--------------------------------------------------------------------

  const fetchFloorInfo = async (branchId) => {
    console.log(branchId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/floor?branch_id=${branchId}`
      );
      const data = await response.json();
      setFloorInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };

  //---------------------------------------------------------------Section data Fetching--------------------------------------------------------------------

  const fetchSectionInfo = async (floorId) => {
    console.log(floorId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/section?branch_id=${floorId}`
      );
      const data = await response.json();
      setSectionInfo(data);
      console.log(data);
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
      const staffOptions = data.map((staff) => ({
        value: staff.employee_id,
        label: staff.full_name,
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
      setShiftOptions(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching shifts:", error);
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
    fetchFloorInfo(towerId);
    console.log(towerId);
  };

  //--------------------------------------------------------------- Get Floor Id --------------------------------------------------------------------------------
  const handleFloorsChange = (e) => {
    const floorId = e.target.value;
    setFloorId(floorId);
    fetchSectionInfo(floorId);
    console.log(floorId);
  };

  //--------------------------------------------------------------- Get Section Id --------------------------------------------------------------------------------
  const handleSectionChange = (e) => {
    const sectionId = e.target.value;
    setSectionId(sectionId);

    console.log(sectionId);
  };

  //--------------------------------------------------------------- Staff Section Id --------------------------------------------------------------------------------
  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Gather the selected values from the state
    const branchId = locationId;
    const userId = selectedStaff.value; // Assuming the selectedStaff is an object with a value property
    const roomNo = ""; // Get the value from the input field for room number
    const bedNo = ""; // Get the value from the input field for bed number
    const dutyTypeId = ""; // Get the selected duty type value from the dropdown
    const selectedFloor = floorInfo.find((flr) => flr.id === floorId);
    const floor = selectedFloor ? selectedFloor.floor : "";

    // Create the data object to send in the request
    const data = {
      branch_id: branchId,
      user_id: userId,
      room_no: roomNo,
      bed_no: bedNo,
      duty_type_id: dutyTypeId,
      floor: floor,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/staff_allocation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data inserted successfully");
        // Reset the form or clear the input fields if needed
      } else {
        console.error("Failed to insert data");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <h2 className="subheading">Staff Allocation</h2>
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-3 py-5">
            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="country">Country:</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
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

            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="state">State:</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
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

            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="city">City:</label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                id="city"
                className="flex-1 w-full h-10 mx-2 form-select"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city.branch_city_id} key={city.branch_city_id}>
                    {city.branch_city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="branchLocation">Branch Location:</label>
              <select
                value={locationId}
                onChange={handleLocationChange}
                id="branchLocation"
                className="flex-1 w-full h-10 mx-2 form-select"
              >
                <option value="">Select Branch Location</option>
                {branchLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.branch_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="tower">Tower</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
                value={towerId}
                onChange={handleTowerChange}
                id="tower"
              >
                <option value="">Select Branch Tower</option>
                {towerInfo.map((tower) => (
                  <option key={tower.id} value={tower.id}>
                    {tower.tower}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="floor">Floor</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
                value={floorId}
                onChange={handleFloorsChange}
                id="floor"
              >
                <option value="">Select Branch Floor</option>
                {floorInfo.map((flr) => (
                  <option key={flr.id} value={flr.branch_id}>
                    {flr.floor}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="section">Section</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
                value={sectionId}
                onChange={handleSectionChange}
                id="section"
              >
                <option value="">Select Branch Floor</option>
                {sectioninfo.map((section) => (
                  <option key={section.id} value={section.section}>
                    {section.section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label className="" htmlFor="duty">
                Duty
              </label>
              <select className="flex-1 w-full h-10 mx-2 form-select" id="duty">
                <option value="">Select Duty</option>
                {dutyMaster.map((duty) => (
                  <option value={duty.duty_name} key={duty.id}>
                    {duty.duty_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="staff">Staff</label>

              <Select
                className="flex-1 w-full h-10 mx-2 form-select"
                name="staff"
                value={selectedStaff}
                onChange={handleStaffChange}
                options={staffOptions}
              />
            </div>
            <div className="flex w-full p-2 space-x-4 border-2 rounded">
              <label htmlFor="shift">Shift</label>
              <select
                className="flex-1 w-full h-10 mx-2 form-select"
                id="shift"
              >
                <option value="">Select Shift</option>
                {shiftOptions.map((shift) => (
                  <option value={shift.shift_name} key={shift.id}>
                    {shift.shift_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DependentDropdown;
