import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateVendor } from "../features/Action";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Dashboard from "./Dashboard";
import PropTypes from "prop-types";

VendorUpdate.propTypes = {
  vendorData: PropTypes.array.isRequired,
  updateVendor: PropTypes.func.isRequired,
};

function VendorUpdate({ vendorData, updateVendor }) {
  const [vendor, setVendor] = useState(null);
  const { vendorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const existingVendor = vendorData.find(
      (vendor) => vendor.id === parseInt(vendorId)
    );
    setVendor(existingVendor);
  }, [vendorData, vendorId]);

  const handleUpdate = async () => {
    try {
      await updateVendor(vendorId, vendor);
      Swal.fire({
        icon: "success",
        title: "Vendor Updated",
        text: "Vendor has been successfully updated.",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (!vendor) {
    return <p>Loading vendor data...</p>;
  }

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="">
        <Dashboard />
        <div>
          <h5 className="pt-44 subheading ">Vendor Update</h5>
        </div>
        <div className="container grid gap-6 py-5 mx-auto xl:grid-cols-6">
          {/* Render the form fields and populate them with existing vendor data */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-customblack"
            >
              Vendor Name:
              <input
                type="text"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={vendor.name}
                onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="text-sm font-semibold text-customblack">
              Vendor Address:
              <input
                type="text"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={vendor.address}
                onChange={(e) =>
                  setVendor({ ...vendor, address: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="text-sm font-semibold text-customblack">
              Email:
              <input
                type="text"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                value={vendor.email}
                onChange={(e) =>
                  setVendor({ ...vendor, email: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="text-sm font-semibold text-customblack">
              Contact:
              <input
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                type="text"
                value={vendor.contact}
                onChange={(e) =>
                  setVendor({ ...vendor, contact: e.target.value })
                }
              />
            </label>
          </div>

          {/* Add more form fields as needed */}

          <button className="primary-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vendorData: state.vendor.vendorData,
});

const mapDispatchToProps = {
  updateVendor,
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorUpdate);
