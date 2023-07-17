import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  });

  const { shiftId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchShiftData(shiftId);
  }, [shiftId]);

  const fetchShiftData = async (shiftId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/shift/roster/${shiftId}`
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
        `http://localhost:4000/api/shift/rosterbranch/${branchId}`
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
        `http://localhost:4000/api/shift/rostermasterduty/${masterId}`
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/shift/rosterbranch/${shiftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shiftData),
        }
      );

      if (response.ok) {
        // Shift updated successfully
        Swal.fire({
          icon: "success",
          title: "Shift Updated",
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          navigate("/shiftroster");
        });
      } else {
        // Error occurred while updating shift
        console.error("Error updating shift");
      }
    } catch (error) {
      console.error("Error updating shift:", error);
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
          <div>
            <label htmlFor="duty_type_id">Duty Type:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="duty_type_id"
              name="duty_type_id"
              value={shiftData.duty_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bed_no">Bed No:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="text"
              id="bed_no"
              name="bed_no"
              value={shiftData.bed_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="floor">Floor No:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="number"
              id="floor"
              name="floor"
              value={shiftData.floor}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="section_id">Section ID:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="number"
              id="section_id"
              name="section_id"
              value={shiftData.section_id}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="staff_id">Staff ID:</label>
            <input
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              type="number"
              id="staff_id"
              name="staff_id"
              value={shiftData.staff_id}
              onChange={handleChange}
            />
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
              type="number"
              id="shift"
              name="shift"
              value={shiftData.shift}
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