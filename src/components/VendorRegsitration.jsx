import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createVendor,
  updateVendor,
  vendorDelete,
  fetchvendorlist,
} from "../features/Action";

import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
// import NavBar from "./Basic/NavBar";
import PropTypes from "prop-types"; 


function VendorRegistration({
  createVendor,
  vendorData,
  loading,
  error,
  fetchvendorlist,
  vendorDelete,
}) {
  useEffect(() => {
    fetchvendorlist();
  }, [fetchvendorlist]);

  const navigate = useNavigate();
  const [newVendorData, setNewVendorData] = useState({
    name: "",
    address: "",
    email: "",
    abbr: "",
    contact: "",
  });

  const handleCreateVendor = async () => {
    try {
      await createVendor(newVendorData);
      setNewVendorData({
        name: "",
        address: "",
        email: "",
        abbr: "",
        contact: "",
      }); // Reset the input fields

      Swal.fire({
        icon: "success",
        title: "Vendor Created",
        text: "Vendor has been successfully created.",
      }).then(() => {
        window.location.reload(); // Reload the window
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const handleUpdateVendor = (id) => {
    // Redirect to the update page
    navigate(`/update-vendor/${id}`);
  };

  const handleDeleteVendor = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await vendorDelete(id);
        Swal.fire("Deleted!", "The vendor has been deleted.", "success").then(
          () => {
            navigate("/");
          }
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    }
  };

  const handleChange = (e) => {
    setNewVendorData({ ...newVendorData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100">
      <div className="w-full h-full ">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="bg-gray-100 ">
            <div className="container mx-auto lg:pl-60 xl:pl-60">
              <Dashboard />
              <div>
                <h5 className="pt-44 subheading">Vendor Registration</h5>
              </div>
              <div className="grid w-full gap-6 py-5 mx-auto bg-gray-100 xl:grid-cols-3">
                <div className="flex flex-col space-y-1 ">
                  <label
                   htmlFor="name"
                    className="text-sm font-semibold text-customblack"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newVendorData.name}
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    onChange={handleChange}
                    placeholder="Vendor name"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold text-customblack"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    value={newVendorData.address}
                    onChange={handleChange}
                    placeholder="Vendor address"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-customblack"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    value={newVendorData.email}
                    onChange={handleChange}
                    placeholder="Vendor email"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-customblack"
                  >
                    Abbr
                  </label>
                  <input
                    type="text"
                    name="abbr"
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    value={newVendorData.abbr}
                    onChange={handleChange}
                    placeholder="Vendor abbr"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-customblack"
                  >
                    Contact
                  </label>
                  <input
                    type="number"
                    name="contact"
                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                    value={newVendorData.contact}
                    onChange={handleChange}
                    placeholder="Vendor contact"
                    required
                  />
                </div>
                <div className="my-5">
                  <button
                    onClick={handleCreateVendor}
                    className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-secondary before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
                  >
                    <span className="relative z-0 text-black transition duration-500 ease-in-out group-hover:text-gray-200">
                      Add Vendor
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <h5 className="pb-5 subheading">Vendor List</h5>
              </div>

              <div className="bg-gray-50">
                <div className="w-full border border-gray-200 table-auto">
                  <table className="w-full text-sm font-semibold text-left bg-white border-collapse rounded-lg shadow-md table-auto text-customblack">
                    <thead className="text-xl uppercase bg-gray-50 whitespace-nowrap">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-4 font-semibold text-customblack"
                        >
                          Vendor Id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-medium text-customblack"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-medium text-customblack"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-medium text-customblack"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-medium text-customblack"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 font-medium text-customblack"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-t border-gray-300 divide-y divide-gray-100 ">
                      {vendorData.map((vendor) => (
                        <tr
                          key={vendor.id}
                          className="hover:bg-gray-50 odd:bg-gray-100"
                        >
                          <td className="flex gap-3 px-6 py-4 font-normal text-customblack">
                            <div className="text-sm">
                              <div className="font-medium text-gray-700">
                                {vendor.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-customblack">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              {vendor.name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-customblack">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              {vendor.address}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-customblack">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              {vendor.email}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-customblack">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              {vendor.contact}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                className="tertiary-button"
                                onClick={() => handleUpdateVendor(vendor.id)}
                              >
                                Edit
                              </button>

                              <button
                                className="secondary-button"
                                onClick={() => handleDeleteVendor(vendor.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



VendorRegistration.propTypes = {
  createVendor: PropTypes.func.isRequired,
  vendorData: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  fetchvendorlist: PropTypes.func.isRequired,
  vendorDelete: PropTypes.func.isRequired,
};





const mapStateToProps = (state) => ({
  vendorData: state.vendor.vendorData,
  loading: state.vendor.loading,
  error: state.vendor.error,
});

const mapDispatchToProps = {
  createVendor,
  fetchvendorlist,
  updateVendor,
  vendorDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorRegistration);
