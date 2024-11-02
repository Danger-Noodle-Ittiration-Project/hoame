import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SignUp = ({ onSignUp }) => {
  // state for whether user completed signup or not
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    street_address: '',
    phone: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', 
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        // Set isSigneUp to True so page can render post-signup message
        setIsSignedUp(true);
        // Don't want users able to get to dashboard until admin approves their signup request
        // onSignUp(); // Update the logged-in state to true
        // navigate('/dashboard', { state: { prop: formData.first_name } }); // Pass first_name to Dashboard
      } else {
        console.error('Signup error:', data.message.err);
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <div className='signup-container'>
      {isSignedUp ? (
        <h1 className='h1'>
          {' '}
          Signup request received! The Board Secretary will approve access after
          reviewing.
        </h1>
      ) : (
        <>
          {/* <h2
      //  className='center-text'
      >Sign Up</h2> */}
          <form className='signup-form' onSubmit={handleSubmit}>
            <div>
              <h1 className='registration-heading'>Registration</h1>
              <label htmlFor='first_name'>First Name:</label>
              <input
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='last_name'>Last Name:</label>
              <input
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='street_address'>Street Address:</label>
              <input
                type='text'
                name='street_address'
                value={formData.street_address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='phone'>Phone:</label>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit'>Sign Up</button>
            <p className='login-prompt'>
              {/* link for signing up for an account */}
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
