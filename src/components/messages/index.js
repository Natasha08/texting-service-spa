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
import { useGetMessagesMutation } from '../../services/api_service';
import { messageUpdated } from '../../reducers/messages';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MESSAGES_TAB = 0;

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
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  // const [error, setError] = React.useState({});

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
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      console.log("WTF DUDE")
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open, channel]);

  useEffect(() => {
    if (!channel) {
      const cable = actionCable.createConsumer(process.env.REACT_APP_WEB_SOCKET_HOST, token);
      const channel = cable.subscriptions.create({channel: "ChatChannel"});

      if (channel) {
        channel.received = (data={}) => {
          const statusPresent = !_.isEmpty(data?.message?.status);
          const errorPresent = !_.isEmpty(data?.error?.message);
          const failedDelivery = !_.includes(['delivered', 'pending'], data?.message?.status);

          if (!_.isEmpty(data.message)) {
            dispatch(messageUpdated(data.message));
          }

          let message = '';

          if (errorPresent) {
            message =  data.error.message;
          } else if (statusPresent && failedDelivery) {
            message = "Failed to deliver Text Message";
          } else if (data?.message?.status === "delivered") {
            message = "Message delivered!";
          }

          if (!_.isEmpty(message)) {
            setSnackPack((prev) => [...prev, {message, key: new Date().getTime()}]);
          }
        };
      }
      setChannel(channel);
    }
  }, [channel, token, dispatch]);

  const orderedMessages = _.orderBy(messages, 'created_at', 'desc');

  const closeBar = (event, reason) => {
    reason !== 'clickaway' && setOpen(false);
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
        {orderedMessages.length ? orderedMessages.map((message) => (
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
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={closeBar}
        TransitionProps={{onExited: () => setMessageInfo(undefined)}}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={closeBar}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={closeBar}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default Messages;
