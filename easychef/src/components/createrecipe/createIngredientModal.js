import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import asiosInstance from '../../services/api'

function CreateIngredientModal(props) {
  const [ingredient, setIngredient] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async e => {
    setError('');
    setSuccess('');
    e.preventDefault();
    if (ingredient.length == 0 || unit.length == 0) {
      setError("Invaild Ingredient Name Or Unit");
      return;
    }
    const ingredientobj = {
      name: ingredient,
      unit: unit
     };
    try{
      const {data} = await asiosInstance.post('/api/ingredients/',ingredientobj ,
      {headers: {'Content-Type': 'application/json', 'Authorization':`Bearer ${localStorage.getItem('access_token')}`}},);
      setSuccess("Add Ingredient Successful");
      setIngredient('');
      setUnit('');
      
  }catch(error){
      console.log(error);
      if (error.response.status === 400) {
          setError('Ingredient already exist');
        } else {
          setError('Unexpected server error');
        }
  }
}


  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrediant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the ingrediant name"
                autoFocus
                value={ingredient}  
                onChange={e => setIngredient(e.target.value)} 
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ingrediant Unit</Form.Label>
              <Form.Select aria-label="Default select example"
                value={unit}  
                onChange={e => setUnit(e.target.value)} 
                required
              >
              <option>Select Unit type</option>
              <option value="oz">Ounce (oz)</option>
              <option value="lb">Pound (lb)</option>
              <option value="g">Gram (g)</option>
              <option value="kg">Kilogram (kg)</option>
              </Form.Select>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Ingredient
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateIngredientModal;
