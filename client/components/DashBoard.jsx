import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Announcements from './Announcements';
import Directory from './Directory';
import Documents from './Documents';
import Bids from './Bids';
import Dues from './Dues';
import VotingBoard from './VotingBoard';
import Logout from './Logout';
import home from '../styles/assets/png_blue_icon.png';
import RoleReassigner from './RoleReassigner';
/*
  Componet serves as the main UI where users can go to differnt sections
  using tabs, it displays state and includes a logout function
  to handle signout
*/

const Dashboard = ({ onLogout  }) => {
  const location = useLocation();

  // old way to set name
  // const firstName = location.state?.prop || 'Guest';
  // console.log('firstName:',firstName)
  // // console.log("FIRSTNAME", firstName)
  // // state to track current active tab, default is announcements
  // const [activeTab, setActiveTab] = useState('Announcements');

  const [activeTab, setActiveTab] = useState("Announcements");
  const [firstName, setFirstName] = useState("Guest");
  const [roleReassignStatus, setRoleReassignStatus] = useState(null); // State to store data from RoleReassigner
  const [userPermissions, setUserPermissions] = useState([]); // State to store user permissions

  
  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/roles", {
          credentials: "include",
        });
        const data = await response.json();
        setUserPermissions(data.roles || []);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      }
    };

    fetchUserPermissions();
  }, []);

  // Function to handle data from RoleReassigner
  const handleRoleReassignUpdate = (statusMessage) => {
    setRoleReassignStatus(statusMessage);
    console.log("Role Reassigner Update:", statusMessage); // Optional: Log the status message
  };

  console.log("User permissions in Dashboard:", userPermissions);

  useEffect(() => {
    if (location.state?.prop) {
      localStorage.setItem("firstName", location.state.prop);
    }
    const storedName = localStorage.getItem("firstName");
    if (storedName) {
      setFirstName(storedName);
    }
  }, [location.state]);

  // function to handle tab swtiching when button clicked
  const handleClick = (e) => {
    const currentTab = e.target.innerHTML;
    setActiveTab(currentTab);
  };
  // function to handle tab swtiching using dropdown menu
  const handleOptions = (e) => {
    console.log(e.target.value);
    setActiveTab(e.target.value);
  };
  // function to handle user logout [deprecated]
  // const handleLogout = () => {
  //   onLogout(false);
  // };

  // function to see user's own name appear
  // const getFirstName = async () => {
  //   // const [users, setUsers] = useState([]);
  //     try {
  //       const response = await fetch(`http://localhost:3000/api/users`);
  //       const data = await response.json();
  //       console.log('Fetched users:', data);
  //       // setUsers(data);
  //     } catch (error) {
  //       console.log('error fetching users:', error);
  //     }
  // };

  return (
    <div className="dashboard">
      <header>
        <div className="welcomeBlock">
          <h1 className="pageTitle" id="welcome">
            <img src={home} alt="home" className="homeIcon" /> Welcome HOAme,{" "}
            {firstName}!
          </h1>
        </div>
        {/* <button onClick={handleLogout}>Sign Out</button> */}
        <Logout /> {/* Use the Logout component to handle backend logout */}
      </header>

      {/* Button to swtich to announcements tabs */}
      <nav className="navigation">
        <button
          className={`tab ${activeTab === "Announcements" ? "active" : ""}`}
          onClick={handleClick}
        >
          Announcements
        </button>
        {/* Dropdown menu for differnt tabs */}
        <select onChange={handleOptions} className="select">
          <option value="" disabled selected>
            Select Tab
          </option>
          <option value="Documents">Documents</option>
          {/* <option value='MeetingMinutes'>Meeting Minutes</option> */}
          <option value="Bids">Upload Documents</option>
        </select>
        {/* Button to directory tab */}
        <button
          className={`tab ${activeTab === "Directory" ? "active" : ""}`}
          onClick={handleClick}
        >
          Directory
        </button>
        <button
          className={`tab ${activeTab === "Dues" ? "active" : ""}`}
          onClick={handleClick}
        >
          Dues
        </button>
        <button
          className={`tab ${activeTab === "VotingBoard" ? "active" : ""}`}
          onClick={handleClick}
        >
          VotingBoard
        </button>
        {userPermissions.includes("admin") && (
          <button
            className={`tab ${activeTab === "Role Reassigner" ? "active" : ""}`}
            onClick={handleClick}
          >
            Role Reassigner
          </button>
        )}
      </nav>

      {/* Render componets based on the active tab*/}
      <div className="window">
        {activeTab === "Announcements" && <Announcements />}
        {activeTab === "Documents" && <Documents />}
        {activeTab === "Directory" && <Directory />}
        {activeTab === "Bids" && <Bids />}
        {activeTab === "Dues" && <Dues />}
        {activeTab === "VotingBoard" && <VotingBoard />}
        {activeTab === "Role Reassigner" &&
          userPermissions.includes("admin") && (
            <RoleReassigner
              onUpdateStatus={handleRoleReassignUpdate}
              userPermissions={userPermissions}
            />
          )}
        {roleReassignStatus && <p>{roleReassignStatus}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
