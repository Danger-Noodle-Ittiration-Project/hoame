import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, cleanup } from '@testing-library/react';

import Dues from '../client/components/Dues';
import VotingBoard from '../client/components/VotingBoard';
import VotingCard from '../client/components/VotingCard';
import RoleReassigner from '../client/components/RoleReassigner';

describe('Dues component', () => {
  test('renders the message that dues are unpaid', () => {
    render(<Dues />);
    expect(screen.getByText('Payment Due: $100')).toBeInTheDocument();
  })
});

describe('Voting component', () => {
  test('renders a voting card', () => {
    render(<VotingCard voted={1} id={1} title={'Test vote'} description={'Testing'} yesVotes={0} noVotes={0} totalVotes={0} />);
    expect(screen.getByText('Test vote')).toBeInTheDocument();
  })
})

describe('Role assignment component', () => {
  test('renders', () => {
    render(<RoleReassigner />);
    expect(screen.getByText('Role Reassignment for Pending Approval Users')).toBeInTheDocument();
  })
})