import React from 'react';
import Todotable from './components/Todolist';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('renders todotable', () => {
  const row = [{ description: 'Go to coffee', date: '3.12.2020'}]

  const todotable = render(<Todotable todos={row} />);
  expect(todotable.container).toHaveTextContent('Go to coffee');
});

test('add todo', () => {
  const { container, getByText, getByLabelText } = render(<App />);
  
  const desc = getByLabelText('Description:');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });

  const date = getByLabelText('Date:');
  fireEvent.change(date, { target: { value: '3.12.2020' } });

  const button = getByText('Add');
  fireEvent.click(button);

  expect(container).toHaveTextContent('Go to coffee');
})