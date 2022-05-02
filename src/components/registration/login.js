import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Form from './form';
import { useLoginMutation } from '../../services/api_service';

const LOGIN_TAB = 0;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [login, result] = useLoginMutation({fixedCacheKey: 'user-auth-login'});
  const emptyForm = _.some(_.map([email, password], _.isEmpty));

  const navigate = useNavigate();

  useEffect(() => {
    if (result.isError) {
      const error = _.get(result, 'error.data.error', 'Error logging in, please try again.');
      const errorMessage = emptyForm ? '' : error;
      setError(errorMessage);
      result.reset();
    } else if (result.isSuccess && result.data.token) {
      result.reset();
      navigate('/');
    }
  }, [result, navigate, result.isLoading, emptyForm, result.isError]);

  return (
    <Box id="login" sx={{maxWidth: '1200px', textAlign: 'center'}}>
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
        emptyForm={emptyForm}
      />
    </Box>
  );
};

export default LoginForm;
