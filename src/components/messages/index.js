import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useGetMessagesMutation } from '../../services/api_service';

const MESSAGES_TAB = 0;

const SetChip = ({label, color, status}) => {
  const chipColor = label === status ? {color} : {};
  const isDisabled = status !== label ? {disabled: true} : {};
  return <Chip {...chipColor} label={label} {...isDisabled} />;
};

const Messages = () => {
  const [fetched, setFetched] = useState(false);
  const messages = useSelector(({messages=[]}) => messages);

  const [getMessages, result] = useGetMessagesMutation({fixedCacheKey: 'messages'});
  const navigate = useNavigate();

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (result.isError) {
      console.warn("Error fetching messages", result);
      setFetched(true);
    } else if (result.isSuccess) {
      setFetched(true);
    }
  }, [result.isLoading, result.isError]);

  return (
    <Box id="messages" sx={{maxWidth: '1200px', textAlign: 'left'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={MESSAGES_TAB} aria-label="login and signup tabs">
          <Tab label="Messages" aria-label="list of text messages" />
          <Tab label="Create Message" aria-label="create new message" onClick={() => navigate('/messages/new')} />
        </Tabs>
      </Box>
      {!fetched ? (
        <div>Getting Messages...</div>
      ) : (
        <Box style={{'marginTop': '20px'}}>
          <Typography gutterBottom variant="subtitle2" component="em">
            List of text messages sent, with their statuses
          </Typography>

          {messages.length ? messages.map((message) => (
            <div key={message.sms_message_id}>
              <Box sx={{my: 3, mx: 2}}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom component="div">
                      Phone Number: {message.to_number}
                    </Typography>
                  </Grid>
                </Grid>
              <Typography gutterBottom component="div">
                Message:
              </Typography>
                <Typography color="text.secondary" variant="body2">
                  {message.text}
                </Typography>
              </Box>
              <Box sx={{ m: 2 }}>
                <Typography gutterBottom>
                  Status:
                </Typography>
                <Box direction="row" spacing={1}>
                  <SetChip color="primary" label="pending" status={message.status} />
                  <SetChip color="success" label="delivered" status={message.status} />
                  <SetChip color="warning" label="invalid" status={message.status} />
                  <SetChip color="error" label="failed" status={message.status} />
                </Box>
              </Box>
              <Divider variant="middle" />
            </div>
          )) : (
            <div>There are no messages yet.</div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Messages;
