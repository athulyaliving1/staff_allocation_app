import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Select from "react-select";
import { URLDevelopment } from "../../utilities/Url";
import Dashboard from "../Dashboard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ShiftRosterUpdate() {
  const [shiftData, setShiftData] = useState({
    branch_id: "",
    user_id: "",
    room_no: "",
    bed_no: "",
    duty_type_id: "",
    floor: "",
    section_id: "",
    staff_id: "",
    staff_source: "",
    shift: "",
    staff_payable: "",
    service_payable: "",
    employee_id: "",
    sectionname: "",
    floor_name: "",
    section_name: "",
    bed_number: "",
  });
  const [dutyOptions, setDutyOptions] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("");
  // const [selectedContent, setSelectedContent] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [vendordata, setVendordata] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState("");

  // console.log(shiftData.bed_number);
  // console.log(selectedStaff);
  console.log(shiftData.duty_type_id);

  const { shiftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchvendor(selectedVendorId);
    fetchShiftData(shiftId);
  }, [shiftId, selectedVendorId]);

  const fetchShiftData = async (shiftId) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/roster/${shiftId}`
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

  const fetchBranchData = async (branchId) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterbranch/${branchId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch branch data");
      }
      const data = await response.json();
      // console.log(data);
      setShiftData((prevState) => ({
        ...prevState,
        branch_name: data[0].branch_name,
      }));
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.branch_id) {
      fetchBranchData(shiftData.branch_id);
    }
  }, [shiftData.branch_id]);

  const getMasterDutyData = async (masterId) => {
    console.log(masterId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rostermasterduty/${masterId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch branch data");
      }
      const data = await response.json();
      console.log(data);
      console.log(data[0].id);
      setShiftData((prevState) => ({
        ...prevState,
        duty_type_id: data[0].id,
      }));
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  // useEffect(() => {
  //   if (shiftData.duty_type_id) {

  //     getMasterDutyData(shiftData.duty_type_id);
  //   }
  // }, [shiftData.duty_type_id]);

  const getMasterShiftData = async (shift) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rostermastershift/${shift}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      // console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        shiftname: data[0].shiftname,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.shift) {
      getMasterShiftData(shiftData.shift);
    }
  }, [shiftData.shift]);

  const getmasterStaffData = async (staff_id) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rostermasterstaff/${staff_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      // console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        employee_id: data[0].employee_id,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.staff_id) {
      getmasterStaffData(shiftData.staff_id);
    }
  }, [shiftData.staff_id]);

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

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    console.log(selectedOption.vendorid);
    setSelectedVendorId(selectedOption.vendorid);
  };

  const getFloorsSectionData = async (floor) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterfloorsection/${floor}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      // console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        floor_name: data[0].floor,
        section_name: data[0].sectionname,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.floor) {
      getFloorsSectionData(shiftData.floor);
      // console.log(shiftData.floor);
    }
  }, [shiftData.floor]);

  const getBedData = async (bed_no) => {
    console.log(bed_no);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterbed/${bed_no}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bed data");
      }
      const data = await response.json();
      // console.log(data);
      console.log(data[0].bed_number);

      setShiftData((prevState) => ({
        ...prevState,
        bed_number: data[0].bed_number,
        // bed_name:'C Block Bed 102',
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.bed_id) {
      // console.log(shiftData.bed_id);
      getBedData(shiftData.bed_id);
      // console.log(shiftData.bed_id);
    }
  }, [shiftData.bed_id]);

  const getRoomData = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterroom/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bed data");
      }
      const data = await response.json();
      // console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        bed_name: data,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.id) {
      getRoomData(shiftData.id);
      // console.log(shiftData.id);
    }
  }, [shiftData.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDutyOptions = async () => {
      try {
        const response = await fetch(`${URLDevelopment}/api/floor/masterduty`);
        const data = await response.json();
        // console.log(data);
        setDutyOptions(data);
      } catch (error) {
        console.error("Error fetching duty options:", error);
      }
    };

    fetchDutyOptions();
  }, []);

  const handleDutyChange = (e) => {
    const newValue = e.target.value;
    console.log("Selected Value:", newValue);

    // Update shiftData
    setShiftData((prevState) => ({
      ...prevState,
      duty_type_id: newValue,
    }));
    console.log(newValue);
    getMasterDutyData(newValue);
  };

  console.log("dutyOptions:", dutyOptions);

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

  // const handleDutyChange = (e) => {
  //   const newValue = e.target.value;
  //   setSelectedValue(newValue);

  //   // Find the selected option and set its content
  //   const selectedOption = dutyOptions.find((option) => option.id === newValue);
  //   setSelectedContent(selectedOption ? selectedOption.duty_name : "");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", shiftData); // Check if the data is correct

    // Create a new object with the fields to be updated
    const updatedData = {
      duty_type_id: shiftData.duty_type_id,
      staff_id: selectedStaff.employee_id,
      staff_payable: shiftData.staff_payable,
      service_payable: shiftData.service_payable,
    };

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
        const response = await fetch(
          `${URLDevelopment}/api/shiftallocation/floorallocationupdate/${shiftId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update shift");
        }

        console.log("Shift updated successfully!");
        Swal.fire(
          "Updated!",
          "The shift has been updated successfully.",
          "success"
        );

        // Navigate to shiftroster page
        navigate("/shiftroster");
      }
    } catch (error) {
      console.error("Error updating shift:", error);
      // ... handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="container mx-auto">
        <Dashboard />
        <div>
          <h5 className="pt-44 subheading ">Staff Allocation Update</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 xl:grid-cols-4 lg:grid-cols-2">
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Branch Name:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="branch_id"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="branch_id"
                name="branch_id"
                value={shiftData.branch_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                User ID:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="user_id"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="number"
                id="user_id"
                name="user_id"
                value={shiftData.user_id}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Room No:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="room_no"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="room_no"
                name="room_no"
                value={shiftData.room_no}
                onChange={handleChange}
              />
            </div>

            {/* <div>
            <label htmlFor="duty_type_id">Duty Type:</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              id="duty_type_id"
              value={shiftData.duty_name}
              onChange={handleDutyChange}
            >
              <option value="">Select an option</option>
              {dutyOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.duty_name}
                </option>
              ))}
            </select>

            {selectedContent && <div>Content for {selectedContent}</div>}
          </div> */}

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Staff ID:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="staff_id"
              />

              <Select
                className="flex-1 w-full h-10 mx-2 form-select"
                name="staff"
                value={selectedStaff}
                onChange={handleStaffChange}
                options={staffOptions}
                required
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Bed No:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="bed_name"
              />

              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="bed_name"
                name="bed_name"
                value={shiftData.bed_number}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Floor No:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="floor"
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="floor"
                name="floor"
                value={shiftData.floor_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Section ID:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="section_id"
              />

              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="section_id"
                name="section_id"
                value={shiftData.section_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Duty Type:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="duty_type_id"
              />
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                id="duty_type_id"
                onChange={handleDutyChange}
              >
                <option value="">Select Duty</option>
                {dutyOptions.map((duty) => (
                  <option value={duty.id} key={duty.id}>
                    {duty.duty_name}
                  </option>
                ))}

                {/* <option value={shiftData.duty_name}>{shiftData.duty_name}</option>
                {dutyOptions.map(
                  (option, index) =>
                      // <option key={option.id} value={option.id} selected>
                      //   {option.duty_name}
                      // </option>

                    option.duty_name === shiftData.duty_name ? (
                      <option key={option.id} value={option.id} selected>
                        {option.duty_name}
                      </option>
                    ) : (
                      <option key={option.id} value={option.id}>
                        {option.duty_name}
                      </option>
                    )
                    
                  //option.duty_name===shiftData.duty_name?(<option>test</option>):(<option>ttt</option>);
                )} */}
              </select>

              {/* {selectedContent && <div>Content for {selectedContent}</div>} */}
            </div>
            {/* <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              id="duty_type_id"
              name="duty_type_id"
              value={shiftData.duty_name}
              onChange={handleChange}
            /> */}

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
                Shift:
              </div>
              <label
                className="block mb-2 text-sm text-gray-600"
                htmlFor="shift"
              />

              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                id="shift"
                name="shift"
                value={shiftData.shiftname}
                onChange={handleChange}
              />
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
                type="number"
                id="staff_payable"
                name="staff_payable"
                value={shiftData.staff_payable}
                onChange={handleChange}
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
                type="number"
                id="service_payable"
                name="service_payable"
                value={shiftData.service_payable}
                onChange={handleChange}
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

export default ShiftRosterUpdate;
