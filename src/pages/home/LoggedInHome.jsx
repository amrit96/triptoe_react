import React from 'react';
// import { styled } from '@mui/material/styles';
// import { useSelector } from 'react-redux';

import TopNav from '../../components/TopNav';

const LoggedInHome = () => {

  return (
    <div>
        <TopNav />
        <p>'You are logged in'</p>
    </div>
  );
};

export default LoggedInHome;
