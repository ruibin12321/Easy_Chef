import './detailpage.css';
import React, { useState, useEffect} from 'react';

function Editprofile() {
    return(
    <div className="profile-card">
        <img src="../../public/logo192.png" alt="User profile picture" className="profile-picture"></img>
        <h2 className="username">username</h2>
        <ul className="user-info">
            <li><span>First Name:</span> firstname</li>
            <li><span>Last Name:</span> lastName</li>
            <li><span>Email:</span> email</li>
            <li><span>Phone:</span> phone</li>
        </ul>
        <a href="/editprofile" className="edit-profile">Edit Profile</a>
    </div>
    )
}

export default Editprofile;