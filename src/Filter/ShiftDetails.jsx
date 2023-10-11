import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import { URLDevelopment } from "../utilities/Url";
import Datepicker from "react-tailwindcss-datepicker";
import axios from "axios";
import DataTable from "react-data-table-component";
import Papa from "papaparse"
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
  const [selectedRows, setSelectedRows] = React.useState([]);



  useEffect(() => {
    fetchBranchLocations();
    fetchEmployees();

  }, []);


  const columns = [
    {
      name: "EMPLOYEE ID",
      selector: (row) => row.employee_id,
      sortable: true,
    },
    {
      name: "FULL NAME",
      selector: (row) => row.full_name,
      sortable: true,
    },
    {
      name: "BRANCH NAME",
      selector: (row) => row.branch_name,
      sortable: true,
    },
    {
      name: "RESOURCE",
      selector: (row) => row.resource,
      sortable: true,
    },
    {
      name: "STAFF TYPE",
      selector: (row) => row.staff_type,
      sortable: true,
    },
    {
      name: "STAFF CATEGORY",
      selector: (row) => row.staff_category,
      sortable: true,
    },
    {
      name: "WORKED",
      selector: (row) => row.worked,
      sortable: true,
    },
    {
      name: "SHIFT",
      selector: (row) => row.shift,
      sortable: true,
    },
    {
      name: "OT HOURS",
      selector: (row) => row.OT_Hours,
      sortable: true,
    },
    {
      name: "LEAVE",
      selector: (row) => row.leave,
      sortable: true,
    },
    {
      name: "TOTAL PAYABLE",
      selector: (row) => row.total_payable,
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
        value: staff.id,
        label: `${staff.employee_id} - ${staff.full_name}`,
        vendorid: `${staff.vendor_id}`,
      }));
      setStaffOptions(staffOptions);
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };


  const handleExportToCSV = () => {
    if (!selectedRows.length) {
      console.log("No rows selected for export.");
      return;
    }
    console.log(selectedRows);
    // Filter the shiftRoster based on selectedRows
    const selectedData = ShiftDetails.filter((row) =>
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

  console.log("Shift Roster Data:", ShiftDetails);
  console.log("Selected Data:", selectedRows);







  //-------


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); //Set loading state to true
      // Build the URL with query parameters

      console.log(value.startDate);
      console.log(value.endDate);
      console.log(selectedCity);
      console.log(selectedStaff);


      const apiUrl = `${URLDevelopment}/api/shiftdetails/reports?from_date=${value.startDate}&to_date=${value.endDate}&branch_id=${selectedCity}&staff_id=${selectedStaff.value}`;

      // Send a GET request with Axios
      const response = await axios.post(apiUrl);
      if (response.status === 200) {
        const responseData = response.data.Result;
        setShiftDetails([responseData]);
        console.log(responseData);
      } else {
        console.error("API Request Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="container mx-auto lg:pl-60 xl:pl-60">
        <Dashboard />
        <div>
          <h5 className="pt-44 subheading">Staff Details</h5>
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
        <div className="my-10">
          <button
            className="my-5   group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-300 relative before:absolute before:bg-[#ed4880] before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
            onClick={handleExportToCSV}
          >
            {" "}
            <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
              Export to CSV
            </span>
          </button>

          {isLoading ? (

            <div className="flex my-5">
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
              data={ShiftDetails}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
              paginationTotalRows={ShiftDetails ? ShiftDetails.length : 0}
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
  );
}

export default StaffShiftDetails;
