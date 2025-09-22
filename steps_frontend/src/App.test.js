import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Step Tracker header', () => {
  render(<App />);
  const hdr = screen.getByText(/Step Tracker/i);
  expect(hdr).toBeInTheDocument();
});
