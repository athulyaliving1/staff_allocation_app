import React, { useState } from "react";
import { connect } from "react-redux";
import { createVendor } from "../features/Action";

const VendorCreate = ({ createVendor }) => {
  const [vendorData, setVendorData] = useState({
    id: "",
    title: "",
    body: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createVendor(vendorData);
    // Reset the form after submission
    setVendorData({
      id: "",
      title: "",
      body: "",
    });
  };

  return (
    <div className=" ">
      <div className="grid grid-cols-3 w-6/12">
        <form onSubmit={handleSubmit}>
          <input
            className="text-md block px-3 py-2 rounded-lg w-full
        bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="id"
            value={vendorData.id}
            onChange={handleChange}
            placeholder="Vendor ID"
            required
          />
          <input
            className="text-md block px-3 py-2 rounded-lg w-full
      bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="title"
            value={vendorData.title}
            onChange={handleChange}
            placeholder="Vendor Email"
            required
          />
          <input
            className="text-md block px-3 py-2 rounded-lg w-full
      bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="body"
            value={vendorData.body}
            onChange={handleChange}
            placeholder="Vendor Address"
            required
          />
          {/* Add more input fields for other vendor data */}
          <button
            className="mt-3 text-lg font-semibold
            bg-gray-800 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
            type="submit"
          >
            Create Vendor
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { createVendor })(VendorCreate);
