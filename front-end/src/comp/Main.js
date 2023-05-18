import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Main() {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      setImage(base64data);
      try {
        const formData = new FormData();
        formData.append("filepath", dataURItoBlob(base64data), file.name);
        const response = await axios.post('http://210.115.229.250:5000/process_image', formData);
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    setDragging(false);
  };
  
  // dataURItoBlob 함수 추가
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
    <>
      <div className={dragging ? "dragging" : ""} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
      <h1>Drag and Drop Image Search</h1>
      <div className="dropzone">
        <p>Drop an image here to search for similar images</p>
      </div>
      <div className="image-container">
        {image && <img src={image} alt="Dropped Image" />}
      </div>
    </div>
    <div>
     <div>
     {items.map((item,index) => (
        <img key={index} src={`http://210.115.229.250:5000/static/img/${item.class}/${item.path}`
      } alt={item.class} />
      ))}

     </div>
    </div>
    </>
  );
}

export default Main;
