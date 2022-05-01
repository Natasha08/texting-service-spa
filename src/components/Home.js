import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';

import LoginForm from './registration/Login';
import SignupForm from './registration/Signup';

const RequireAuth = ({children}) => {
  const user = useSelector(({user}) => user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{from: location}} replace />;
  } else {
    return children;
  }
};

export default function Home() {
  return (
    <Grid className="App"
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <>
        <div className="Main">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />}/>

            <Route index path="/" element={<RequireAuth><div>Send Text Messages</div></RequireAuth>}/>
          </Routes>
        </div>
      </>
    </Grid>
  );
}
