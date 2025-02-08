// src/components/ProfilePage.js
import React, { useState, useEffect } from 'react';
import ProfilePageComponent from '../modules/ProfileComponent';
import Header from '../modules/header';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  return(
<div>
  <Header/>
  <ProfilePageComponent/>
</div>
  )
};
export default ProfilePage;