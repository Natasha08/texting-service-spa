import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import _ from 'lodash';

import { useLoginMutation } from '../../services/api_service';
import { onChange, preventDefault } from '../helpers/event';
import FormHelperText from '@mui/material/FormHelperText';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, togglePasswordVisibility] = useState(false);
  const [login, result] = useLoginMutation({fixedCacheKey: 'user-auth'});
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
    <form className="signup-form">
      <div>
        <h2>Please Login to continue</h2>
        {!!error && <FormHelperText error={true}>{error}</FormHelperText>}
      </div>
    <button>
      <Link to="/signup">Sign up</Link>
    </button>

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
          onClick={preventDefault(login, {email, password})}
        >
          Login
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

export default LoginForm;
