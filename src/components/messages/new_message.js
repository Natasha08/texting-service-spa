import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { onChange, preventDefault } from '../helpers/event';
import { useCreateMessageMutation } from '../../services/api_service';

const NEW_MESSAGE_TAB = 1;

const Messages = () => {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(null);
  const [createMessage, result] = useCreateMessageMutation({fixedCacheKey: 'new-message'});
  const navigate = useNavigate();
  const emptyForm = _.some(_.map([text, number], _.isEmpty));

  const sendMessage=(data) => {
    createMessage(data);
  };

  useEffect(() => {
    if (result.isError) {
      const error = _.get(result, 'error.data.error', 'Error creating message, please try again.');
      const errorMessage = emptyForm ? '' : error;
      setError(errorMessage);
    } else if (result.isSuccess) {
      navigate('/messages');
    }
  }, [result.isLoading, emptyForm, result.isError]);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={NEW_MESSAGE_TAB} aria-label="login and signup tabs">
          <Tab label="Messages" aria-label="list of text messages" onClick={() => navigate('/messages')} />
          <Tab label="Create Message" aria-label="create new message" />
        </Tabs>
      </Box>
      <form className="new-message-form">
        <div className='title'>New Message</div>
        {!!error && (
          <Typography gutterBottom variant="subtitle2" component="em">
            <FormHelperText error={true}>{error}</FormHelperText>
          </Typography>
        )}

        <TextField
          id="phone-number"
          fullWidth
          value={number}
          label="Enter the phone number"
          placeholder="555-555-5555"
          onChange={onChange(setNumber)}
        />
        <TextField
          id="message"
          fullWidth
          value={text}
          label="Enter your text"
          placeholder="your mesage"
          multiline
          maxRows={4}
          onChange={onChange(setText)}
        />
        <Box sx={{m: 1, position: 'relative'}}>
          <Button
            role="button"
            name="Send"
            variant="contained"
            disabled={result?.status === 'pending' || emptyForm}
            onClick={preventDefault(sendMessage, {to_number: number, text})}
          >
            Send
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
    </Box>
  );
};

export default Messages;
