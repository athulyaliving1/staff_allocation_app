import React, { useState, useEffect } from "react";
import { URLDevelopment } from "../utilities/Url";

function MasterDuty() {
  const [dutyData, setDutyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDutyData();
  }, []);

  const fetchDutyData = async () => {
    try {
      const response = await fetch(`${ URLDevelopment}/api/floor/masterduty`);
      if (!response.ok) {
        throw new Error("Failed to fetch duty data");
      }
      const data = await response.json();
      console.log(data);
      setDutyData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching duty data:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-5 text-3xl font-bold">Master Duty</h1>
      {isLoading ? (
        <p>Loading duty data...</p>
      ) : (
        <table className="w-full text-sm font-semibold text-left bg-white border-collapse text-customblack">
          <thead className="text-xl bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              {/* Include other table headers as per your API response */}
            </tr>
          </thead>
          <tbody className="border-t border-gray-300 divide-y divide-gray-100">
            {dutyData.map((duty) => (
              <tr key={duty.id} className="hover:bg-gray-50 odd:bg-gray-100">
                <td className="px-6 py-4">{duty.id}</td>
                <td className="px-6 py-4">{duty.duty_name}</td>
                {/* Include other table cells as per your API response */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MasterDuty;
