import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import Form from './Form';
import { useLoginMutation } from '../../services/api_service';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LOGIN_TAB = 0;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [login, result] = useLoginMutation({fixedCacheKey: 'user-auth-login'});
  const emptyForm = _.every(_.map([email, password], _.isEmpty));

  const navigate = useNavigate();

  useEffect(() => {
    if (result.isError) {
      const errorMessage = emptyForm ? '' : 'Error logging in, please try again.';
      setError(errorMessage);
    } else if (result.isSuccess && result.data.token) {
      navigate('/');
    }
  }, [result.isLoading, emptyForm, result.isError]);

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={LOGIN_TAB} aria-label="login and signup tabs">
          <Tab label="Login" aria-label="login to continue" />
          <Tab label="Signup" aria-label="go to signup" onClick={() => navigate('/signup')} />
        </Tabs>
      </Box>
      <Form title="Please login to continue"
        email={email}
        password={password}
        togglePasswordVisibility={togglePasswordVisibility}
        error={error}
        setEmail={setEmail}
        setPassword={setPassword}
        showPassword={showPassword}
        action={login}
        data={{email, password}}
        buttonText="Login"
      />
    </Box>
  );
};

export default LoginForm;
