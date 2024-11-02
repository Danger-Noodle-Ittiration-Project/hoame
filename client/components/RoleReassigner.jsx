import React, { useState, useEffect } from "react";
import "../styles/roleReassigner.scss";

const RoleReassigner = ({ onUpdateStatus, userPermissions }) => {
  // if (!userPermissions.includes("admin")) {
  //   return <p>You do not have permissions to assign roles.</p>;
  // }

  const [pendingUsers, setPendingUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/pending-approval",
          {
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch pending users");
        const data = await response.json();
        setPendingUsers(data);
      } catch (error) {
        console.error("Error fetching pending approval users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/roles", {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch roles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchPendingUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (statusMessage) {
      onUpdateStatus(statusMessage);
    }
  }, [statusMessage, onUpdateStatus]);

  const handleRoleChange = (userId, selectedOptions) => {
    const selectedRoleIds = Array.from(
      selectedOptions,
      (option) => option.value
    );
    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: selectedRoleIds,
    }));
  };

  const approveUser = async (userId) => {
    const newRoleIds = selectedRoles[userId];
    if (!newRoleIds || newRoleIds.length === 0) {
      return setStatusMessage(
        "Please select at least one role before approving."
      );
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, roleIds: newRoleIds }),
      });

      if (!response.ok) throw new Error("Failed to approve user");

      const result = await response.json();
      setStatusMessage(result.message);
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error approving user:", error);
      setStatusMessage("Error approving user. Please try again.");
    }
  };

  return (
    <div className='container'>
      <h1>Role Reassignment for Pending Approval Users</h1>
      {statusMessage && <p>{statusMessage}</p>}
      {pendingUsers.length > 0 ? (
        <ul>
          {pendingUsers.map((user) => (
            <li key={user.id}>
              <p>
                {user.first_name} {user.last_name} - Username: {user.username}
              </p>
              <label htmlFor={`role-${user.id}`}>Select New Roles:</label>
              <select
                id={`role-${user.id}`}
                multiple
                value={selectedRoles[user.id] || []}
                onChange={(e) =>
                  handleRoleChange(user.id, e.target.selectedOptions)
                }
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
              <button onClick={() => approveUser(user.id)}>Approve User</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users pending approval.</p>
      )}
    </div>
  );
};

export default RoleReassigner;
