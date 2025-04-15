import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PersonForm from './PersonForm'; // We will create this component
import PersonList from './PersonList'; // We will create this component
import './App.css';

function App() {
  const [persons, setPersons] = useState([]); // State to hold the array of persons

  // Function to add a new person to the state
  const addPerson = (person) => {
    setPersons(prevPersons => [...prevPersons, person]);
  };

  return (
    <div className="App">
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/form">Add Person</Link>
          </li>
          <li>
            <Link to="/persons">View Persons</Link>
          </li>
        </ul>
      </nav>

      <main className="content">
        <h1>PersonСomponent</h1>
        <Routes>
          {/* Pass addPerson function to the form route */}
          <Route path="/form" element={<PersonForm onAddPerson={addPerson} />} />

          {/* Pass persons array to the list route */}
          <Route path="/persons" element={<PersonList persons={persons} />} />

          {/* Optional: Default route */}
          <Route path="/" element={<h2>Welcome! Select an option above.</h2>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
