import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { URLDevelopment } from "../utilities/Url";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";

import Select from "react-select";
function StaffShiftDetails() {
  const [selectedCity, setSelectedCity] = useState("");
  const [branchLocations, setBranchLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ShiftDetails, setShiftDetails] = useState([]);
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  useEffect(() => {
    fetchBranchLocations();
    fetchEmployees();

  }, []);




  const fetchBranchLocations = async () => {
    console.log();

    try {
      const response = await fetch(`${URLDevelopment}/api/fetchbranches`);
      const data = await response.json();
      setBranchLocations(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };


  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);

    console.log(cityId);
  };

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };


  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    console.log(selectedOption.vendorid);

  };

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


  //-------


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set loading state to true
      // Build the URL with query parameters
      const apiUrl = `${URLDevelopment}/api/shiftdetails/reports?from_date=2023-09-01&to_date=2023-09-30&branch_id=9&staff_id=1}`;

      // Send a GET request with Axios
      const response = await axios.post(apiUrl);
      if (response.status === 200) {
        const responseData = response.data.Result;
        setShiftDetails(responseData.data.Result);
        console.log(responseData.data.Result);
      } else {
        console.error("API Request Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="container mx-auto lg:pl-60 xl:pl-60">
        <Dashboard />
        <div>
          <h5 className="pt-44 subheading">Staff Base Report</h5>
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
        <div>
          <div className="border border-gray-200 rounded-lg shadow-md ">
            <table className="w-full text-sm font-semibold text-left bg-white border-collapse table-auto text-customblack">
              <thead className="text-xl uppercase bg-gray-50 whitespace-nowrap">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Full Name
                  </th>
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
                    Branch Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Duty Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Tower
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Master Floor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Section Id
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
                  {ShiftDetails.map((shift, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 odd:bg-gray-100"
                    >

                      <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {shift.full_name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.employee_id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.branch_name}
                        </span>
                      </td>


                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.resource}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.staff_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.staff_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.worked}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.shift}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.OT_Hours}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.leave}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-customblack">
                          {shift.total_payable}
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
  );
}

export default StaffShiftDetails;
