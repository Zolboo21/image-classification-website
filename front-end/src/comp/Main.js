import React, { useState } from 'react';
import '../App.css';

function Main() {
  const [image, setImage] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      setImage(base64data);
    };
    setDragging(false);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  return (
    <div className={dragging ? "dragging" : ""} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <h1>Drag and Drop Image Search</h1>
      <div className="dropzone">
        <p>Drop an image here to search for similar images</p>
      </div>
      <div className="image-container">
        {image && <img src={image} alt="Dropped Image" />}
      </div>
    </div>
  );
}

export default Main;
