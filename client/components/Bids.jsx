import { use } from 'bcrypt/promises';
import React, { useState } from 'react';

const Bids = () => {
  // to store title of the bid (ex: pothole)
  const [title, setTitle] = useState('');
  // to store a detailed description of the bid (ex: south side parking entrance pothole)
  const [description, setDescription] = useState('');
  // to store the amount of the bid (ex:$599)
  const [amount, setAmount] = useState('');
  //to store the uploaded file (ex: pdf or image)
  const [file, setFile] = useState(null);
  // File upload successful
  const [isUploaded, setIsUploaded] = useState(false);

  //to store errors
  // const [error, setError] = useState('');

  // stores the first file from input in the file state
  const selectFile = (event) => {
    setFile(event.target.files[0]);
  };
  //trigger when user submit the form
  const handleFileSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object to send expected properties to backend
    const formData = new FormData();
    formData.append('file', file); // send the file contents
    formData.append('title', title);
    formData.append('description', description);
    formData.append('amount', amount);

    try {
      const response = await fetch(`http://localhost:3000/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFile(True);
        console.log('from Bids.jsx - File uploaded successfully', data);
      }
    } catch (err) {
      console.error('from Bids.jsx - Error during file upload', err);
    }
  };

//    // stores the first file from input in the file state
//    const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
// }
// //trigger when user submit the form
// const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(''); // reset errors

//     // create formData instance to store input and file
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('amount', amount);
//     formData.append('file', file);
//     try {
//       // POST request tobackend with form data
//       const response = await fetch('http://localhost:3000/api/bids', {
//           method: 'POST',
//           body: formData,
//       });

//       if (response.ok) {
//           // reset form fields 
//           setTitle('');
//           setDescription('');
//           setAmount('');
//           setFile(null);
//       } else {
//           // if the response fails set error message
//           setError('Failed to submit bid. Please try again.');
//       }
//   } catch (error) {
//       // set error state message to display to user
//       setError('An error occurred while submitting the bid. Please try again later.');
//   }
// }


  return (
    <div>
      {isUploaded ? (
        <h1>Upload Success! Go to Documents to view downloads</h1>
      ) : (
        <>
          <h1>Submit a Bid/Quote</h1>
          <form>
            <div>
              <label>Title:</label>
              {/* //when input changes use setTitle to update title state */}
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Amount:</label>
              <input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Upload Quote (PDF/Image):</label>
              <input
                type='file'
                onChange={selectFile}
                accept='application/pdf, image/*'
                required
              />
            </div>
            <button onClick={handleFileSubmit} type='submit'>
              Submit Bid
            </button>
          </form>
        </>
      )}
    </div>
  );
};

// return (
//   <div>
//     <h1>Submit a Bid/Quote</h1>
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <div>
//         <label>Title:</label>
//         {/* when input changes, use setTitle to update state */}
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Description:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Amount:</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//       </div>

//       <div>
//         <label>Upload Quote (Any File Type):</label>
//         <input
//         type="file"
//         name="file" 
//         onChange={handleFileUpload}
//         required
//       />
//       </div>

//       <button type="submit">Submit Bid</button>
//     </form>
//   </div>
// );


export default Bids;
