import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateVendor } from "../features/Action";

function VendorUpdate({ match, vendorData, updateVendor }) {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const { vendorId } = match.params;
    const existingVendor = vendorData.find((vendor) => vendor.id === parseInt(vendorId));
    setVendor(existingVendor);
  }, [vendorData, match.params]);

  const handleUpdate = () => {
    // Perform validation and update the vendor object
    updateVendor(vendor.id, vendor);
  };

  if (!vendor) {
    return <p>Loading vendor data...</p>;
  }

  return (
    <div>
      <h2>Update Vendor</h2>
      <form>
        {/* Render the form fields and populate them with existing vendor data */}
        <label>
          Vendor Name:
          <input type="text" value={vendor.name} onChange={(e) => setVendor({ ...vendor, name: e.target.value })} />
        </label>
        <label>
          Vendor Address:
          <input type="text" value={vendor.address} onChange={(e) => setVendor({ ...vendor, address: e.target.value })} />
        </label>
        {/* Add more form fields as needed */}

        <button onClick={handleUpdate}>Update</button>
      </form>
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
