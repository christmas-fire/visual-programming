import React from 'react';

function AlbumList({ albums }) {
  return (
    <ul className="album-list">
      {albums.map(album => (
        <li key={album.id}>
          <strong>User ID:</strong> {album.userId}, 
          <strong>ID:</strong> {album.id}, 
          <strong>Title:</strong> {album.title}
        </li>
      ))}
    </ul>
  );
}

export default AlbumList;