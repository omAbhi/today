// Install Axios using: npm install axios
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {  useNavigate } from 'react-router-dom';

const DynamicForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['batli']);
  const [formFields, setFormFields] = useState([{ units: '', area: '', price: '' }]);

  

  const addFields = () => {
    setFormFields([...formFields, { units: '', area: '', price: '' }]);
  };

  const removeFields = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = cookies.Rera;
    try {
      await axios.post('http://localhost:8800/builder_bhk',{ data: formFields, data2:id });
      removeCookie('Rera', cookies.Rera )
      navigate("/")
      // Handle success or redirection if needed
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }
  };
 
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={`units-${index}`}>Units:</label>
            <input
              type="number"
              id={`units-${index}`}
              name={`units-${index}`}
              value={field.units}
              onChange={(e) => handleChange(index, 'units', e.target.value)}
              placeholder='Enter Bhk '
              required
            />
            <label htmlFor={`area-${index}`}>Area:</label>
            <input
              type="number"
              id={`area-${index}`}
              name={`area-${index}`}
              value={field.area}
              onChange={(e) => handleChange(index, 'area', e.target.value)}
              placeholder='Enter sqft area '
              required
            />
            <label htmlFor={`price-${index}`}>Price:</label>
            <input
              type="number"
              id={`price-${index}`}
              name={`price-${index}`}
              value={field.price}
              onChange={(e) => handleChange(index, 'price', e.target.value)}
              placeholder='Enter Price'
              required
            />
            
            
            
            <button type="button" onClick={() => removeFields(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addFields}>
          Add
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;