import React from 'react';
import './Card.css';

const Card = ({ id, fullName, name, address, email }) => {
  return (
    <div className="card">
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Full Name:</strong> {fullName}</p>
      <p><strong>Name:</strong></p>
      <p style={{ marginLeft: '20px' }}>
        <span><strong>First Name:</strong> {name.firstName}</span><br />
        <span><strong>Last Name:</strong> {name.lastName}</span>
      </p>
      <p><strong>Address:</strong></p>
      <p style={{ marginLeft: '20px' }}>
        <span><strong>Line:</strong> {address.line1}</span><br />
        <span><strong>Town:</strong> {address.town}</span><br />
        <span><strong>County:</strong> {address.county}</span><br />
        <span><strong>Country:</strong> {address.country}</span>
      </p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

export default Card;
