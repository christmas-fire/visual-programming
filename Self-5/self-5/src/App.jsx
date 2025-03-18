import React, { useState, useEffect } from 'react';
import AlbumList from "./components/AlbumList"
import SearchSort from './components/SearchSort';
import "./App.css"

function App() {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('userId');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => {
        setAlbums(data);
        setFilteredAlbums(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let sortedAlbums = [...albums].sort((a, b) => a[sortField] - b[sortField]);
    
    if (searchTerm) {
      sortedAlbums = sortedAlbums.filter(album =>
        album.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAlbums(sortedAlbums);
  }, [albums, searchTerm, sortField]);

  return (
    <div>
      <h1>Albums</h1>
      <SearchSort 
        onSearch={setSearchTerm} 
        onSort={setSortField} 
        sortField={sortField}
      />
      <AlbumList albums={filteredAlbums} />
    </div>
  );
}

export default App;
