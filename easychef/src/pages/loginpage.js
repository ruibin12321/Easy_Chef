
import './loginpage.css';
import Alert from 'react-bootstrap/Alert';
import React, { useState, useEffect} from 'react';
import axiosInstance from '../services/api';

function Loginpage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            window.location.href = '/';
         }
       });
    const handleSubmit = async e => {
        e.preventDefault();
        const user = {
              username: username,
              password: password
             };
        // Create the POST requuest
        try{
            const {data} = await axiosInstance.post('http://127.0.0.1:8000/api/token/',user ,
            {headers: {'Content-Type': 'application/json'}},);
            console.log(data);
            setError('');
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            localStorage.setItem('user_id', data.user_id);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            window.location.href = '/';
            
        }catch(error){
            console.log(error);
            if (error.response.status === 401) {
                setError('Username or password is invaild');
              } else {
                setError('Unexpected server error');
              }
        }
        
        
    }
    
  return ( 
      <main id="sign_up">
		<div class="container" style={{width: "585px", backgroundColor: 'lightgrey', color: 'black'}}>	
            
            <form onSubmit={handleSubmit}>
				<div class="p-5 text-center bg-transparent">
					<h3 class="mb-1" style={{fontSize: '31px', fontWeight: 'bold', fontFamily:'Andale Mono,AndaleMono, monospace'}}>Welcome To Easy Chef!</h3>
				</div>
                {error && <Alert variant="danger">{error}</Alert>}
				<div class="form-group">
					<label for="username">username</label>
                    <input class="form-control" placeholder="pleace enter your username here!" id="username" name='username'  type='text' value={username}  onChange={e => setUsername(e.target.value)} required />
                </div>
				<div class="form-group">
					<label for="password">password</label>
                    <input name='password'type="password" className="form-control mt-1" placeholder="pleace enter your phone-number here!" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
				<div class="fg">
					<a href="forget_pw.html" style={{color: "black"}}>I am stuck! I cannot login.</a>
				</div>
				<div class="but">
					<button type="submit"  class="btn btn-outline-success" herf="home.html">login</button>
				</div>
			</form>
		</div>
      </main>
  );
}

export default Loginpage;
