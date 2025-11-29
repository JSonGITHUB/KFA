import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app launcher title', () => {
  render(<App />);
  const titleElement = screen.getByText(/App Launcher/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search apps/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders header with logo', () => {
  render(<App />);
  const logoText = screen.getByText(/KFA/i);
  expect(logoText).toBeInTheDocument();
});
