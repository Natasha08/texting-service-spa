import { waitFor, act } from '@testing-library/react';

import {email, user, authenticatedUser, messages} from '../fixtures';

describe('Signup', () => {
  mockServers({login: {data: authenticatedUser}, signup: {data: {email}}, getMessages: {data: messages}});

  it('signups and logs in the user', async () => {
    const {container, getByText} = mountApp();
    clickLabel('Signup');

    expect(container).toHaveTextContent("Sign up");

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);

    clickOn('Create Account');

    await waitFor(() => {
      expect(getByText("Please login to continue")).toBeInTheDocument();
    });

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);

    clickOn('Login');

    await waitFor(() => {
      expect(getByText(messages[0].text)).toBeInTheDocument();
    });
  });
});
