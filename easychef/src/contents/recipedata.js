import React from 'react';

function RecipeData(props) {
  return (
    <div class="card" style={{ width: '30rem', height: '15rem' }}>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <span style= {{fontSize: "15px"}}>
                    Ingredients
                </span>
                <span style={{fontSize: "40px", marginLeft: "5rem", fontWeight: "lighter", fontFamily: "Andale Mono,AndaleMono, monospace"}}>
                    {props.ingredients}
                </span>
            </li>
            <li className="list-group-item">
                <span style={{fontSize: "15px"}}>
                    Pre/cook (Minutes)
                </span>
                <span style={{fontSize: "40px", marginLeft: "2rem", fontWeight: "lighter", fontFamily: "Andale Mono,AndaleMono, monospace"}}>
                        {props.pre}/{props.cook}
                </span>
            </li>
            <li className="list-group-item">
                <span style={{fontSize: "15px"}}>
                    Serving
                </span>
                <span style={{fontSize: "40px", marginLeft: "7rem", fontWeight: "lighter", fontFamily: "Andale Mono,AndaleMono, monospace"}}>
                    {props.serve}
                </span>
            </li>
        </ul>
    </div>
  );
}

export default RecipeData;
