import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createVendor,
  updateVendor,
  vendorDelete,
  fetchvendorlist,
} from "../features/Action";

import Swal from "sweetalert2";

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
    <div className="bg-gray-100 h-screen w-screen">
      <h2 className="subheading">Vendor Registration</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="">
          <div className="container mx-auto  grid  xl:grid-cols-3 gap-6">
            <div className="flex flex-col space-y-1">
              <label
                for="name"
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
                for="address"
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
                for="email"
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
                for="email"
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
                for="email"
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
                className="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-sky-600 before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
              >
                <span className="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500">
                  Add Vendor
                </span>
              </button>
            </div>
          </div>
          <div className="m-5  border border-gray-200 rounded-lg shadow-md table-auto">
            <table className="w-full text-customblack bg-white border-collapse text-sm text-left font-semibold ">
              <thead className="bg-gray-50 text-xl">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4  text-customblack font-semibold"
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
                          className="primary-button"
                          onClick={() => handleUpdateVendor(vendor.id)}
                        >
                          Update
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
      )}
    </div>
  );
}

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
