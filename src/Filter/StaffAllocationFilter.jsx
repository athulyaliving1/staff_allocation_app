import React, { useEffect } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { URLDevelopment } from "../utilities/Url";
import Dashboard from "../components/Dashboard";
import NavBar from "../components/Basic/NavBar";
import useSWR from "swr";
import Swal from "sweetalert2";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function StaffAllocationFilter() {
  // const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  // State to store the branches data
  const [branches, setBranches] = React.useState([]);
  const [staffs, setStaffData] = React.useState([]);
  const [shifts, setShiftData] = React.useState([]);
  const [dutys, setDutyData] = React.useState([]);
  const [floor, setFloorData] = React.useState([]);
  const [beds, setBedData] = React.useState([]);
  const [sections, setSectionData] = React.useState([]);

  // const handleClose = () => setOpen(false);
  // const handleClickOpen = () => setOpen(true);

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  // UseSWR to fetch initial data and set up revalidations
  const { data: shiftRoster, error } = useSWR(
    `${URLDevelopment}/api/shift/roster`,
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

  const { data: dutyData } = useSWR(
    `${URLDevelopment}/api/floor/masterduty`,
    fetcher
  );

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

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

  const { data: floorData } = useSWR(
    `${URLDevelopment}/api/shiftroster/masterfloor`,
    fetcher
  );

  useEffect(() => {
    if (floorData) {
      setFloorData(floorData);
    }
  }, [floorData]);

  function getfloorData(floorId) {
    if (!floorData || floorData.length === 0) {
      return "Unknown Floor";
    }

    const matchingFloor = floor.find((flr) => flr.id === floorId);

    return matchingFloor ? matchingFloor.floor : "Unknown Floor";
  }

  const { data: sectionData } = useSWR(
    `${URLDevelopment}/api/shift/masterSection`,
    fetcher
  );

  useEffect(() => {
    if (sectionData) {
      setSectionData(sectionData);
    }
  }, [sectionData]);

  function getsection(sectionId) {
    console.log(sectionId);
    console.log(sectionData);
    if (!sectionData || sectionData.length === 0) {
      return "Unknown Section";
    }

    const matchingSection = sections.find(
      (sec) => sec.id === parseInt(sectionId)
    );
    return matchingSection ? matchingSection.section_name : "Unknown Section";
  }

  const { data: bedData } = useSWR(
    `${URLDevelopment}/api/shift/masterbeds`,
    fetcher
  );

  useEffect(() => {
    if (bedData) {
      setBedData(bedData);
    }
  }, [bedData]);

  function getBed(BedId) {
    if (!bedData || bedData.length === 0) {
      return "Unknown Bed";
    }
    console.log(BedId);
    console.log(beds);
    console.log(bedData);

    const matchingBed = beds.find((bed) => bed.id === BedId);

    console.log(matchingBed);

    return matchingBed ? matchingBed.bed_number : "Unknown Bed";
  }

  useEffect(() => {
    if (bedData) {
      setBedData(bedData);
    }
  }, [bedData]);

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

  if (!shiftRoster) {
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

  const handleUpdateShiftRoster = (shiftId) => {
    navigate(`/shiftrosterupdate/${shiftId}`);
  };

  const handleDeleteShiftRoster = async (shiftId) => {
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
          `${URLDevelopment}/api/shift/shiftrosterdelete/${shiftId}`,

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

  return (
    <div className="">
      <NavBar />
      <Dashboard />
      <div className="">
        <div className="py-24 xl:py-36 pl-60">
          <div>
            <h1 className="pb-14 subheading">Daily Staff Duty Roster</h1>
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
                    Bed Number
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
                    Floor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Section Id
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
                    Staff Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-customblack"
                  >
                    Staff Shift
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-300 divide-y divide-gray-100">
                {shiftRoster.map((shift) => (
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
                        {shift.room_no}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getBed(shift.bed_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getdutyname(shift.duty_type_id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getfloorData(shift.floor)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-customblack">
                        {getsection(shift.section_id)}
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
                        {getshift(shift.shift)}
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

                    <td className="flex gap-3 px-6 py-4 font-normal text-customblack ">
                      <button
                        className=" tertiary-button"
                        onClick={() => handleUpdateShiftRoster(shift.id)}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteShiftRoster(shift.id)}
                        className=" secondary-button"
                      >
                        Delete
                      </button>

                      {/* <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                  >
                    <BootstrapDialogTitle
                      id="customized-dialog-title"
                      onClose={handleClose}
                    >
                      <button
                        onClick={() => handleUpdateShiftRoster(shift.id)}
                        className="flex justify-center p-2 font-sans text-xl font-semibold underline md:text-xl xl:text-3xl text-sky-800 md:p-5"
                      >
                        Edit Details
                      </button>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                      {open && <ShiftRosterUpdate shiftId={shift.id} />}


                      
                    </DialogContent>
                  </BootstrapDialog> */}
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

export default StaffAllocationFilter;
