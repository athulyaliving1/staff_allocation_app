import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { URLDevelopment } from "../utilities/Url";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";


function ShiftReport() {
  const [branchLocations, setBranchLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [shiftOptions, setShiftOptions] = useState([]);
  const [selectedShift, setSelectedShift] = useState("");
  const [shiftdetails, setShiftOptionsfilter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  console.log(selectedCity);

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

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  //-------------------------------------------------------------------------------------------------- Staff Search-------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------- Find Branch------------------------------------------------------------------------------------



  //--------------------------------------------------------------------------------------------------Find Floor---------------------------------------------------------------------------------




  //------------------------------------------------------------------------------------------------- Find Shift-----------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------Find Duty------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log(value.startDate, value.endDate, selectedCity);

      // Build the URL with query parameters
      const apiUrl = `${URLDevelopment}/api/allstaffsnursereport/reports?from_date=${value.startDate}&to_date=${value.endDate}&branch_id=${selectedCity}`;

      // Send a POST request with Axios
      const response = await axios.post(apiUrl);

      console.log(apiUrl, response);
      // Handle the API response here
      if (response.status === 200) {
        const responseData = response.data.Result;
        setShiftOptionsfilter(responseData);
        console.log(responseData);
      } else {
        console.error("API Request Failed");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle any errors here, such as displaying an error message to the user.
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or error
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="">
        <div className="container mx-auto lg:pl-60 xl:pl-60">
          <Dashboard />
          <div>
            <h5 className="pt-44 subheading">Shift Report </h5>
          </div>
          <form onSubmit={handleSubmit}>
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
              <div className="mb-4 hidden">
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
              <div className="mb-4 hidden">
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
                  Branch
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

              <div className="mb-4 hidden">
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


              <div className="my-10">
                <div className="flex place-items-center">
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
            </div>
          </form>
          <div>
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
                      Staff Name
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
                      Branch
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
                      Staff Category
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-customblack"
                    >
                      Shift Name
                    </th>


                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-customblack"
                    >
                      OT Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-customblack"
                    >
                      OT Hrs/Shift
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div>
                    <div className="grid justify-items-center">
                      <div className="w-20 h-20 border-8 border-gray-300 rounded-full animate-spin border-t-sky-600" />
                    </div>
                  </div>
                ) : (
                  <tbody className="border-t border-gray-300 divide-y divide-gray-100">
                    {shiftdetails.map((shiftdetail, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 odd:bg-gray-100"
                      >
                        <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                          <div className="text-sm">
                            <div className="font-medium text-gray-700">
                              {formatDate(shiftdetail.schedule_date)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.full_name}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.employee_id}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.branch_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.resource}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.staff_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.staff_category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.shift_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.ot_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-customblack">
                            {shiftdetail.ot_hrs_shift}
                          </span>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftReport;
