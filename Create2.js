import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import classes from './Create2.module.css'

const DynamicForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['batli']);
  const [formFields, setFormFields] = useState([
    { units: '', area: '', price: '', image: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  const handleImageChange = (index, image) => {
    const updatedFields = [...formFields];
    updatedFields[index].image = image;
    setFormFields(updatedFields);
  };

  const handleAddRow = () => {
    setFormFields([...formFields, { units: '', area: '', price: '', image: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const id = cookies.Rera;
    console.log(id)
    try {
      const formDataArray = formFields.map((field) => {
        const formData = new FormData();
        formData.append('units', field.units);
        formData.append('area', field.area);
        formData.append('price', field.price);
        formData.append('image', field.image);
        formData.append('id', id);

        return formData;
      });

      // Use Promise.all to send multiple requests simultaneously
      await Promise.all(
        formDataArray.map((formData) =>
          axios.post('http://localhost:8800/builderbhk', formData)
        )
      );
      removeCookie('Rera', cookies.Rera)
      alert('property posted successfully!')
      navigate("/dashboard")
      //console.log('Responses:', responses);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <div className={classes.hold}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>
              Units:
              <input
                type="text"
                value={field.units}
                onChange={(e) => handleChange(index, 'units', e.target.value)}
              />
            </label>
            <label>
              Area:
              <input
                type="text"
                value={field.area}
                onChange={(e) => handleChange(index, 'area', e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                value={field.price}
                onChange={(e) => handleChange(index, 'price', e.target.value)}
              />
            </label><br></br>
            <label>
              Image:
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
            </label>
            <button onClick={() => handleRemoveRow(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddRow} className={classes.add}>Add Unit</button><br></br>
      </div>
      <button onClick={handleSubmit} className={classes.sbt}>Submit</button>
    </div>
  );
};

export default DynamicForm;
