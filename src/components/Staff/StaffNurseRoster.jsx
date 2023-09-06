import React, { useEffect } from "react";
import Dashboard from "../Dashboard";
import NavBar from "../Basic/NavBar";
import { URLDevelopment } from "../../utilities/Url";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function StaffNurseRoster() {
  const navigate = useNavigate();

  const [branches, setBranches] = React.useState([]);
  const [dutys, setDutyData] = React.useState([]);
  const [staffs, setStaffData] = React.useState([]);
  const [shifts, setShiftData] = React.useState([]);

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  // UseSWR to fetch initial data and set up revalidations
  const { data: staffnurseshiftRoster, error } = useSWR(
    `${URLDevelopment}/api/shift/staffnurseroster`,
    fetcher,
    {
      refreshInterval: 5000, // Revalidate every 60 seconds
    }
  );

  const { data: branchesData } = useSWR(
    `${URLDevelopment}/api/shift/masterbranches`,
    fetcher
  );

  useEffect(() => {
    if (branchesData) {
      setBranches(branchesData);
    }
  }, [branchesData]);

  function getBranchName(branchId) {
    if (!branches || branches.length === 0) {
      return "Unknown Branch";
    }

    const matchingBranch = branches.find((branch) => branch.id === branchId);
    return matchingBranch ? matchingBranch.branch_name : "Unknown Branch";
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const { data: dutyData } = useSWR(
    `${URLDevelopment}/api/floor/masterduty`,
    fetcher
  );

  useEffect(() => {
    if (dutyData) {
      setDutyData(dutyData);
    }
  }, [dutyData]);

  function getdutyname(dutyId) {
    console.log(dutyId);

    if (!dutyData || dutyData.length === 0) {
      return "Unknown dutydata";
    }

    const matchingduty = dutys.find((duty) => duty.id === dutyId);
    return matchingduty ? matchingduty.duty_name : "Unknown duty";
  }

  const { data: staffData } = useSWR(
    `${URLDevelopment}/api/staff/staffsearch`,
    fetcher
  );

  useEffect(() => {
    if (staffData) {
      setStaffData(staffData);
    }
  }, [staffData]);

  function getStaff(staffId) {
    console.log(staffId);
    if (!staffData || staffData.length === 0) {
      return "Unknown Staff";
    }

    const matchingStaff = staffs.find((staff) => staff.id === staffId);
    return matchingStaff ? matchingStaff.full_name : "Unknown Staff";
  }

  function getAttendanceStatus(status, otType) {
    if (status === 0 || otType === 0) {
      return "Leave";
    } else if (status === 1) {
      return "Present";
    } else {
      return "Unknown";
    }
  }

  function getTypeOtHrsShift(status, extendedHours) {
    if (status === 0 || extendedHours === 0) {
      return "Nil";
    } else if (status === "Extended") {
      return `${extendedHours} Hrs Extended`;
    } else if (status === "Shift") {
      return `${extendedHours} Shift`;
    } else {
      return "Unknown";
    }
  }

  const { data: shiftData } = useSWR(
    `${URLDevelopment}/api/shift/shiftsearch`,
    fetcher
  );

  useEffect(() => {
    if (shiftData) {
      setShiftData(shiftData);
    }
  }, [shiftData]);

  function getshift(shiftId) {
    console.log(shiftId);
    console.log(shifts);

    if (!shiftData || shiftData.length === 0) {
      return "Unknown Shift";
    }

    const matchingShift = shifts.find((shift) => shift.id === shiftId);
    return matchingShift ? matchingShift.shift_name : "Unknown Shift";
  }

  const handleStaffsUpdateShiftRoster = (shiftId) => {
    navigate(`/staffshiftrosterupdate/${shiftId}`);
  };

  const handleDeleteStaffShiftRoster = async (shiftId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this shift roster!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const apiresponse = await fetch(
          `${URLDevelopment}/api/shift/staffshiftrosterdelete/${shiftId}`,

          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers if needed
            },
          }
        );

        console.log(apiresponse);

        if (apiresponse.response.status === "Shift deleted") {
          // Successful deletion
          Swal.fire(
            "Deleted!",
            "The shift roster has been deleted.",
            "success"
          );
          // You can perform additional actions like updating the UI or refetching data
        } else {
          // Handle error cases
          Swal.fire("Error", "Error deleting shift roster", "error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (error) {
    return (
      <div>
        <section className="flex items-center h-full sm:p-16 ">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-40 h-40 "
            >
              <path
                fill="currentColor"
                d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
              ></path>
              <rect
                width="176"
                height="32"
                x="168"
                y="320"
                fill="currentColor"
              ></rect>
              <polygon
                fill="currentColor"
                points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
              ></polygon>
              <polygon
                fill="currentColor"
                points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
              ></polygon>
            </svg>
            <p className="text-3xl">
              Looks like our services are currently offline
            </p>
            <p>Error fetching shift roster</p>
          </div>
        </section>
      </div>
    );
  }

  if (!staffnurseshiftRoster) {
    return (
      <div>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y- animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <p className="w-32 h-2 bg-gray-200 rounded-lg "></p>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-20 h-2 bg-gray-200 rounded-lg "></p>
              <p className="w-8 h-8 bg-gray-200 rounded-full "></p>
            </div>
          </div>
        </section>
        <section className="bg-white ">
          <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
              <p className="w-32 h-2 bg-gray-200 rounded-lg "> Loading...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="">
      <NavBar />
      <Dashboard />
      <div className="">
        <div className="py-24 xl:py-36 pl-60">
          <div>
            <h1 className="pb-14 subheading">Daily Staff Nurse Duty Roster</h1>
          </div>
          <div className="border border-gray-200 rounded-lg shadow-md ">
            <table className="w-full text-sm font-semibold text-left bg-white border-collapse table-auto text-customblack">
              <thead className="text-xl uppercase bg-gray-50 whitespace-nowrap">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Branch Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    User Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Room No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Floor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Duty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Source
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Nurse Shift
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Payable
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Service Payable
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Schedule Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Attendance Status
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    OT Shift/Hrs
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-300 divide-y divide-gray-100">
                {staffnurseshiftRoster.map((shift) => (
                  <tr
                    key={shift.id}
                    className="hover:bg-gray-50 odd:bg-gray-100"
                  >
                    <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {shift.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getBranchName(shift.branch_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {shift.user_id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getdutyname(shift.duty_type_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {shift.floor}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getStaff(shift.staff_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {shift.staff_source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getshift(shift.staff_nurse_shift)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {shift.staff_payable}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {shift.service_payable}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {formatDate(shift.schedule_date)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getAttendanceStatus(shift.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getTypeOtHrsShift(shift.ot_type, shift.ot_hrs_shift)}
                      </span>
                    </td>

                    <td className="flex gap-3 px-6 py-4 font-normal text-customblack ">
                      <button
                        className=" tertiary-button"
                        onClick={() => handleStaffsUpdateShiftRoster(shift.id)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStaffShiftRoster(shift.id)}
                        className=" secondary-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffNurseRoster;
