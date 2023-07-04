import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createVendor,
  fetchvendorlist,
  updateVendor,
  vendorDelete,
} from "../features/Action";

import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

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
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const [newVendorData, setNewVendorData] = useState({ name: "", address: "" });
  const [vendorList, setVendorList] = useState([]);

  const handleCreateVendor = async () => {
    try {
      await createVendor(newVendorData);
      setNewVendorData({ name: "", address: "" }); // Reset the input fields

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
      await vendorDelete(id);
      Swal.fire("Deleted!", "The vendor has been deleted.", "success").then(
        () => {
          // window.location.reload(); // Reload the page
          navigate("/");
        }
      );
    }
  };

  const handleChange = (e) => {
    setNewVendorData({ ...newVendorData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setVendorList(vendor);
  }, [vendor]);

  let currentVendors = [];
  let pageCount = 0;

  if (Array.isArray(vendorList)) {
    // If vendorList is an array, perform pagination
    pageCount = Math.ceil(vendorList.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    currentVendors = vendorList.slice(offset, offset + itemsPerPage);
  } else if (typeof vendorList === "object") {
    // If vendorList is an object, convert it to an array
    currentVendors = [vendorList];
    pageCount = 1;
  } else {
    console.error("vendorList is not an array or object:", vendorList);
  }

  // // Pagination handling
  // const pageCount = Math.ceil(vendorList.length / itemsPerPage); // Calculate the total number of pages
  // const offset = currentPage * itemsPerPage; // Calculate the offset for the current page
  // const currentVendors = vendorList.slice(offset, offset + itemsPerPage); // Get the vendors for the current page

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page
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
            <button onClick={handleCreateVendor}>Add Vendor</button>
          </div>
          <div className="m-5 overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-500 bg-white border-collapse">
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
                    name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    address
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              {Array.isArray(currentVendors) ? (
                currentVendors.map((vendors) => (
                  <tbody className="border-t border-gray-100 divide-y divide-gray-100">
                    <tr key={vendors.id} className="hover:bg-gray-50">
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {vendors.id}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-600 rounded-full bg-green-50">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          {vendors.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">{vendors.address}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateVendor(vendors.id)}
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteVendor(vendors.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4">No vendors found.</td>
                  </tr>
                </tbody>
              )}
            </table>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              subContainerClassName={"pages pagination"}
              activeClassName={"font-bold "}
              containerClassName={"flex justify-center mt-4"}
              pageClassName={"mx-1"}
              pageLinkClassName={
                "px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              }
              previousClassName={"mr-2"}
              previousLinkClassName={
                "px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              }
              nextClassName={"ml-2"}
              nextLinkClassName={
                "px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              }
            />
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
