import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import axiosInstance from '../../services/api';

function IngredientDropdown(props) {
  const [selectedItem, setSelectedItem] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [filterIngredients, setFilterIngredients] = useState([]);
  useEffect(() => {
    axiosInstance.get('/api/ingredients/',{headers: { 'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
      .then(response => {
        const ingredientsData = response.data.map(item => ({
          id: item.id,
          name: item.name,
          unit: item.unit
        }));
        setIngredients(ingredientsData);
        setFilterIngredients(ingredientsData);
      })
      .catch(error => console.error(error));
  }, []);
  const handleSelect = (selected) => {
    setSelectedItem(selected[0]);
  };


  const handleInputChange = (input) => {
    if (input) {
      const filteredOptions = ingredients.filter((option) =>
        option.name.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilterIngredients(filteredOptions);
    } else {
      setFilterIngredients(ingredients);
    }
  };
  
  const handleOnAdd = () =>{
    if (selectedItem != undefined && selectedItem != ''){
      props.onAdd(selectedItem);
    }

  }

  return (
    <div>
      <InputGroup>
        <Typeahead
          id="autocomplete"
          labelKey={(option) => option.name}
          onChange={handleSelect}
          options={filterIngredients}
          onInputChange={handleInputChange}
          placeholder="Select Ingredient"
          selected={filterIngredients.filter(x=> x === selectedItem)}
        />
        <Button onClick={handleOnAdd}>add</Button>
      </InputGroup>
      <div>Selected Item: {selectedItem && selectedItem.name}</div>
    </div>
  );
}

export default IngredientDropdown;
