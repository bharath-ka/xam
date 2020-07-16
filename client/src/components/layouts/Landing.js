import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to='/tests'></Redirect>;
  }

  return (
    <div className='display-4 text-center'>
      <h1>XAM</h1>
      <br />
      Examination Assessment Model
    </div>
  );
};

export default Landing;
