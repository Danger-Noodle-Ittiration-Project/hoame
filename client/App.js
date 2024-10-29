import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import routing components
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import { useState } from 'react';
import SignUp from './components/SignUp';
/*
  Handles routing and manages login state
*/

const App = () => {
  // state to track user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function to handle logout and update state
  const handleLogout = () => {
    setIsLoggedIn(false); // This will handle updating the state to reflect logged out status
  };
  const handleSignUp = () => {
    setIsLoggedIn(true);
  };
  return (
    <Routes>
      {/*if logged in then redirect to dashboard, else redirect to login */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />

      {/* define login route */}
      <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
      {/* Define signup route */}
      <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
      {/* define dashboard route, and logout handling */}
      <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />}
      />
    </Routes>
  );
};

export default App;

// // Can only access /dashboard only if logged in
// element={
//   isLoggedIn ? (
//     <Dashboard onLogout={handleLogout} />
//   ) : (
//     <Navigate to="/login" />
//   )
// }\