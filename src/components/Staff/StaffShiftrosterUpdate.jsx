import React, { useState, useEffect } from "react";
// import Dashboard from "../Dashboard";
import Select from "react-select";
import { URLDevelopment } from "../../utilities/Url";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useSWR from "swr";
import axios from "axios";

function StaffShiftrosterUpdate() {
  const [shiftData, setShiftData] = useState({
    ot_shift: "",
    leave_reason: "",
    emp_id: "",
    staff_source: "",
    staff_payable: "",
    service_payable: "",
    ot_type: "",
    ot_hrs_shift: "",
    shift: "",
  });

  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [vendordata, setVendordata] = useState([]);
  const [shifts, SetShifts] = useState([]);

  const { shiftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchvendor(selectedVendorId);

    fetchShiftData(shiftId);
  }, [shiftId, selectedVendorId]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${URLDevelopment}/api/staff/staffsearch`);
        const data = await response.json();
        // console.log(data);
        const staffOptions = data.map((staff) => ({
          employee_id: staff.id,
          value: staff.employee_id,
          label: `${staff.employee_id} - ${staff.full_name}`,
          vendorid: staff.vendor_id,
        }));
        setStaffOptions(staffOptions);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    fetchEmployees();
  }, []);

  console.log(shiftId);

  const fetchShiftData = async (shiftId) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/staffnurserosterotgetbyid/${shiftId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      // console.log(data[0]);
      setShiftData(data[0]);
      // console.log(data[0].branch_id);
    } catch (error) {
      console.error("Error fetching shift data:", error);
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

      console.log(data[0].name);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  };

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const { data: shiftsearchData } = useSWR(
    `${URLDevelopment}/api/shift/shiftsearch`,
    fetcher
  );

  useEffect(() => {
    if (shiftsearchData) {
      SetShifts(shiftsearchData);
    }
  }, [shiftsearchData]);

  function getshift(shiftId) {
    console.log(shiftId);
    console.log(shifts);

    if (!shiftsearchData || shiftsearchData.length === 0) {
      return "Unknown Shift";
    }

    const matchingShift = shifts.find((shift) => shift.id === shiftId);
    return matchingShift ? matchingShift.shift_name : "Unknown Shift";
  }

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    console.log(selectedOption.value);
    console.log(selectedOption);
    setSelectedVendorId(selectedOption.vendorid);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input Change - leave_reason:", value); // Add this line for debugging
    setShiftData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(shiftId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", shiftData);

    try {
      const result = await Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update this shift?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const formData = new FormData();

        formData.append("ot_shift", shiftData.staff_nurse_shift);
        formData.append("leave_reason", shiftData.leave_reason);
        formData.append("ot_type", shiftData.ot_type);
        formData.append("ot_hrs_shift", shiftData.ot_hrs_shift);
        formData.append("emp_id", selectedStaff.value);
        formData.append("staff_payable", shiftData.staff_payable);
        // formData.append("service_payable", shiftData.service_payable);

        // Log individual values just before appending
        console.log("emp_id:", selectedStaff.value);
        console.log("leave_reason:", shiftData.leave_reason);
        console.log("ot_hrs_shift:", shiftData.staff_nurse_shift);
        console.log(shiftData.ot_type);
        // ... log other values

        console.log("FormData before request:", formData);
        // ... Append form data here

        // Convert formData to a regular JSON object
        const jsonData = {};
        formData.forEach((value, key) => {
          jsonData[key] = value;
        });

        const response = await axios.post(
          `http://localhost:4040/api/shift/staffnurserosterotupdate/${shiftId}`,
          JSON.stringify(jsonData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Shift updated successfully!");
          Swal.fire(
            "Updated!",
            "The shift has been updated successfully.",
            "success"
          );

          // Access the response message and display it
          const responseData = response.data;
          Swal.fire("Success!", responseData.response, "success");

          // Navigate to shiftroster page
          navigate("/staffnurseroster");
        } else if (response.status === 204) {
          // Handle the case where data is not present
          Swal.fire("Error!", "Data not present.", "error");
        } else {
          throw new Error("Failed to update shift");
        }
      }
    } catch (error) {
      console.error("Error updating shift:", error);
      Swal.fire("Error!", "Failed to update shift.", "error");

      // Show specific error message if available
      if (error.response && error.response.data) {
        Swal.fire("Error!", error.response.data, "error");
      } else {
        Swal.fire("Error!", "Internal Server Error", "error");
      }
      // ... handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="container mx-auto">
     
        <div>
          <h5 className="pt-44 subheading ">Staff Nurse Allocation Update</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2">
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Shift Name:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="ot_shift"
              />
              <input
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                readOnly
                type="text"
                id="ot_shift"
                name="ot_shift"
                value={getshift(shiftData.staff_nurse_shift)}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Staff ID:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="emp_id"
              />

              <Select
                className="flex-1 w-full h-10 mx-2 form-select"
                name="emp_id"
                value={selectedStaff}
                onChange={handleStaffChange}
                options={staffOptions}
                required
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Staff Source:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="staff_source"
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
                Staff Payable:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="staff_payable"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="staff_payable"
                name="staff_payable"
                value={shiftData.staff_payable}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Service Payable:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="service_payable"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="service_payable"
                name="service_payable"
                value={shiftData.service_payable}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Shift / Extended
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="ot_type"
              />

              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                name="ot_type"
                id="ot_type"
                value={shiftData.ot_type}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Extended">Hours OT</option>
                <option value="Shift">Shift OT</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                OT
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor=" ot_hrs_shift"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id=" ot_hrs_shift"
                name="ot_hrs_shift"
                value={shiftData.ot_hrs_shift}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Reason:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="leave_reason"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="leave_reason"
                name="leave_reason"
                value={shiftData.leave_reason}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 my-5 text-white bg-blue-500 rounded"
          >
            Update Shift
          </button>
        </form>
      </div>
    </div>
  );
}

export default StaffShiftrosterUpdate;
