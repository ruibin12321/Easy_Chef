import React, { useState, useEffect } from 'react';
import axiosInstance from "../services/api";
import { useParams } from "react-router-dom";
import './viewprofile.css'

function ViewProfile() {
    const [userData, setUserData] = useState({});
    const { id } = useParams(); // get the ID parameter from the URL
    console.log(id);

    const token = localStorage.getItem('access_token');
    console.log(token);

    useEffect(() => {
         axiosInstance.get(`/api/accounts/${id}/`)
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => {
            console.error(error);
            console.log("no token")
        });
    }, []);


  return (
    <div className="profile-card">
        <img src={userData.avatar} alt="avatar" className="profile-picture"></img>
        <h2 className="username">{userData.username}</h2>
        <ul className="user-info">
            <li><span>First Name:</span> {userData.first_name}</li>
            <li><span>Last Name:</span> {userData.last_name}</li>
            <li><span>Skill Level:</span> {userData.skill_level}</li>
            <li><span>Email:</span> {userData.email}</li>
            <li><span>Phone:</span> {userData.phone_number}</li>
        </ul>
        <a href="/editprofile" className="edit-profile">Edit Profile</a>
    </div>
  )
}

export default ViewProfile;