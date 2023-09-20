import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { URLDevelopment } from "../utilities/Url";
import Datepicker from "react-tailwindcss-datepicker";

function ShiftDetails() {
  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    fetchBranchLocations();
    fetchShifts();
  }, []);

  //---------------------------------------------------------------Location data Fetching--------------------------------------------------------------------

  const fetchBranchLocations = async (cityId) => {
    console.log(cityId);

    try {
      const response = await fetch(`${URLDevelopment}/api/fetchbranches`);
      const data = await response.json();
      setBranchLocations(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };

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

  //--------------------------------------------------------------- Get City Id --------------------------------------------------------------------------------
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);

    console.log(cityId);
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;
    setSelectedShift(shiftId);
    console.log(shiftId);
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="">
        <div className="container mx-auto lg:pl-60 xl:pl-60">
          <Dashboard />
          <div>
            <h5 className="pt-44 subheading">Shift Details </h5>
          </div>
          <form>
            <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2">
              <div className="mb-4">
                <div>
                  <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                    Date
                  </div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="country"
                  />
                  <Datepicker value={value} onChange={handleValueChange} />
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                    Staff Type
                  </div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="country"
                  />
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select Staff Type</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <div>
                  <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                    Staff Category
                  </div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="country"
                  />
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select Staff Category</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                  Duty Location:
                </div>
                <label
                  className="block mb-2 text-sm text-gray-600"
                  htmlFor="country"
                />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  id="city"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select City</option>
                  {branchLocations.map((branch) => (
                    <option value={branch.id} key={branch.id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="mb-4">
                  <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                    Duty Shift:
                  </div>
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="country"
                  />
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
            </div>
          </form>
          <div className="border border-gray-200 rounded-lg shadow-md ">
            <table className="w-full text-sm font-semibold text-left bg-white border-collapse table-auto text-customblack">
              <thead className="text-xl uppercase bg-gray-50 whitespace-nowrap">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Shift Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Resource
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Shift
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Shift Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Shift Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Allocated Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Shift Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    OT Hours
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftDetails;
