import React from "react";
// services
import { verifyGames } from "../../Services/Games";
// helper
import ShowToast from "helper/ShowToast";
import GetAge from "helper/GetAge";

const DataTable = ({ dataset, data, fetchData = () => {} }) => {
  const verifyGame = async (id) => {
    let json = await verifyGames(id);
    if (json.error) {
      ShowToast(false, json.error);
    } else {
      ShowToast(true, json.success);
      fetchData();
    }
  };

  return (
    <div className="p-5 sm:p-12 bg-white rounded-2xl shadow">
      <div className="relative overflow-x-auto rounded-lg border">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataset.map((e, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {e.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((e, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <>
                  {dataset.map((s, idx) =>
                    s == "dob" || s == "is_verified" ? (
                      <td key={idx} className="px-6 py-4">
                        {s == "dob" && GetAge(e[s])}
                        {s == "is_verified" && (
                          <>
                            {e[s] ? (
                              "Verified"
                            ) : (
                              <button
                                onClick={() => verifyGame(e._id)}
                                className="underline text-blue-600"
                              >
                                Verify
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    ) : (
                      <td key={idx} className="px-6 py-4">
                        {e[s]}
                      </td>
                    )
                  )}
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
