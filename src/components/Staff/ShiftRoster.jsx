import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
// import ShiftRosterUpdate from "./ShiftRosterUpdate";
// import MasterDuty from "./../MasterDuty";
import { URLDevelopment } from "../../utilities/Url";
import Dashboard from "../Dashboard";
import NavBar from "../Basic/NavBar";
import useSWR from "swr";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import Papa from "papaparse";

import "../Pagination.css";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

const customStyles = {
  rows: {
    style: {
      minHeight: "60px", // override the row height
      backgroundColor: "#f0f0f0", // Background color for header cells
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "16px", // Font size for header cells
      fontWeight: "bold",
      backgroundColor: "#166291", // Background color fo
      textAlign: "center",
      color: "white",
      whiteSpace: "nowrap",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "16px",
      fontWeight: "normal",
    },
  },
  
};


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

function ShiftRoster() {
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
  const [towers, setTowerData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  // const handleClose = () => setOpen(false);
  // const handleClickOpen = () => setOpen(true);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "BRANCH ID",
      selector: (row) => getBranchName(row.branch_id),
      sortable: true,
    },
    {
      name: "USER ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "ROOM NO",
      selector: (row) => row.room_no,
      sortable: true,
    },
    {
      name: "BED NUMBER",
      selector: (row) => getBed(row.bed_id),
      sortable: true,
    },
    {
      name: "Duty TYPE",
      selector: (row) => getdutyname(row.duty_type_id),
      sortable: true,
    },
    {
      name: "TOWER",
      selector: (row) => getTower(row.tower),
      sortable: true,
    },
    {
      name: "FLOOR",
      selector: (row) => getfloorData(row.floor),
      sortable: true,
    },
    {
      name: "SECTION ID",
      selector: (row) => getsection(row.section_id),
      sortable: true,
    },
    {
      name: "STAFF ID",
      selector: (row) => getStaff(row.staff_id),
      sortable: true,
    },
    {
      name: "STAFF SOURCE",
      selector: (row) => row.staff_source,
      sortable: true,
    },
    {
      name: "STAFF SHIFT",
      selector: (row) => getshift(row.shift),
      sortable: true,
    },
    {
      name: "STAFF PAYABLE",
      selector: (row) => row.staff_payable,
      sortable: true,
    },
    {
      name: "SERVICE PAYABLE",
      selector: (row) => row.service_payable,
      sortable: true,
    },
    {
      name: "SCHEDULE DATE",
      selector: (row) => formatDate(row.schedule_date),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="grid grid-cols-1 gap-3 py-4 font-normal text-customblack">
          <button
            className="primary-button"
            onClick={() => handleUpdateShiftRoster(row.id)}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteShiftRoster(row.id)}
            className="secondary-button"
          >
            Delete
          </button>
        </div>
      ),
      button: true, // Indicates this is a button column
    },
  ];

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  //------------------------------------------------------------------------------------------------ Roster Fetch---------------------------------------------------------------------------------------

  // UseSWR to fetch initial data and set up revalidations
  const { data: shiftRoster, error } = useSWR(
    `${URLDevelopment}/api/shift/roster`,
    fetcher,
    {
      refreshInterval: 5000, // Revalidate every 60 seconds
    }
  );

  //-------------------------------------------------------------------------------------------------- Master Branch---------------------------------------------------------------------------------------

  const { data: branchesData } = useSWR(
    `${URLDevelopment}/api/shift/masterbranches`,
    fetcher
  );

  useEffect(() => {
    if (branchesData) {
      setBranches(branchesData);
    }
  }, [branchesData]);

  //-------------------------------------------------------------------------------------------------- Find Branch------------------------------------------------------------------------------------

  function getBranchName(branchId) {
    if (!branches || branches.length === 0) {
      return "Unknown Branch";
    }

    const matchingBranch = branches.find((branch) => branch.id === branchId);
    return matchingBranch ? matchingBranch.branch_name : "Unknown Branch";
  }

  //-------------------------------------------------------------------------------------------------- Staff Search-------------------------------------------------------------------------------------

  const { data: staffData } = useSWR(
    `${URLDevelopment}/api/staff/staffsearch`,
    fetcher
  );

  useEffect(() => {
    if (staffData) {
      setStaffData(staffData);
    }
  }, [staffData]);

  //-------------------------------------------------------------------------------------------------- Find Staff---------------------------------------------------------------------------------------------

  function getStaff(staffId) {
    console.log(staffId);
    if (!staffData || staffData.length === 0) {
      return "Unknown Staff";
    }

    const matchingStaff = staffs.find((staff) => staff.id === staffId);
    return matchingStaff ? matchingStaff.full_name : "Unknown Staff";
  }

  //------------------------------------------------------------------------------------------------ Shift Search------------------------------------------------------------------------------------

  const { data: shiftData } = useSWR(
    `${URLDevelopment}/api/shift/shiftsearch`,
    fetcher
  );

  useEffect(() => {
    if (shiftData) {
      setShiftData(shiftData);
    }
  }, [shiftData]);

  //------------------------------------------------------------------------------------------------- Find Shift-----------------------------------------------------------------------------------------

  function getshift(shiftId) {
    console.log(shiftId);
    console.log(shifts);

    if (!shiftData || shiftData.length === 0) {
      return "Unknown Shift";
    }

    const matchingShift = shifts.find((shift) => shift.id === shiftId);
    return matchingShift ? matchingShift.shift_name : "Unknown Shift";
  }

  //-------------------------------------------------------------------------------------------------Fetch Duty-----------------------------------------------------------------------------

  const { data: dutyData } = useSWR(
    `${URLDevelopment}/api/floor/masterduty`,
    fetcher
  );

  useEffect(() => {
    if (dutyData) {
      setDutyData(dutyData);
    }
  }, [dutyData]);

  //--------------------------------------------------------------------------------------------------Find Duty------------------------------------------------------------------------------

  function getdutyname(dutyId) {
    console.log(dutyId);

    if (!dutyData || dutyData.length === 0) {
      return "Unknown dutydata";
    }

    const matchingduty = dutys.find((duty) => duty.id === dutyId);
    return matchingduty ? matchingduty.duty_name : "Unknown duty";
  }

  //--------------------------------------------------------------------------------------------------Fetch Floor-----------------------------------------------------------------------------

  const { data: floorData } = useSWR(
    `${URLDevelopment}/api/shiftroster/masterfloor`,
    fetcher
  );

  useEffect(() => {
    if (floorData) {
      setFloorData(floorData);
    }
  }, [floorData]);

  //--------------------------------------------------------------------------------------------------Find Floor---------------------------------------------------------------------------------

  function getfloorData(floorId) {
    if (!floorData || floorData.length === 0) {
      return "Unknown Floor";
    }

    const matchingFloor = floor.find((flr) => flr.id === floorId);

    return matchingFloor ? matchingFloor.floor : "Unknown Floor";
  }

  //--------------------------------------------------------------------------------------------------Fetch Sections-----------------------------------------------------------------------------
  const { data: sectionData } = useSWR(
    `${URLDevelopment}/api/shift/masterSection`,
    fetcher
  );

  useEffect(() => {
    if (sectionData) {
      setSectionData(sectionData);
    }
  }, [sectionData]);

  //-------------------------------------------------------------------------------------------------- Find Section-------------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------------------------------Fetch MasterBeds--------------------------------------------------------------------------------

  const { data: bedData } = useSWR(
    `${URLDevelopment}/api/shift/masterbeds`,
    fetcher
  );

  useEffect(() => {
    if (bedData) {
      setBedData(bedData);
    }
  }, [bedData]);

  //--------------------------------------------------------------------------------------------------Find Beds--------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------------------------

  const { data: towerData } = useSWR(
    `${URLDevelopment}/api/branches/masterTower`,
    fetcher
  );

  function getTower(TowerId) {
    if (!towerData || towerData.length === 0) {
      return "Unknown Tower";
    }

    console.log(TowerId);
    console.log(towerData);

    const matchingTower = towers.find((tower) => tower.id === TowerId);
    return matchingTower ? matchingTower.tower : "Unknown Tower";
  }

  useEffect(() => {
    if (towerData) {
      setTowerData(towerData);
    }
  }, [towerData]);

  //------------------------------------------------------------------------------------------------Formatt Date------------------------------
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const handleExportToCSV = () => {
    if (!selectedRows.length) {
      console.log("No rows selected for export.");
      return;
    }
    console.log(selectedRows);
    // Filter the shiftRoster based on selectedRows
    const selectedData = shiftRoster.filter((row) =>
      selectedRows.includes(row.id)
    );

    console.log("Selected Data for CSV Export:", selectedData);

    const csvData = Papa.unparse(selectedData, {
      quotes: true,
      header: true,
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "shift_roster.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleRowSelected = (rows) => {
    const selectedRowIds = rows.selectedRows.map((row) => row.id);
    setSelectedRows(selectedRowIds);
  };

  console.log("Shift Roster Data:", shiftRoster);
  console.log("Selected Data:", selectedRows);

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
          <button
            className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#ed4880] before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
            onClick={handleExportToCSV}
          >
            {" "}
            <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
              Export to CSV
            </span>
          </button>
          <DataTable
            columns={columns}
            data={shiftRoster}
            pagination
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationTotalRows={shiftRoster ? shiftRoster.length : 0}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
            selectableRows // Enable row selection
            onSelectedRowsChange={handleRowSelected}
            customStyles={customStyles} // Handle selected rows change
          />
        </div>
      </div>
    </div>
  );
}

export default ShiftRoster;
