// src/PersonList.jsx
import React from 'react';
import PersonComponent from './PersonComponent';

const PersonList = ({ persons }) => {
  return (
    <div>
      <h2>Persons List</h2>
      {persons && persons.length > 0 ? (
        persons.map((person, index) => (
          // Using index as key is okay here if list is stable and has no unique IDs
          <PersonComponent key={index} person={person} />
        ))
      ) : (
        <p>No persons added yet. Go to the form to add one!</p>
      )}
    </div>
  );
};

export default PersonList; 