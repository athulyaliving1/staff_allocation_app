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
    <div>
      <h2>Vendor Registration</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div>
            <input
              type="text"
              name="name"
              value={newVendorData.name}
              onChange={handleChange}
              placeholder="Vendor name"
              required
            />
            <input
              type="text"
              name="address"
              value={newVendorData.address}
              onChange={handleChange}
              placeholder="Vendor address"
              required
            />
            <input
              type="text"
              name="email"
              value={newVendorData.email}
              onChange={handleChange}
              placeholder="Vendor email"
              required
            />
            <input
              type="text"
              name="abbr"
              value={newVendorData.abbr}
              onChange={handleChange}
              placeholder="Vendor abbr"
              required
            />
            <input
              type="number"
              name="contact"
              value={newVendorData.contact}
              onChange={handleChange}
              placeholder="Vendor contact"
              required
            />

            <button onClick={handleCreateVendor}>Add Vendor</button>
          </div>
          <div className="m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <table className="w-full text-gray-500 bg-white border-collapse text-smtext-left">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Vendor Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-100 divide-y divide-gray-100">
                {vendorData.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {vendor.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-600 rounded-full bg-green-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {vendor.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-600 rounded-full bg-green-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {vendor.address}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-600 rounded-full bg-green-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {vendor.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-600 rounded-full bg-green-50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {vendor.contact}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateVendor(vendor.id)}>
                          Update
                        </button>
                        <button onClick={() => handleDeleteVendor(vendor.id)}>
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
