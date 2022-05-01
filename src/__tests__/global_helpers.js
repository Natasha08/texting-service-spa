import { screen, fireEvent } from '@testing-library/react';

export const fillIn = (labelText) => ({
  with: (value) => {
    const input = screen.getByLabelText(labelText);
    fireEvent.change(input, {target: {value}});
  }
});

export const clickOn = (buttonText) => {
  fireEvent(
    screen.getByRole('button', {
      name: buttonText
    }),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
};

export const clickLabel = (labelText) => {
  fireEvent(
    screen.getByText(labelText),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
};
