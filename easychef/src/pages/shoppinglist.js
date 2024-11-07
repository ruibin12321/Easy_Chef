import React from "react";
import './shoppinglist.css';
function Shoppinglist() {

    return(
		<div className="shopping-cart">
			<section className="py-5 text-center container">
				<div className="row py-lg-5">
					<div className="col-lg-6 col-md-8 mx-auto">
						<h1 className="fw-light">Your Recipes</h1>
					</div>
				</div>
			</section>
			<table>
				<thead>
				<tr>
					<th>Recipe</th>
					<th>Ingredients/Quantity</th>
					<th>Serving</th>
					<th>Total_Serving</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Recipe 1</td>
					<td>
						<ul className="ingredient-list">
							<li>Chicken/1lb</li>
							<li>Salt/1tbsp</li>
						</ul>
					</td>
					<td><input type="number" value="1" min="1"></input></td>
					<td>1</td>
					<td>
						<button>Remove</button>
					</td>
				</tr>
				<tr>
					<td>Recipe 2</td>
					<td>
						<ul className="ingredient-list">
							<li>Beef/1lb</li>
							<li>Salt/1tbsp</li>
							<li>Black Pepper/1tbsp</li>
							<li>Oil/2tbsp</li>
						</ul>
					</td>
					<td><input type="number" value="1" min="1"></input></td>
					<td>1</td>
					<td>
						<button>Remove</button>
					</td>
				</tr>
				</tbody>
				<tfoot>
				<tr>
					<td colSpan="3"></td>
					<td>2</td>
					<td>
						<button>Calculate Ingredient</button>
					</td>
				</tr>
				</tfoot>
			</table>

			<main>
				<section className="py-5 text-center container">
					<div className="row py-lg-5">
						<div className="col-lg-6 col-md-8 mx-auto">
							<h1 className="fw-light">Your Ingredients</h1>
						</div>
					</div>
				</section>

				<div className="flex_container">
					<div>Meat
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/lb</div>
							<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">beef</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">lamb</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">chicken wings</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">chicken thigh</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">pork</div>
									<div className="grid-item-right">3</div>
								</div>
					</div>
					<div>Vegetables
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/lb</div>
							<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">broccoli</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">carrots</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">cabbages</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">garlic</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">okra</div>
									<div className="grid-item-right">3</div>
								</div>

					</div>
					<div>Fruits
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/lb</div>
							<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">apple</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">orange</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">pear</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">peach</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">banana</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">kiwi</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">watermelon</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">blueberry</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">mango</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">strawberry</div>
									<div className="grid-item-right">3</div>
								</div>
					</div>
					<div>Eggs&Soy Products
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/g</div>
								<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">egg</div>
									<div className="grid-item-right">1000</div>
								</div>
					</div>
					<div>Seafood
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/lb</div>
							<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">octopus</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">clam</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">crabs</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">oyster</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">mussel</div>
									<div className="grid-item-right">3</div>
								</div>
					</div>
					<div>Beverage
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/ml</div>
						<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">milk</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">coke</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">apple juice</div>
									<div className="grid-item-right">5</div>
								</div>
					</div>
					<div>Flavoring
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/g</div>
						<hr className="rounded"></hr>
					</div>
					<div>Cereals
						<hr className="rounded"></hr>
							<div className="item-quantity">Item Quantity/g</div>
						<hr className="rounded"></hr>
								<div className="grid-container">
									<div className="grid-item-left">quinoa</div>
									<div className="grid-item-right">1</div>
									<div className="grid-item-left">oats</div>
									<div className="grid-item-right">3</div>
									<div className="grid-item-left">wheat</div>
									<div className="grid-item-right">5</div>
									<div className="grid-item-left">rice</div>
									<div className="grid-item-right">9</div>
									<div className="grid-item-left">barley</div>
									<div className="grid-item-right">3</div>
								</div>
					</div>
				</div>
			</main>
		</div>
    )
}

export default Shoppinglist;