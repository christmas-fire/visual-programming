import React from 'react';
import DataSet from './components/DataSet';
import "./App.css"

function App() {
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    {key: 'pl', label: 'Programming language'}
  ];

  const data = [
    { name: 'Александр', age: 19, pl: 'Golang/Python'},
    { name: 'Артем', age: 19, pl: 'Golang'},
    { name: 'Степан', age: 19, pl: 'C#'},
  ];

  return (
    <div className='container'>
      <h1>Data App</h1>
      <DataSet
        headers={headers}
        data={data}
        renderHeader={(header) => <strong>{header.label}</strong>}
        renderRow={(item, header) => <span>{item[header.key]}</span>}
      />
    </div>
  );
}

export default App;