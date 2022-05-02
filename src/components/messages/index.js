import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import actionCable from 'action-cable-react-jwt';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useGetMessagesMutation } from '../../services/api_service';
import { messageUpdated } from '../../reducers/messages';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const MESSAGES_TAB = 0;
const RETRYING_ERROR = 'Failed to send text message after several attempts, retrying with a new SMS provider';

const SetChip = ({label, color, status}) => {
  const chipColor = label === status ? {color} : {};
  const isDisabled = status !== label ? {disabled: true} : {};
  return <Chip {...chipColor} label={label} {...isDisabled} />;
};

const Messages = () => {
  const [fetched, setFetched] = useState(false);
  const messages = useSelector(({messages=[]}) => messages);
  const token = useSelector(({user}) => user?.token);
  const [channel, setChannel] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState({});

  const dispatch = useDispatch();


  const [getMessages, result] = useGetMessagesMutation({fixedCacheKey: 'messages'});
  const navigate = useNavigate();

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    if (result.isError && !fetched) {
      console.warn("Error fetching messages", result);
      setFetched(true);
      result.reset();
    } else if (result.isSuccess) {
      setFetched(true);
      result.reset();
    }
  }, [fetched, result, result.isLoading, result.isError]);

  useEffect(() => {
    if (!channel) {
      const cable = actionCable.createConsumer(`ws://localhost:3000/cable`, token);
      const channel = cable.subscriptions.create({channel: "ChatChannel"});
      channel.received = (data={}) => {
        if (data.error) {
          if (data.error === RETRYING_ERROR) {
            setAlert({message: data.error.message, severity: 'warning'});
            setOpen(true);
          } else {
            setAlert({message: data.error.message, severity: 'error'});
            setOpen(true);
          }
          if (!_.isEmpty(data.message)) {
            dispatch(messageUpdated(data.message));
          }
        } else {
          setAlert({message: "message delivered!", severity: 'success'});
          setOpen(true);
          if (!_.isEmpty(data.message)) {
            console.log("IM WINNING", data)

            dispatch(messageUpdated(data.message));
          }
        }
      };
      setChannel(channel);
    }
  }, [channel, token, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box id="messages" sx={{maxWidth: '1200px', textAlign: 'left'}}>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={MESSAGES_TAB} aria-label="login and signup tabs">
          <Tab label="Messages" aria-label="list of text messages" />
          <Tab label="Create Message" aria-label="create new message" onClick={() => navigate('/messages/new')} />
        </Tabs>
      </Box>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={() => setOpen(false)} severity={alert.severity} sx={{width: '100%'}}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages;
