import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStaff } from "../../features/Action";
import PropTypes from "prop-types";

StaffProfile.propTypes = {
  fetchStaff: PropTypes.func.isRequired,
  staffData: PropTypes.shape({
    employee_id: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    // Add more PropTypes for other staff profile fields if needed
  }),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

function StaffProfile({ fetchStaff, staffData, loading, error }) {
  useEffect(() => {
    // Fetch staff data when the component mounts
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : staffData ? (
        <div>
          {/* Render staff profile based on the retrieved data */}
          <h2>Staff Profile</h2>
          <p>Employee ID: {staffData.employee_id}</p>
          <p>Full Name: {staffData.full_name}</p>
          {/* Add more profile fields as needed */}
        </div>
      ) : (
        <p>No staff data found.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  staffData: state.staff.staffData,
  loading: state.staff.loading,
  error: state.staff.error,
});

const mapDispatchToProps = {
  fetchStaff,
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffProfile);
