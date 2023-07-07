import React, { useState, useEffect } from "react";
import Select from "react-select";

function DependentDropdown() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [dutyMaster, setDutyMaster] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffOptions, setStaffOptions] = useState([]);
  const [shiftoptions, setShiftOptions] = useState([]);

  useEffect(() => {
    fetchCountries();
    masterDuty();
    fetchEmployees();
    fetchshift();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/branches/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/branches/states?branch_country_id=${countryId}`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/branches/cities?branch_state_id=${stateId}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const masterDuty = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/floor/masterduty"
      );
      const data = await response.json();
      setDutyMaster(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching masterduty:", error);
    }
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    fetchStates(countryId);
    setSelectedState("");
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    fetchCities(stateId);
  };

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/staff/staffsearch"
      );
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

  const fetchshift = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/shift/shiftsearch"
      );
      const data = await response.json();
      setShiftOptions(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching shift");
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <h2 className="subheading">Staff Allocation</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3 py-5">
          <div className="flex w-full p-2 space-x-4 border-2 rounded">
            <label htmlFor="country">Country:</label>
            <select
              className="mx-2 flex-1 h-10  form-select w-full"
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
              className="mx-2 flex-1 h-10  form-select w-full"
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
            <select id="city" className="mx-2 flex-1 h-10  form-select w-full">
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
            <label htmlFor="tower">Tower</label>
            <input
              className="mx-2 flex-1 h-10  form-select w-full"
              type="text"
              placeholder="Title..."
            />
          </div>

          <div className="flex w-full p-2 space-x-4 border-2 rounded">
            <label htmlFor="floor">Floor</label>
            <input
              className="mx-2 flex-1 h-10  form-select w-full"
              type="text"
              placeholder="Title..."
            />
          </div>

          <div className="flex w-full p-2 space-x-4 border-2 rounded">
            <label htmlFor="section">Section</label>
            <input
              className="mx-2 flex-1 h-10  form-select w-full"
              type="text"
              placeholder="Title..."
            />
          </div>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex w-full p-2 space-x-4 border-2 rounded">
            <label className="" htmlFor="duty">
              Duty
            </label>
            <select className="mx-2 flex-1 h-10 form-select w-full" id="duty">
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
            
              className="mx-2 flex-1 h-10  form-select w-full"
              name="staff"
              value={selectedStaff}
              onChange={handleStaffChange}
              options={staffOptions}
            />
          </div>
          <div className="flex w-full p-2  space-x-4 border-2 rounded">
            <label htmlFor="shift">Shift</label>
            <select className="mx-2 flex-1 h-10  form-select w-full" id="shift">
            <option value="">Select Shift</option>
              {shiftoptions.map((shift) => (
                <option value={shift.shift_name} key={shift.id}>
                  {shift.shift_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DependentDropdown;
