import { waitFor, act } from '@testing-library/react';

import {authenticatedUser, messages} from '../fixtures';

const newMessage = {
  toNumber: '555-555-5555',
  text: 'A new message for a new topic'
};

describe('Messages', () => {
  mockServers({
    getMessages: {data: messages},
    newMessage: {data: {status: 'pending', ...newMessage}}
  });

  it('displays the user messages list', async () => {
    const {getByText} = mountApp({user: authenticatedUser});
    await waitFor(() => {
      expect(getByText("List of text messages sent, with their statuses")).toBeInTheDocument();
    });

    await waitFor(() => {
      messages.map((message)=> {
        expect(getByText(message.text)).toBeInTheDocument();
      });
    });
  });

  it('sends a enw message', async() => {
    const {getByText} = mountApp({user: authenticatedUser});
    clickLabel('Create Message');

    await waitFor(() => {
      expect(getByText("New Message")).toBeInTheDocument();
    });


    fillIn('Enter the phone number').with(newMessage.toNumber);
    fillIn('Enter your text').with(newMessage.text);

    clickLabel('Send');

    await act(async () => { await Promise.resolve() });
    await waitFor(() => {
      expect(getByText(newMessage.text)).toBeInTheDocument();
    });
  });
});
