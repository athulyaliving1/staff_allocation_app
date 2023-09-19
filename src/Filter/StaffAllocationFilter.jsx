import React, { useState, useEffect } from "react";

import { URLDevelopment } from "../utilities/Url";
import Dashboard from "../components/Dashboard";

function StaffAllocationFilter() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [locationId, setLocationId] = useState("");
  const [towerInfo, setTowerInfo] = useState([]);
  const [floorInfo, setFloorInfo] = useState([]);
  const [floorId, setFloorId] = useState("");
  const [towerId, setTowerId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sectioninfo, setSectionInfo] = useState([]);
  const [roominfo, setRoomInfo] = useState([]);
  const [bedsInfo, setBedsInfo] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [SelectedRoomId, setSelectedRoomId] = useState("");
  // const [bedId, setBeds] = useState("");
  const [selectedBedId, setSelectedBedId] = useState("");

  console.log(countries);
  console.log(states);
  console.log(cities);
  console.log(selectedCountry);
  console.log(selectedState);
  console.log(branchLocations);
  console.log(selectedCity);
  console.log(locationId);
  console.log(towerInfo);
  console.log(sectionId);
  console.log(sectioninfo);
  console.log(roominfo);
  console.log(bedsInfo);
  console.log(roomId);
  console.log(roominfo);
  console.log(SelectedRoomId);
  // console.log(bedId);

  useEffect(() => {
    fetchCountries();

    if (towerId) {
      fetchFloorInfo(locationId, towerId);
      if (floorId) {
        fetchSectionInfo(locationId, floorId);
      }
      console.log(sectionId);
      console.log(roomId);
      // Check the value of sectionId
      if (sectionId) {
        fetchRoomInfo(roomId);
      }
      console.log(SelectedRoomId);
      // console.log(bedId);
    }
  }, [locationId, floorId, sectionId, roomId, SelectedRoomId]);

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
      console.log(data);
      setRoomId(data[0].flrefId);
      console.log(data[0].id);
      setSelectedRoomId(data[0].flrefId);
      console.log(setSelectedCity);
      console.log("API Response:", data); // Log the response data to see its structure
      setSectionInfo(data); // Make sure data is an array with 'section' property
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };

  //---------------------------------------------------------------Fetch  Room ---------------------------------------------------------------------------

  const fetchRoomInfo = async (roomId) => {
    console.log(roomId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/rooms/${roomId}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      setRoomInfo(data);
      console.log(data[0].floor);
      console.log(data[1].id);
      fetchBedsInfo(data[0].id);
    } catch (error) {
      console.error("Error fetching rooms info:", error);
    }
  };

  //-------------------------------------------------------------------------------------------------- Fetch Beds---------------------------------------

  const fetchBedsInfo = async (bedId) => {
    console.log(bedId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/beds/${bedId}`
      );
      const data = await response.json();
      console.log(data);
      setBedsInfo(data);
    } catch (error) {
      console.error("Error fetching rooms info:", error);
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

  const handleRoomsChange = async (e) => {
    const selectedRoomId = e.target.value;
    setSelectedRoomId(selectedRoomId);
    console.log(selectedRoomId);
    // Fetch beds based on the selected room
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/beds/${selectedRoomId}`
      );
      const data = await response.json();

      setBedsInfo(data);
    } catch (error) {
      console.error("Error fetching beds by room:", error);
    }
  };

  const handleBedsChange = (e) => {
    const selectedBedId = e.target.value;
    setSelectedBedId(selectedBedId);
    // console.log("Selected Bed ID:", bedId);
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="">
        <div className="container mx-auto lg:pl-60 xl:pl-60">
          <Dashboard />
          <div>
            <h5 className="pt-44 subheading">Staff Duty Allocation</h5>
          </div>
          <form>
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

              <div>
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Room:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="room" />
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  onChange={handleRoomsChange}
                  id="room"
                >
                  <option value="">Select Branch Floor</option>
                  {roominfo.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.room_number}
                    </option>
                  ))}
                </select>
                {/* Add debug output */}
                <div>SelectedRoomId: {SelectedRoomId}</div>
                <div>Selected Option Value: {event.target.value}</div>
              </div>
              <div>
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Beds:
                </div>
                <label className="block mb-2 text-sm font-xl" htmlFor="room" />
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  onChange={handleBedsChange}
                  id="beds"
                >
                  <option value="">Select Branch Floor</option>
                  {bedsInfo.map((bed) => (
                    <option key={bed.id} value={bed.room_id}>
                      {bed.bed_number}
                    </option>
                  ))}
                </select>
                <div>SelectedBedId: {selectedBedId}</div>
                <div>Selected Option Value: {event.target.value}</div>
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

export default StaffAllocationFilter;
