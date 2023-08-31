import React, { useState } from "react";
import { connect } from "react-redux";
import { createVendor } from "../features/Action";
import PropTypes from "prop-types";

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
    <div className="">
      <div className="grid w-6/12 grid-cols-3">
        <form onSubmit={handleSubmit}>
          <input
            className="block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="id"
            value={vendorData.id}
            onChange={handleChange}
            placeholder="Vendor ID"
            required
          />
          <input
            className="block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="title"
            value={vendorData.title}
            onChange={handleChange}
            placeholder="Vendor Email"
            required
          />
          <input
            className="block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            type="text"
            name="body"
            value={vendorData.body}
            onChange={handleChange}
            placeholder="Vendor Address"
            required
          />
          {/* Add more input fields for other vendor data */}
          <button
            className="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-gray-800 rounded-lg shadow-xl hover:text-white hover:bg-black"
            type="submit"
          >
            Create Vendor
          </button>
        </form>
      </div>
    </div>
  );
};


VendorCreate.propTypes = {
  createVendor: PropTypes.func.isRequired,
};

export default connect(null, { createVendor })(VendorCreate);
