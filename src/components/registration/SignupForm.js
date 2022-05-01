import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import _ from 'lodash';

import { useSignupMutation } from '../../services/api_service';
import { onChange, preventDefault } from '../helpers/event';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [signUp, result] = useSignupMutation({fixedCacheKey: 'user-auth'});
  const emptyForm = _.every(_.map([email, password], _.isEmpty));
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isError) {
      const errorMessage = emptyForm ? '' : 'Error logging in, please try again.';
      setError(errorMessage);
    } else if (result.isSuccess) {
      navigate('/login');
    }
  }, [result.isLoading, emptyForm, result.isError]);

  return (
    <form className="signup-form">
      <div>
        <h2>Sign up</h2>
        {!!error && <FormHelperText error={true}>{error}</FormHelperText>}
      </div>

      <TextField
        value={email}
        label="Enter your Email"
        placeholder="Email"
        onChange={onChange(setEmail)}
      />
      <TextField
        value={password}
        type={showPassword ? 'text' : 'password'}
        label="Enter your Password"
        placeholder="Password"
        onChange={onChange(setPassword)}
        InputProps={{endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => togglePasswordVisibility((visibility) => !visibility)}
              edge="end"
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        )}}
      />
      <Box sx={{m: 1, position: 'relative'}}>
        <Button
          variant="contained"
          disabled={result?.status === 'pending'}
          onClick={preventDefault(signUp, {user: {email, password}})}
        >
          Create Account
        </Button>
        {result?.status === 'pending' && (
          <CircularProgress
            size={24}
            sx={{
              color: 'blue',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </form>
  )
};

export default SignupForm;
