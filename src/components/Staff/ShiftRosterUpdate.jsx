import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import { URLDevelopment } from "../../utilities/Url";

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
    bed_name: "",
  });
  const [dutyOptions, setDutyOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  console.log(selectedStaff);
  console.log(dutyOptions);

  const { shiftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShiftData(shiftId);
  }, [shiftId]);

  const fetchShiftData = async (shiftId) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/roster/${shiftId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      console.log(data[0]);
      setShiftData(data[0]);
      console.log(data[0].branch_id);
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
      console.log(data);
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
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rostermasterduty/${masterId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch branch data");
      }
      const data = await response.json();
      console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        duty_name: data[0].duty_name,
      }));
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.duty_type_id) {
      getMasterDutyData(shiftData.duty_type_id);
    }
  }, [shiftData.duty_type_id]);

  const getMasterShiftData = async (shift) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rostermastershift/${shift}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      console.log(data);

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
      console.log(data);

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

  const getFloorsSectionData = async (floor) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterfloorsection/${floor}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shift data");
      }
      const data = await response.json();
      console.log(data);

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
      console.log(shiftData.floor);
    }
  }, [shiftData.floor]);

  const getBedData = async (bed_no) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterbed/${bed_no}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bed data");
      }
      const data = await response.json();
      console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        bed_name: data[0].bed_number,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.bed_id) {
      getBedData(shiftData.bed_id);
      console.log(shiftData.bed_id);
    }
  }, [shiftData.bed_id]);

  const getRoomData = async (room_no) => {
    try {
      const response = await fetch(
        `${URLDevelopment}/api/shift/rosterroom/${room_no}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bed data");
      }
      const data = await response.json();
      console.log(data);

      setShiftData((prevState) => ({
        ...prevState,
        bed_name: data[0].bed_number,
      }));
    } catch (error) {
      console.error("Error fetching shift data:", error);
    }
  };

  useEffect(() => {
    if (shiftData.room_no) {
      getRoomData(shiftData.room_no);
      console.log(shiftData.room_no);
    }
  }, [shiftData.room_no]);

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
        console.log(data);
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
      duty_name: newValue,
    }));
  };

  console.log("dutyOptions:", dutyOptions);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${URLDevelopment}/api/staff/staffsearch`);
        const data = await response.json();
        console.log(data);
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

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
  };

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
      duty: shiftData.duty_name,
      staff_id: selectedStaff.employee_id,
      staff_payable: shiftData.staff_payable,
      service_payable: shiftData.service_payable,
    };

    try {
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
      // ... rest of the code, e.g., show success message, redirect, etc.
    } catch (error) {
      console.error("Error updating shift:", error);
      // ... handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-5 text-3xl font-bold">Update Shift</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="branch_id">Branch Name:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="branch_id"
              name="branch_id"
              value={shiftData.branch_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="user_id">User ID:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="number"
              id="user_id"
              name="user_id"
              value={shiftData.user_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="room_no">Room No:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
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
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
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

          <div>
            <label htmlFor="duty_type_id">Duty Type:</label>
            <select
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              id="duty_type_id"
              onChange={handleDutyChange}
            >
              {/* <option value={shiftData.duty_name}>{shiftData.duty_name}</option> */}
              {dutyOptions.map(
                (option, index) =>
                  //   <option key={option.id} value={option.id} selected>
                  //     {option.duty_name}
                  //   </option>

                  option.duty_name == shiftData.duty_name ? (
                    <option key={option.id} value={option.id} selected>
                      {option.duty_name}
                    </option>
                  ) : (
                    <option key={option.id} value={option.id}>
                      {option.duty_name}
                    </option>
                  )
                //option.duty_name===shiftData.duty_name?(<option>test</option>):(<option>ttt</option>);
              )}
            </select>

            {/* {selectedContent && <div>Content for {selectedContent}</div>} */}
          </div>
          {/* <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="duty_type_id"
              name="duty_type_id"
              value={shiftData.duty_name}
              onChange={handleChange}
            /> */}

          <div>
            <label htmlFor="bed_name">Bed No:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="bed_name"
              name="bed_name"
              value={shiftData.bed_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="floor">Floor No:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="floor"
              name="floor"
              value={shiftData.floor_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="section_id">Section ID:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="section_id"
              name="section_id"
              value={shiftData.section_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="staff_id">Staff ID:</label>

            <Select
              className="flex-1 w-full h-10 mx-2 form-select"
              name="staff"
              value={selectedStaff}
              onChange={handleStaffChange}
              options={staffOptions}
            />

            {/* <select>

            
              {staffOptions.map(
              (options,index) => (
                
                     options.employee_id == shiftData.employee_id  ?  (             
                      <option key={options.id} value={options.id} selected>
                        {options.employee_id}</option>
                     
                      
                     )  : (
                       
                      <option key={options.id} value={options.id}>
                        {options.employee_id}</option>                                            
                     )                                               
              )
                  )}    

            </select> */}

            {/* {staffOptions == null ? (
              <Select
                className="flex-1 w-full h-10 mx-2 form-select"
                name="staff"
                value={selectedStaff}
                onChange={handleStaffChange}
                options={staffOptions}
              />
            ) : (
              <input
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                type="text"
                id="staff_id"
                name="staff_id"
                value={shiftData.employee_id}
                onChange={handleChange}
              />
            )} */}

            {/* <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="staff_id"
              name="staff_id"
              value={shiftData.employee_id}
              onChange={handleChange}
            /> */}
          </div>
          <div>
            <label htmlFor="staff_source">Staff Source:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="staff_source"
              name="staff_source"
              value={shiftData.staff_source}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="shift">Shift:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="shift"
              name="shift"
              value={shiftData.shiftname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="staff_payable">Staff Payable:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="number"
              id="staff_payable"
              name="staff_payable"
              value={shiftData.staff_payable}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="service_payable">Service Payable:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
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
  );
}

export default ShiftRosterUpdate;
