import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import ShiftRosterUpdate from "./ShiftRosterUpdate";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const { data: shiftRoster, error } = useSWR(
    "http://localhost:4000/api/shift/roster",
    fetcher
  );












  

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
  return (
    <div>
      <div className="m-5 border border-gray-200 rounded-lg shadow-md table-auto">
        <table className="w-full text-sm font-semibold text-left bg-white border-collapse text-customblack">
          <thead className="text-xl bg-gray-50">
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
                Section ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-semibold text-customblack"
              >
                Staff ID
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
                Staff Payable
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
              <tr key={shift.id} className="hover:bg-gray-50 odd:bg-gray-100">
                <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{shift.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.branch_id}
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
                    {shift.bed_no}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.floor}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.section_id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.staff_id}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.staff_source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-customblack">
                    {shift.shift}
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
                    {shift.schedule_date}
                  </span>
                </td>

                <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                  <button
                    className="w-full px-5 py-2 mt-4 shadow-lg xl:text-xl primary-button rounded-xl"
                    onClick={() => handleUpdateShiftRoster(shift.id)}
                  >
                    Edit
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
  );
}

export default ShiftRoster;
