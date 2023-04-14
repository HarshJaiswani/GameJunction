import React from "react";

const DataTable = ({ dataset, data, fetchData = () => {} }) => {
  const getAge = (d) => {
    let dob = new Date(d);
    let time = Math.abs(Date.now() - dob);
    let sec = time / 1000;
    let min = sec / 60;
    let hour = min / 60;
    let day = hour / 24;
    let year = day / 365;
    return Math.floor(year);
  };
  const verifyGame = async (id) => {
    const response = await fetch("/api/sport", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, is_verified: true }),
    });
    const json = await response.json();
    if (json.error) {
      alert("some error!");
    } else {
      alert("sucess");
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
                        {s == "dob" && getAge(e[s])}
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
