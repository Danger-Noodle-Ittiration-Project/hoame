import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';

/*
  Allow users to upload, view , and list documents in db
*/
const Documents = () => {
  // state variables
  const [documents, setDocuments] = useState([]); // state for documents from SQL
  const [file, setFile] = useState(null); // state for file

  // function for file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // get chosen file
  };
  // function for upload to server
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    // send file to server (replace URL with the endpoint later)
    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      // check response
      if (response.ok) {
        alert('File uploaded successfully');
      } else {
        alert('Failed to upload file');
      }
    } catch (error) {
      console.error('error uploading files', error);
      alert('Error uploading file');
    }
  };

  // function to open a documment in new tab
  // when the View Doc button is clicked
  // const viewDocuments = async (doc) => {
  //   console.log('CLICKED VIEW DOCS', doc.filename);
  //   console.log(doc.file_data.data);
  //   //await window.open(`http://localhost:3000/upload/${doc.filename}`, '_blank');
  //   await window.open(JSON.parse(Buffer.from(doc.file_data.data).toJSON()));
  // };

  // using Uint8Array
// const arrayBufferToBase64 = (buffer) => {
//   let binary = '';
//   const bytes = new Uint8Array(buffer);
//   const len = bytes.byteLength;
//   for (let i = 0; i < len; i++) {
//     binary += String.fromCharCode(bytes[i]);
//   }
//   return window.btoa(binary);
// };

// const viewDocuments = async (doc) => {
//   console.log('CLICKED VIEW DOCS', doc.filename);

//   // Convert ArrayBuffer or Uint8Array to a Base64 string
//   const base64Data = arrayBufferToBase64(doc.file_data.data);
//   const mimeType = 'application/pdf'; // Change this based on the file type

//   // Create a data URL
//   const dataUrl = `data:${mimeType};base64,${base64Data}`;

//   // Open the document in a new tab
//   await window.open(dataUrl, '_blank');
  // };
  
const viewDocuments = async (doc) => {
  console.log('CLICKED VIEW DOCS', doc.filename);

  try {
    // Ensure doc.file_data.data is an array or a typed array
    const buffer = Buffer.from(doc.file_data.data);

    // Convert the buffer to a Base64 string
    const base64Data = buffer.toString('base64');

    // Determine the MIME type dynamically if needed
    const mimeType = getMimeType(doc.filename);

    // Create a data URL with the Base64 string
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    // Open the document in a new tab
    window.open(dataUrl, '_blank');
  } catch (error) {
    console.error('Error opening document:', error);
  }
};

// Helper function to determine the MIME type based on file extension
const getMimeType = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'txt':
      return 'text/plain';
    case 'html':
      return 'text/html';
    case 'csv':
      return 'text/csv';
      // Added docx for Word docs, however it prompts to download.  Won't view in browser - BMA
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    default:
      return 'application/octet-stream'; // Default for unknown types
  }
};
// const viewDocuments = async (doc) => {
//   console.log('CLICKED VIEW DOCS', doc.filename);

//   // Convert the data to a Buffer using the polyfill
//   const buffer = Buffer.from(doc.file_data.data);

//   // Convert the buffer to a Base64 string
//   const base64Data = buffer.toString('base64');
//   const mimeType = getMimeType(doc.filename) // Adjust based on the file type

//   // Create a data URL
//   const dataUrl = `data:${mimeType};base64,${base64Data}`;

//   // Open the document in a new tab
//   await window.open(dataUrl, '_blank');
// };


  // function to load documents from the db
  const loadDocuments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getDocs');
      const docs = await response.json();

      // create list of document cards
      const docsList = [];
      for (let i = 0; i < docs.length; i++) {
        docsList.push(
          <div key={i} className='documentCard'>
            <p>File Name: {docs[i].filename}</p>
            <p>Content Type: {docs[i].content_type},</p>
            <p>File Size: {docs[i].file_size}</p>
            <button
              onClick={() => viewDocuments(docs[i])}
              className='viewButton'
            >
              View File
            </button>
          </div>
        );
      }
      setDocuments(docsList); // update state
    } catch (error) {
      console.error('error fetching documents', error);
    }
  };

  // useEffect hook to load documents when first rneder
  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div>
      <h2>Documents HOAme</h2>
      {/* {display the list of document or message if no documents} */}
      {documents.length > 0 ? documents : <p>No Documents Available</p>}
    </div>
  );
};

export default Documents;
