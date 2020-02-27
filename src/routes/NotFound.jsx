/**
 Created by Gray
 using WebStorm at
 21:51 on 23-Feb-20
 */
import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => (
    <div>
        <h1>Oops! You are in the wrong direction</h1>
        <Link to="/admin/dashboard">Come back to home</Link>
    </div>
);
export default NotFound;
