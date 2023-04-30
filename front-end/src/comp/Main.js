import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=YOUR_ACCESS_KEY`);
    const data = await response.json();
    setImages(data.results);
  };

  return (
    <div>
      <h1>Image Search</h1>
      <input type="text" id="searchInput" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button id="searchButton" onClick={handleSearch}>Search</button>
      <div className="image-container">
        {images.map((image) => (
          <img key={image.id} src={image.urls.regular} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default Main;