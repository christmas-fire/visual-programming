// src/PersonComponent.jsx
import React from 'react';
import './PersonComponent.css'; // We'll add some basic styles

const PersonComponent = ({ person }) => {
  if (!person) {
    return <div>No person data provided.</div>;
  }

  return (
    <div className="person-card">
      <h3>{person.name || 'N/A'}</h3>
      <p><strong>Age:</strong> {person.age !== undefined ? person.age : 'N/A'}</p>
      <p><strong>Email:</strong> {person.email || 'N/A'}</p>
      {person.pets && person.pets.length > 0 && (
        <div className="pets-section">
          <h4>Pets:</h4>
          <ul>
            {person.pets.map((pet, index) => (
              <li key={index} className="pet-item">
                <strong>{pet.name || 'N/A'}</strong> (Age: {pet.age !== undefined ? pet.age : 'N/A'})
              </li>
            ))}
          </ul>
        </div>
      )}
      {(!person.pets || person.pets.length === 0) && (
         <p><em>No pets listed.</em></p>
      )}
    </div>
  );
};

export default PersonComponent; 