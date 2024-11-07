function Slider() {
    return (
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
			<div class="carousel-indicators">
				<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"
					aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img class="bd-placeholder-img" width="100%" height="100%" src="images/banner1.jpg" alt="hotpot" />

					<div class="container">
						<div class="carousel-caption text-start">
							<h1>Popular Recipes</h1>
							<p>Popular Recipes</p>
							<p><a class="btn btn-lg btn-primary" href="sign_up.html">Sign up today</a></p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<img class="bd-placeholder-img" width="100%" height="100%" src="images/banner2.jpg" alt="french" />
					<div class="container">
						<div class="carousel-caption">
							<h1>Try French cuisine youself.</h1>
							<p>French cuisine spreads all over the world, and is good at marketing a sense of luxury, often occupying the highest level in the culinary world.</p>
							<p><a class="btn btn-lg btn-primary" href="home.html">Learn more</a></p>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<img class="bd-placeholder-img" width="100%" height="100%" src="images/banner3.jpg" alt="create_recipe" />
					<div class="container">
						<div class="carousel-caption text-end">
							<h1>Create your own recipe.</h1>
							<p>Becoming a better cook is a lifelong journey, the better we get, the bigger the challenges that we seek. </p>
							<p><a class="btn btn-lg btn-primary" href="user_recipe.html">View your recipes</a></p>
						</div>
					</div>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>

    );
}
export default Slider;