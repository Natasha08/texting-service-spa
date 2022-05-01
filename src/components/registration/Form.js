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

import { onChange, preventDefault } from '../helpers/event';

export default function Form(props) {
  const {
    error, email, setEmail, password, setPassword, showPassword,
    action, data, title, buttonText, result, togglePasswordVisibility
  } = props ?? {};

  return <form className="registration-form">
    <div>
      <h4>{title}</h4>
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
        role="button"
        name={buttonText}
        variant="contained"
        disabled={result?.status === 'pending'}
        onClick={preventDefault(action, data)}
      >
        {buttonText}
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
}
