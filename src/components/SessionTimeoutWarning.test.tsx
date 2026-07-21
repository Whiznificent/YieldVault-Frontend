import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SessionTimeoutWarning from './SessionTimeoutWarning';

describe('SessionTimeoutWarning', () => {
  it('explains the expiry and lets the user renew the session', () => {
    const onContinue = vi.fn();
    render(<SessionTimeoutWarning open={true} onContinue={onContinue} />);

    expect(screen.getByRole('dialog', { name: 'Session expiring' })).toBeInTheDocument();
    expect(screen.getByText(/will end in one minute/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Stay signed in' }));
    expect(onContinue).toHaveBeenCalledOnce();
  });
});
