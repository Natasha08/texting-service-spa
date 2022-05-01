import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import Form from './Form';
import { useSignupMutation } from '../../services/api_service';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const SIGNUP_TAB = 1;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [signup, result] = useSignupMutation({fixedCacheKey: 'user-auth-signup'});
  const emptyForm = _.every(_.map([email, password], _.isEmpty));
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isError) {
      const errorMessage = emptyForm ? '' : 'Error signing up, please try again.';
      setError(errorMessage);
    } else if (result.isSuccess) {
      navigate('/login');
    }
  }, [result.isLoading, emptyForm, result.isError]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={SIGNUP_TAB} aria-label="login and signup tabs">
          <Tab label="Login" aria-label="go to login" onClick={() => navigate('/login')} />
          <Tab label="Signup" aria-label="signup to continue" />
        </Tabs>
      </Box>
      <Form title="Sign up"
        email={email}
        password={password}
        togglePasswordVisibility={togglePasswordVisibility}
        error={error}
        setEmail={setEmail}
        setPassword={setPassword}
        showPassword={showPassword}
        action={signup}
        data={{user: {email, password}}}
        buttonText="Create Account"
      />
    </Box>
  )
};

export default SignupForm;
