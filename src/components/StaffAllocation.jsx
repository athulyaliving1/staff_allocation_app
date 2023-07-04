import React, { useState, useEffect } from "react";

function DependentDropdown() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [dutymaster, setDutyMaster] = useState("")

  useEffect(() => {
    fetchCountries();
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
      const response = await fetch("http://localhost:4000/api/floor/masterduty");
      const data = await response.json();
      setDutyMaster(data);
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

  return (
    <div>
      <label
        className="items-end px-6 mt-6 space-y-4 md:space-x-6 lg:flex xl:space-y-0"
        htmlFor="country"
      >
        Country:
      </label>
      <select
        className="py-3 pl-3 font-semibold text-gray-600 outline-none cursor-pointer"
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

      <label
        className="items-end px-6 mt-6 space-y-4 md:space-x-6 lg:flex xl:space-y-0"
        htmlFor="state"
      >
        State:
      </label>
      <select id="state" value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option value={state.branch_state_id} key={state.branch_state_id}>
            {state.branch_state}
          </option>
        ))}
      </select>

      <label
        className="items-end px-6 mt-6 space-y-4 md:space-x-6 lg:flex xl:space-y-0"
        htmlFor="city"
      >
        City:
      </label>
      <select
        className="py-3 pl-3 font-semibold text-gray-600 outline-none cursor-pointer"
        id="city"
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option value={city.branch_city_id} key={city.branch_city_id}>
            {city.branch_city}
          </option>
        ))}
      </select>

      <div class="flex w-full space-x-4 rounded border-2 p-2">
        <label className="" htmlFor="city">
          tower
        </label>
        <input
          class="text-md w-8/12 text-gray-600 outline-none"
          type="text"
          placeholder="Title..."
        />
      </div>
      <div class="flex w-full space-x-4 rounded border-2 p-2">
        <label className="" htmlFor="city">
          floor
        </label>
        <input
          class="text-md w-8/12 text-gray-600 outline-none"
          type="text"
          placeholder="Title..."
        />
      </div>
      <div class="flex w-full space-x-4 rounded border-2 p-2">
        <label className="" htmlFor="city">
          section
        </label>
        <input
          class="text-md w-8/12 text-gray-600 outline-none"
          type="text"
          placeholder="Title..."
        />
      </div>

      <div class="flex w-full space-x-4 rounded border-2 p-2">
        <label className="" htmlFor="duty">
          Duty
        </label>
        {dutymaster.map((duty) => (
          <option value={duty.duty_name} key={duty.id}>
            {duty.name}
          </option>
        ))}
      </div>
    </div>
  );
}

export default DependentDropdown;
