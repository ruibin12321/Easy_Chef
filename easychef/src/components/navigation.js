import React, { useState, useEffect} from 'react';
function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const user_id = localStorage.getItem('user_id');
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
    const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
    };
  
  return (
    <header>
		<nav class="navbar navbar-expand-md fixed-top bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">
					<img src="/images/Logo.png" class="bi me-2" width="40" height="32" />
					Easy Chef
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
					aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarCollapse">
					<ul class="navbar-nav me-auto mb-2 mb-md-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="/">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/myrecipe/">My Recipe</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
								More
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href={`/viewprofile/${user_id}`}>My Profile</a></li>
								<li>
									<hr class="dropdown-divider" />
								</li>
								<li><a class="dropdown-item" href="/Shoppinglist/">Shopping List</a></li>
								<li><a class="dropdown-item" href="/editprofile/">Edit Profile</a></li>
								<li>
									<hr class="dropdown-divider" />
								</li>
							</ul>
						</li>

					</ul>
					<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
						<a href="search.html"><input type="search" class="form-control form-control"
								placeholder="Search..." aria-label="Search" /></a>
					</form>
					<div class="text-end">
            {isAuth?<button type="button"
								class="btn btn-outline-primary me-2" onClick={handleLogout}>Logout</button>:<><a href="/login"><button type="button" class="btn btn-outline-primary me-2">Login</button></a>
                <a href="/signup"><button type="button" class="btn btn-primary">Sign-up</button></a></>}
					</div>
				</div>
			</div>
		</nav>

	</header>
  );
}

export default Navigation;