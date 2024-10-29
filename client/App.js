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

//Tried using the following to save isLoggedIn state to local storage, but still reloading page when any change is made
//Either need to check more into how routing is working or it's the hot module reload feature of webpack
// const [isLoggedIn, setIsLoggedIn] = useState(() => {
//   return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
// });
// useEffect(() => {
//   localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
// }, [isLoggedIn])

// Tried using below so /dashboard can only be accessed if logged in, but any updates navigate to login page and have to login again
{/* <Route path='/dashboard' element={isLoggedIn ? (<Dashboard onLogout={handleLogout} />) : (<Navigate to='/login' />)} */}
