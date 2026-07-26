import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('Prospect Review UI', () => {
  it('loads the sample and supports a human review decision', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getAllByRole('button', { name: 'Load synthetic sample' })[0]);
    expect(screen.getByText('3 accepted, 2 rejected, 1 duplicates.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Avery Chen' })).toBeInTheDocument();
    expect(screen.getByText('Provided evidence')).toBeInTheDocument();
    expect(screen.getByText('Inferred angles')).toBeInTheDocument();
    expect(screen.getByText('Unknowns')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Approve for preparation' }));
    expect(within(screen.getByLabelText('Traceability')).getByText(/approved_for_send_prep/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /send/i })).not.toBeInTheDocument();
  });

  it('requires revision instructions before requesting changes', async () => {
    const user = userEvent.setup(); render(<App />); await user.click(screen.getAllByRole('button', { name: 'Load synthetic sample' })[0]);
    const request = screen.getByRole('button', { name: 'Request changes' }); expect(request).toBeDisabled();
    await user.type(screen.getByLabelText('Revision request'), 'Make the opening more direct.');
    expect(request).toBeEnabled(); await user.click(request);
    expect(screen.getByText('changes requested')).toBeInTheDocument();
  });
});
