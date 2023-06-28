import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createVendor,
  fetchvendorlist,
  updateVendor,
  vendorDelete,
} from "../features/Action";

function VendorRegistration({
  createVendor,
  fetchvendorlist,
  updateVendor,
  vendorDelete,
  vendor,
  loading,
  error,
}) {
  useEffect(() => {
    fetchvendorlist();
  }, [fetchvendorlist]);

  const navigate = useNavigate();

  const handleCreateVendor = () => {
    const newVendor = {
      title: "New Post",
      body: "This is a new post.",
    };
    createVendor(newVendor);
  };

  const handleUpdateVendor = (id) => {
    // Redirect to the update page
    navigate(`/update/${id}`);
  };

  const handleDeleteVendor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );
    if (confirmDelete) {
      await vendorDelete(id);
      window.location.reload(); // Reload the page
    }
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
          {/* <button onClick={handleCreateVendor}>Create Vendor</button>
          {vendor.map((vendors) => (
            <div key={vendors.id}>
              <h3>{vendors.title}</h3>
              <p>{vendors.body}</p>
              <button onClick={() => handleUpdateVendor(vendors.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteVendor(vendors.id)}>
                Delete
              </button>
            </div>
          ))} */}
          <Link to="/create-vendor">
            <button>add </button>
          </Link>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    vendor.Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    body
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {vendor.map((vendors) => (
                <tbody
                  key={vendors.id}
                  className="divide-y divide-gray-100 border-t border-gray-100"
                >
                  <tr className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {vendors.id}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {vendors.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">{vendors.body}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateVendor(vendors.id)}>
                          Update
                        </button>
                        <button onClick={() => handleDeleteVendor(vendors.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  vendor: state.vendor.vendorData,
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
