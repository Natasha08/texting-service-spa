import { waitFor } from '@testing-library/react';

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
    clickOn('Sign up');
    expect(container).toHaveTextContent("Sign up");


    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);
    clickOn('Create Account');

    await waitFor(() => {
      expect(container).toHaveTextContent("Login");
    });

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);
    clickOn('Login');

    await waitFor(() => {
      expect(container).toHaveTextContent("Send Text Messages");
    });
  });
});
