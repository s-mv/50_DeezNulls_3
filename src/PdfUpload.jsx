// PdfUpload.jsx
import { Component, createRef } from "react";
import PocketBase from 'pocketbase';


// Function to generate a unique ID
const generateID = () => {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 15; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
};
const pb = new PocketBase('http://127.0.0.1:8090');
const testCollection = pb.collection('test'); // Corrected PocketBase instance
const formData = new FormData();



export const insertPDF = async (file) => {
  const id = generateID(); // Generating a unique ID
  formData.append('id', id);


  try {
    const fileInput = document.getElementById('fileInput');
    for (let file of fileInput.files) {
      formData.append('content', file);
    }
    const record = await testCollection.create(formData);
    console.log("PDF inserted successfully:", record);
  } catch (error) {
    console.error("Error inserting PDF:", error);
  }
}

class PDFUploader extends Component { 
  constructor(props) {
    super(props);
    this.fileRef = createRef();
  }

  handleUpload = async () => {
    const file = this.fileRef.current.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target.result;
      await insertPDF(fileData); 
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="pdf-uploader">
        <input type="file" ref={this.fileRef} id='fileInput' />
        <button onClick={this.handleUpload}>Upload PDF</button>
      </div>
    );
  }
}

export default PDFUploader;
