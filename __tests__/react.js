import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import Dues from '../client/components/Dues';

describe('Dues component', () => {
  test('renders the message that dues are unpaid', () => {
    render(<Dues />);
    expect(screen.getByText('Payment Due: $100')).toBeInTheDocument();
  })
});