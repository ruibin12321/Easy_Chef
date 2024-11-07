import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
import './signuppage.css'

function Signuppage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [skillLevel, setSkillLevel] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		// Validate input fields
		const validationErrors = validateFields();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		// Submit form data to server
	  	const newUser = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			skillLevel: skillLevel,
			username:username,
			password: password,
	  	};

		try {
			const response = await axiosInstance.post('/api/accounts/', newUser);
			// Navigate to the login page
			if (response.status === 201) {
				console.log('New user created:', response.data);
				navigate('/login')
			}
		} catch(error) {
			if (error.response && error.response.status === 400) {
				console.error('User already exists');
				// Show an error message
				validationErrors.email = 'User with this email already exists';
				validationErrors.username = 'Username already been taken';
				setErrors(validationErrors);
			} else {
				console.error('Failed to create user');
				setErrors('Unexpected server error');
			}
	  	}
	};

	function validateFields() {
		const validationErrors = {};
		if (!firstName) {
			validationErrors.firstName = 'Please enter your first name.';
		}
		if (!lastName) {
			validationErrors.lastName = 'Please enter your last name.';
		}
		if (!email) {
			validationErrors.email = 'Please enter your email address.';
		} else if (!isValidEmail(email)) {
			validationErrors.email = 'Please enter a valid email address.';
		}
		if (!phone) {
			validationErrors.phone = 'Please enter your phone number.';
		} else if (!isValidPhoneNumber(phone)) {
			validationErrors.phone = 'Please enter a valid phone number.';
		}
		if (!skillLevel) {
			validationErrors.skillLevel = 'Please select your skill level.';
		}
		if (!username) {
			validationErrors.username = 'Please enter a username.';
		}
		if (!password) {
			validationErrors.password = 'Please enter a password.';
		} else if (password.length < 8) {
			validationErrors.password = 'Password must be at least 8 characters.';
		}
		if (password !== confirmPassword) {
			validationErrors.confirmPassword = 'Passwords do not match.';
		}
		return validationErrors;
	}

	function isValidEmail(email) {
		// Regex pattern for email validation
		const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return emailPattern.test(email);
	}

	function isValidPhoneNumber(phone) {
		// Regex pattern for phone number validation
		const phonePattern = /^\d{10}$/;
		return phonePattern.test(phone);
	}

	return (
		<main id="sign_up">
			<div className="container" style={{width: "585px", backgroundColor: "lightgrey", color: "black"}}>
				<form onSubmit={handleSubmit}>
					<div className="text-center bg-transparent">
						<h3 style={{ fontSize: "33px", fontWeight: "bold",
							fontFamily: "Andale Mono, AndaleMono, monospace" }}>Sign up</h3>
					</div>
					<div className="form-group">
						<label htmlFor="first-name">First Name</label>
						<input type="text" id="first-name" className="form-control"
							   placeholder="pleace enter your first name here!"
							   value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
						{errors.firstName && <span className="error">{errors.firstName}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="last-name">Last Name</label>
						<input type="text" id="last-name" className="form-control" value={lastName}
							   placeholder="pleace enter your last name here!"
							   onChange={(event) => setLastName(event.target.value)}/>
						{errors.lastName && <span className="error">{errors.lastName}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						<input type="email" id="email" className="form-control" value={email}
							   placeholder="pleace enter your email here!"
							   onChange={(event) => setEmail(event.target.value)}/>
						{errors.email && <span className="error">{errors.email}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="phone">Phone Number</label>
						<input type="tel" id="phone" className="form-control" value={phone}
							   placeholder="pleace enter your phone number here!"
							   onChange={(event) => setPhone(event.target.value)}/>
						{errors.phone && <span className="error">{errors.phone}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="skill-level">Skill Level</label>
						<select id="skill-level" className="form-control" value={skillLevel}
								onChange={(event) => setSkillLevel(event.target.value)}>
							<option value="">----</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
						{errors.skillLevel && <span className="error">{errors.skillLevel}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" className="form-control" value={username}
							   placeholder="pleace enter your username here!"
							   onChange={(event) => setUsername(event.target.value)}/>
						{errors.username && <span className="error">{errors.username}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" className="form-control" value={password}
							   placeholder="pleace enter your password here!"
							   onChange={(event) => setPassword(event.target.value)}/>
						{errors.password && <span className="error">{errors.password}</span>}
					</div>
					<div className="form-group">
						<label htmlFor="confirm-password">Confirm Password</label>
						<input type="password" id="confirm-password" className="form-control" value={confirmPassword}
							   placeholder="pleace confirm your password here!"
							   onChange={(event) => setConfirmPassword(event.target.value)}/>
						{errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
					</div>
					<div className="but">
					<button className="btn btn-outline-success" type="submit">Sign up</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default Signuppage;



