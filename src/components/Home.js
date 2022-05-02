import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';

import LoginForm from './registration/login';
import SignupForm from './registration/signup';
import Messages from './messages';
import NewMessage from './messages/new_message';

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
            <Route path="*" element={<Navigate to="/messages" replace />} />
            <Route index path="/messages" element={<RequireAuth><Messages /></RequireAuth>}/>
            <Route path="/messages/new" element={<RequireAuth><NewMessage /></RequireAuth>} />
          </Routes>
        </div>
      </>
    </Grid>
  );
}
