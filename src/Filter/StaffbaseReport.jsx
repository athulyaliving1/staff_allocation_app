import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { URLDevelopment } from "../utilities/Url";
import Datepicker from "react-tailwindcss-datepicker";
import DataTable from "react-data-table-component";
import Papa from "papaparse";
import axios from "axios";
import useSWR from "swr";





function StaffbaseReport() {
  const [selectedCity, setSelectedCity] = useState("");
  const [branchLocations, setBranchLocations] = useState([]);
  const [towerInfo, setTowerInfo] = useState([]);
  const [towerId, setTowerId] = useState("");
  const [towers, setTowerData] = React.useState([]);
  const [floorId, setFloorId] = useState("");

  const [sectionId, setSectionId] = useState("");
  const [floorInfo, setFloorInfo] = useState([]);
  const [sectioninfo, setSectionInfo] = useState([]);
  const [baseReport, setBaseReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [sections, setSectionData] = React.useState([]);

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  // console.log(value.startDate);
  // console.log(value.endDate);
  // console.log(floorId);
  // console.log(sectionId);

  // console.log(selectedCity);
  // console.log(towerId);


  const columns = [
    {
      name: "Employee ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "Full Name",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => formatDate(row.schedule_date),
      sortable: true,
    },
    {
      name: "Branch Name",
      selector: (row) => row.branch_name,
      sortable: true,
    },
    {
      name: "Duty Name",
      selector: (row) => row.duty_name,
      sortable: true,
    },
    {
      name: "Tower",
      selector: (row) => getTower(row.tower),
      sortable: true,
    },
    {
      name: "Master Floor",
      selector: (row) => row.floor_name,
      sortable: true,
    },
    {
      name: "Section Id",
      selector: (row) => getsection(row.section_id),
      sortable: true,
    }

  ]

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

  const handleExportToCSV = () => {
    if (!selectedRows.length) {
      console.log("No rows selected for export.");
      return;
    }
    console.log(selectedRows);
    // Filter the shiftRoster based on selectedRows
    const selectedData = baseReport.filter((row) =>
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




  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }



  //------------------------------------------------------------------------------------------------

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };




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
















  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  useEffect(() => {
    fetchBranchLocations();
    if (towerId != null) {
      fetchFloorInfo;
    }
  }, [floorId]);

  //---------------------------------------------------------------Location data Fetching--------------------------------------------------------------------

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

  //---------------------------------------------------------------Tower data Fetching--------------------------------------------------------------------

  const fetchBranchesTower = async (branchId) => {
    console.log(branchId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/getTowers?branch_id=${branchId}`
      );
      const data = await response.json();
      console.log(data);
      setTowerInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching branch locations:", error);
    }
  };

  const fetchFloorInfo = async (branchId, towerId) => {
    console.log(branchId);
    console.log(towerId);

    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/floor?branch_id=${branchId}&tower_id=${towerId}`
      );
      const data = await response.json();
      setFloorInfo(data);

      console.log(data);
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };
  //---------------------------------------------------------------Section data Fetching--------------------------------------------------------------------

  const fetchSectionInfo = async (branchId, floorId) => {
    console.log(floorId);
    console.log(branchId);
    try {
      const response = await fetch(
        `${URLDevelopment}/api/branches/section/${branchId}/${floorId}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Log the response data to see its structure
      setSectionInfo(data); // Make sure data is an array with 'section' property
    } catch (error) {
      console.error("Error fetching floor info:", error);
    }
  };

  //--------------------------------------------------------------- Get City Id --------------------------------------------------------------------------------
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    fetchBranchesTower(cityId);
    console.log(cityId);
  };

  //--------------------------------------------------------------- Get Shift Id --------------------------------------------------------------------------------

  //--------------------------------------------------------------- Get Tower Id --------------------------------------------------------------------------------
  const handleTowerChange = (e) => {
    const towerId = e.target.value;
    setTowerId(towerId);
    fetchFloorInfo(selectedCity, towerId);
    // Fetch section info with the selected floorId and branchId
    console.log(towerId);
  };

  //--------------------------------------------------------------- Get Floor Id --------------------------------------------------------------------------------
  const handleFloorsChange = (e) => {
    const floorId = e.target.value;
    // Use the selected locationId as the branchId

    setFloorId(floorId);
    fetchSectionInfo(selectedCity, floorId);

    console.log(floorId);
  };

  //--------------------------------------------------------------- Get Section Id --------------------------------------------------------------------------------
  const handleSectionChange = (e) => {
    const floorId = e.target.value;
    // const branchId = e.target.value;
    setSectionId(floorId); // Update the sectionId state with the selected floorId
    // fetchBranchLocations(branchId);

    // Fetch section information based on the selected floorId and branchId
    // fetchSectionInfo(floorId);

    // Assuming locationId is the selected branchId

    console.log(floorId);
  };

  //---------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true
      // Build the URL with query parameters
      const apiUrl = `${URLDevelopment}/api/staff_base_report/reports?from_date=${value.startDate
        }&to_date=${value.endDate}&branch_id=${selectedCity}&tower=${towerId}${floorId ? `&floor=${floorId}` : ""
        }${sectionId ? `&section=${sectionId}` : ""}`;

      // Send a GET request with Axios
      const response = await axios.post(apiUrl);
      if (response.status === 200) {
        const responseData = response.data.Result;
        setBaseReport(responseData);
        console.log(responseData);
      } else {
        console.error("API Request Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                Tower:
              </div>
              <label className="block mb-2 text-sm font-xl" htmlFor="tower" />

              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={towerId}
                onChange={handleTowerChange}
                id="tower"
              >
                <option value="">Select Branch Tower</option>
                {towerInfo.map((tower) => (
                  <option key={tower.id} value={tower.towerno}>
                    {tower.tower}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Floor:
              </div>
              <label className="hidden mb-2 text-sm font-xl" htmlFor="floor" />

              <select
                className="hidden w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={floorId}
                onChange={handleFloorsChange}
                id="floor"
              >
                <option value="">Select Branch Floor</option>
                {floorInfo.map((flr) => (
                  <option key={flr.id} value={flr.floor}>
                    {flr.floor}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden mb-4">
              <div className="h-6 mx-2 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Section:
              </div>
              <label className="block mb-2 text-sm font-xl" htmlFor="section" />

              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={sectionId}
                onChange={handleSectionChange}
                id="section"
              >
                <option value="">Select Branch Floor</option>
                {sectioninfo.map((sec) => (
                  <option key={sec.id} value={sec.section}>
                    {sec.section}
                  </option>
                ))}
              </select>
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
        <div className="my-10">
          <div>



            <button
              className="my-5 group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#ed4880] before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
              onClick={handleExportToCSV}
            >
              {" "}



              <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
                Export to CSV
              </span>



            </button>
            {isLoading ? (

              <div className="flex">
                <div className="w-full mt-2 ml-4">
                  <h3 className="h-4 bg-gray-200 rounded-md " ></h3>
                  <ul className="mt-5 space-y-3">
                    <li className="w-full h-4 bg-gray-200 rounded-md "></li>
                    <li className="w-full h-4 bg-gray-200 rounded-md "></li>
                    <li className="w-full h-4 bg-gray-200 rounded-md "></li>
                    <li className="w-full h-4 bg-gray-200 rounded-md "></li>
                  </ul>
                </div>
              </div>

            ) : (

              <DataTable
                columns={columns}
                data={baseReport}
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationTotalRows={baseReport ? baseReport.length : 0}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffbaseReport;
