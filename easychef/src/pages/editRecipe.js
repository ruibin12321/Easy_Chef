import './editRecipe.css';
import IngredientDropdown from '../components/createrecipe/ingredientDropdown';
import CreateIngrediantModal from '../components/createrecipe/createIngredientModal';
import { useState, useEffect } from 'react';
import axiosInstance from '../services/api';
import { useParams } from 'react-router-dom';

function EditRecipe(){
    const[showCreateIngrediant, setShowCreateIngrediant] = useState(false);
    const[ingredientList, setIngredientList] = useState([]);
    const[totalSteps, setToalSetps] = useState(1);
    const [image, setImage] = useState(null);
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[cuisine, setCuisine] = useState('');
    const[cookingTime, setCookingTime] = useState('');
    const[serving, setServing] = useState('');
    const[calorie, setCalorie] = useState('');
    const[diet, setDiet] = useState('');
    const[prepTime, setPrepTime] = useState('');
    const [stepsValues, setStepsValues] = useState(['']);
    const[ingredientValues, setIngredientValues] = useState(['']);
    
    const { id } = useParams(); // get the ID parameter from the URL
    console.log(id); 

    useEffect(() => {
        if (localStorage.getItem('access_token') == null) {
            window.location.href = '/login/';
         }
        axiosInstance.get(`/api/recipes/${id}/`,{headers: { 'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {
        // const ingredientsData = response.data.map(item => ({
        //   id: item.id,
        //   name: item.name,
        //   unit: item.unit
        // }));
        // setIngredients(ingredientsData);
        // setFilterIngredients(ingredientsData);
            console.log(response);
            setName(response.data.name);
            setDescription(response.data.description);
            setCuisine(response.data.cuisine);
            setCookingTime(response.data.cooking_time);
            setCalorie(response.data.calorie);
            setDiet(response.data.diets);
            setServing(response.data.serving);
            setPrepTime(response.data.prepTime);
            setImage(response.data.image);

            var steps = response.data.direction.split(';!;');
            setToalSetps(steps.length);
            setStepsValues(steps);
      })
      .catch(error => console.error(error));
      
      axiosInstance.get(`/api/recipes/${id}/ingredients/`,{headers: { 'Authorization':`Bearer ${localStorage.getItem('access_token')}`}})
        .then(response => {
            console.log(response);
            const ingredientData = response.data.data.map(item => ({
                id: item[0].id,
                name: item[0].name,
                unit: item[0].unit
              }));
            setIngredientList(ingredientData);

            const ingredientValue = response.data.data.map(item => (item[0].id+":"+item[1]));
            setIngredientValues(ingredientValue);
            
      })
      .catch(error => console.error(error));



       },[]);
    
    const handleOnAddIngredient = (newValue) => {
        if (!ingredientList.some((ingredient) => ingredient.id === newValue.id)) {
            setIngredientList(ingredientList.concat(newValue));
        }
    };

    const handleRemoveIngredient= (id, index) => {
        const newIngredientValues = [...ingredientValues];
        newIngredientValues.splice(index, 1);
        setIngredientValues(newIngredientValues);
        setIngredientList(ingredientList.filter((item) => item.id !== id));
      };
    
    const handleRemoveStep = (index) => {
        const newStepsValues = [...stepsValues];
        newStepsValues.splice(index, 1);
        setStepsValues(newStepsValues);
        setToalSetps(totalSteps - 1)
      };

    useEffect(() => {
        renderIngredientTableRows();
      }, [ingredientList]);
    
    const renderIngredientTableRows = () => {
        return ingredientList.map((item,index) => (
          <tr key={item.id}>
            <td><input type="text" value={item.name} disabled /></td>
            <td><input type="number" value={ingredientValues.length>index? ingredientValues[index].split(":")[1]:''} min={0} style={{width:'150px'}} onChange={(event) => handelIngrediantChange(event, index, item.id)} />{item.unit}</td>
            <td><button type="button" class="but" onClick={() => handleRemoveIngredient(item.id,index)}>remove</button></td>

          </tr>
        ));
      };

    const renderStepTableRows = () => {
        const rows = [];
        for (let i = 0; i < totalSteps; i++) {
            if (i != totalSteps - 1 || i == 0) {
                if (stepsValues.length > i){
                    rows.push(
                        <tr>
                        <td>Step {i + 1} </td>
                        <td><input type="text" value={stepsValues[i]}  onChange={(event) => handleStepChange(event, i)}/></td>
                        </tr>
                    );
                    
                }else{
                    rows.push(
                        <tr>
                        <td>Step {i + 1} </td>
                        <td><input type="text"  onChange={(event) => handleStepChange(event, i)}/></td>
                        </tr>
                    );
                    
                }
                
            } else {
                if (stepsValues.length > i){
                    rows.push(
                        <tr>
                        <td>Step {i + 1} </td>
                        <td><input type="text" value={stepsValues[i]}  onChange={(event) => handleStepChange(event, i)}/> <button type="button" class="but" onClick={() => handleRemoveStep(i)}>remove</button>
                        </td>
                        </tr>
                    );

                }else{
                    rows.push(
                        <tr>
                        <td>Step {i + 1} </td>
                        <td><input type="text"  onChange={(event) => handleStepChange(event, i)}/> <button type="button" class="but" onClick={() => handleRemoveStep(i)}>remove</button>
                        </td>
                        </tr>
                    );

                }
                
            }
            
        }
        return rows;
    }

    const handleStepChange = (event, index) => {
        const { value } = event.target;
        const newStepValues = [...stepsValues];
        newStepValues[index] = value;
        setStepsValues(newStepValues);
        console.log(stepsValues);
      };
    
    const handelIngrediantChange = (event, index, id) => {
        const {value} = event.target;
        const newIngredientValues = [...ingredientValues]
        newIngredientValues[index] = id+':'+value;
        setIngredientValues(newIngredientValues);
    }
    const addStep = () => {
        setToalSetps(totalSteps + 1);
    }
    
    const handleSubmit = async e => {
        e.preventDefault();
        const recipe = {
              name: name,
              image:image,
              description: description,
              cuisine: cuisine,
              cooking_time: cookingTime,
              serving: serving,
              calorie: calorie,
              diets: diet,
              prep_time: prepTime,
              direction: stepsValues.join(';!;'),
              ingredients: ingredientValues.join(',')
             };
        console.log(recipe);
         // Create the PUT requuest
         try{
            const {data} = await axiosInstance.put(`/api/recipes/${id}/`,recipe ,
            {headers: {'Content-Type': 'multipart/form-data', 'Authorization':`Bearer ${localStorage.getItem('access_token')}`} },);
            console.log(data);
            //setError('');
            
        }catch(error){
            console.log(error);
            if (error.response.status === 401) {
                //setError('Username or password is invaild');
              } else {
                //setError('Unexpected server error');
              }
        }
        
    }
    
    const renderImageSelection = () => {
        if(image == '' || typeof(image) != 'string'){
                return (<input class="input" type="file" id="image" accept="image/*" onChange={e => setImage(e.target.files[0])} required />)
        }else{
            return (<div><img src={`http://127.0.0.1:8000/${image}`} style={{width:'100px'}}/><a onClick={()=> setImage("")}>remove</a></div>)
        }
    }
    return(
        <main id='edit_recipe' >
		<div class="background-container">
			<section class="py-5 text-center container">
				<div class="row py-lg-5">
					<div class="col-lg-6 col-md-8 mx-auto">
						<h1 class="fw-light">Edit Recipe</h1>
						<p class="lead text-muted">edit your own recipe</p>
					</div>
				</div>
			</section>
		</div>

		<form class="grid-container">
			<div class="grid-item name">
				<label for="name" >Recipe Name</label><br />
				<input id="name" placeholder="name of recipe" type='text' value={name}  onChange={e => setName(e.target.value)} required />
			</div>
			<div class="grid-item image">
				<label for="image">Picture</label>
                {renderImageSelection()}
			</div>
			<div class="grid-item description">
				<label for="description">Description</label><br />
				<textarea class="textarea" id="description" rows="2" placeholder="briefly tell us about your recipe" type='textarea' value={description}  onChange={e => setDescription(e.target.value)} required />
			</div>
			<div class="grid-item diets">
				<label for="diets">Diets</label>
				<select name="diets" id="diets" value={diet}  onChange={e => setDiet(e.target.value)} required >
					<option value="----">----</option>
					<option value="raw">raw</option>
					<option value="gluten-free">gluten-free</option>
					<option value="vegetarian">vegetarian</option>
					<option value="raw">raw</option>
					<option value="low-carb">low-carb</option>
					<option value="no-sugar">no-sugar</option>
				</select>
			</div>
			<div class="grid-item cuisine">
				<label for="cuisine">Cuisine</label>
				<select name="cuisine" id="cuisine" value={cuisine}  onChange={e => setCuisine(e.target.value)} required >
					<option value="----">----</option>
					<option value="Chinese">Chinese</option>
					<option value="Indian">Indian</option>
					<option value="Pakistani">Pakistani</option>
					<option value="German">German</option>
					<option value="American">American</option> 
				</select>
			</div>
			<div class="grid-item ingredient">
				<label for="ingredient">Ingredients</label>
				<button type="button" class="but" onClick={()=> setShowCreateIngrediant(true)}>add</button>
				<table>
					<tr>
						<th>Item</th>
						<th>Quantity</th>
                        <th></th>
					</tr> 
                    <tr>
						<td colSpan={3}><IngredientDropdown onAdd={handleOnAddIngredient} /></td>

					</tr>
					
                   {renderIngredientTableRows()}
				</table>
			</div>
			<div class="grid-item prep-time">
				<label for="prep-time">Prep Time(min)</label>
				<input name="prep-time" id="prep-time" type='number' value={prepTime}  onChange={e => setPrepTime(e.target.value)} required />
					
			</div>
			<div class="grid-item cooking-time">
				<label for="cooking-time">Cooking Time(min)</label>
				<input name="cooking-time" id="cooking-time" type='number' value={cookingTime}  onChange={e => setCookingTime(e.target.value)} required />
			</div>
			<div class="grid-item steps">
				<label for="steps">Steps</label>
				<button type="button" class="but" onClick={addStep}>add</button>
				<table>
					<tr>
						<th>Steps</th>
						<th>To Do</th>
					</tr>
					{renderStepTableRows()}
				</table>
			</div>
			<div class="grid-item serving">
				<label for="serving">Serving</label>
				<input  name="serving" id="serving" type='number' value={serving}  onChange={e => setServing(e.target.value)} required />
			</div>
            <div class="grid-item calorie">
				<label for="calorie">calorie</label>
				<input name="calorie" id="calorie" type='number' value={calorie}  onChange={e => setCalorie(e.target.value)} required />
			</div>
			<div class="but">
				<button type="button" class="btn btn-outline-success btn-lg" herf="home.html" onClick={handleSubmit}>save</button>
			</div>
		</form>
        <CreateIngrediantModal show={showCreateIngrediant} close={()=> setShowCreateIngrediant(false)} />


</main>
    );
}
export default EditRecipe;