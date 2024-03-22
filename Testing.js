import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const MyComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState('');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedOptions)
    const formdata = new FormData()
    formdata.append('name', name)
    formdata.append('selectedOptions', JSON.stringify(selectedOptions));
    //axios.post('http://localhost:8800/testing', {formdata})

  };

  return (
    <div>
      <h2>Select Multiple Options</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
        />
        <Select
          options={options}
          isMulti
          onChange={handleSelectChange}
          value={selectedOptions}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyComponent;
