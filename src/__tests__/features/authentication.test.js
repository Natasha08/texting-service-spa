import { waitFor, act } from '@testing-library/react';
import { at } from 'lodash';

const email = 'test@example.com';
const user = {
  email,
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};

describe('Signup', () => {
  mockServers({login: {data: authenticatedUser}, signup: {data: {email}}});

  it('signups and logs in the user', async () => {
    const {container} = mountApp();
    clickLabel('Signup');
    expect(container).toHaveTextContent("Sign up");

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);

    act(() => {
      clickOn('Create Account');
    });

    await waitFor(() => {
      expect(container).toHaveTextContent("Please login to continue");
    });

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);

    act(() => {
      clickOn('Login');
    });

    await waitFor(() => {
      expect(container).toHaveTextContent("Send Text Messages");
    });
  });
});
