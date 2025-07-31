import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRoomChangeRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});
  const token = localStorage.getItem("adminToken");

  const fetchRequests = async () => {
    if (!token) {
      setError("Admin not logged in. Please login again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/helpdesk/admin/room-change/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch room change requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleInputChange = (id, field, value) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (id) => {
    const update = statusUpdates[id];
    if (!update || !update.status) return;

    try {
      await axios.patch(
        `http://localhost:8000/api/helpdesk/admin/room-change/${id}/`,
        {
          status: update.status,
          admin_comment: update.admin_comment || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh requests list after update
      fetchRequests();
    } catch (err) {
      alert("Failed to update request.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Room Change Requests</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Current Room</th>
              <th className="px-4 py-2">Requested Room</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Admin Action</th>
              <th className="px-4 py-2">Submit</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td className="px-4 py-3 text-center" colSpan="7">
                  No room change requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-4 py-2">{req.student_name || req.student}</td>
                  <td className="px-4 py-2">{req.current_room}</td>
                  <td className="px-4 py-2">{req.requested_room}</td>
                  <td className="px-4 py-2">{req.reason}</td>
                  <td className="px-4 py-2 capitalize">{req.status}</td>
                  <td className="px-4 py-2">
                    {req.status === "pending" ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <select
                          value={statusUpdates[req.id]?.status || ""}
                          onChange={(e) =>
                            handleInputChange(req.id, "status", e.target.value)
                          }
                          className="border p-1 rounded"
                        >
                          <option value="">Select</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Add comment"
                          value={statusUpdates[req.id]?.admin_comment || ""}
                          onChange={(e) =>
                            handleInputChange(req.id, "admin_comment", e.target.value)
                          }
                          className="border rounded p-1 w-48"
                        />
                      </div>
                    ) : (
                      <span className="text-green-600 font-semibold">Updated</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleSubmit(req.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
