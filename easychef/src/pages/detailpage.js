import './detailpage.css';
import React, { useState, useEffect} from 'react';
import Comment from '../contents/comments';
import RecipeData from '../contents/recipedata';
import StarRating from '../contents/rating';
import axiosInstance from '../services/api';

function Detailpage() {
    const [recipe, setRecipe] = useState([])
    var [ingredients, setIngredients] = useState([])
    var [steps, setSteps] = useState([])

    useEffect(() => {
        axiosInstance.get('/api/recipes/1/')
          .then(response => {
            const recipeData = response.data.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              cuisine: item.cuisine,
              ingredients: item.ingredients,
              cook_time: item.cook_time,
              serving: item.serving,
              calorie: item.calorie,
              diets: item.diets,
              direction: item.direction,
              creator: item.creator
            }));
            setRecipe(recipeData);
          })
          .catch(error => console.error(error));
      }, []);
    console.log(recipe)


    return (
        <main id="detail">
            <div className='parent'>

                {/* Here is the section of the recipe info */}
                <div className='container_top'>
                    {/* Here is the seciton of the introduction of the recipe */}
                    <div className='container1'>
                        <figcaption className="figure-caption">
                            <span style={{fontSize: "20px", fontWeight: "bold", fontFamily: "Andale Mono,AndaleMono, monospace"}}>
                                Best Roasted Chicken
                            </span><br/>

                            {/* Rating */}
                            <StarRating rating={1} />

                            <a href="#comment" style= {{fontSize: "18px", color:"grey", marginLeft: "10rem"}}>
                                see comments
                            </a><br/><br/>
					        <span style= {{fontSize: "15px"}}>
                                Diets:raw <br/>
                                Cuisine: Chinese
                                <hr/>
                                Glazed in a flavorful homemade sauce! 
                            </span>
                        </figcaption>
                    </div>

                    {/* Here is the section of the info of recipe */}
                    <div className='container2'>
                        <div className='a'>
                            <RecipeData ingredients ="10" pre ="1" cook="5" serve="10" />
                        </div>
                        
                        <div className='b'>
                            {/* Here is the section of ingredients detail */}
                            <div className='b_1'>
                                <span style={{ fontSize: "30px", fontFamily:"Courier New", color: "darkgreen"}}>Ingredients:</span><br/><br/>
                                {/* {ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))} */}
                            </div>

                            {/* Here is the seciton of the steps detail */}
                            <div className='b_2'>
                                <span style={{ fontSize: "30px", fontFamily:"Courier New", color: "darkgreen"}}>Steps:</span><br/><br/>
                                {/* {steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Here is the section of the comments */}
                <div className="container3">
                    <a id="comment"> </a><br/><br/><br/>
                    <hr style={{borderWidth: '6px'}}/>
                    <h10 style={{fontSize: '40px', marginLeft: '10rem', fontWeight: 'lighter',
                                fontFamily: 'Andale Mono,AndaleMono, monospace'}}>Comments: .....</h10><br/>
                    {/* <!-- https://bbbootstrap.com/snippets/bootstrap-comment-template-profile-images-52602180 --> */}
                    <div className="container mt-1 d-flex justify-content-center">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="card" style={{width: '1000px'}}>
                            <ul className="list-unstyled">
                                <Comment author = "liut" avatar="https://img.icons8.com/bubbles/100/000000/couple-icloud.png"
                                />
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </main>
       
    );
}

export default Detailpage;


