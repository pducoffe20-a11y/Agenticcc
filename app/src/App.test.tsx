import {cleanup,render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach,expect,test} from 'vitest';
import {App} from './App';
afterEach(cleanup);

test('renders all registry-backed agents and honest export actions',async()=>{const user=userEvent.setup();render(<App/>);expect(screen.getByRole('heading',{name:'Choose the next useful workflow.'})).toBeInTheDocument();expect(screen.getAllByRole('button',{name:/Prepare launch/})).toHaveLength(11);await user.click(screen.getAllByRole('button',{name:/Prepare launch/})[0]);expect(screen.getByRole('dialog')).toHaveTextContent('Runtime not configured');expect(screen.queryByRole('button',{name:/Run agent/i})).not.toBeInTheDocument();expect(screen.getByRole('button',{name:'Download payload'})).toBeDisabled()});
test('opens the skill library with every active skill',async()=>{const user=userEvent.setup();render(<App/>);await user.click(screen.getByRole('button',{name:/Skill Library/}));expect(screen.getByText('20 active skills')).toBeInTheDocument();expect(screen.getAllByRole('row')).toHaveLength(21)});
test('parses pasted text and requires confirmed mapping',async()=>{const user=userEvent.setup();render(<App/>);await user.click(screen.getByRole('button',{name:/Import Expert/}));await user.type(screen.getByLabelText('Paste structured text'),'full_name: Avery Chen{enter}organization: Northstar Skills Cooperative');await user.click(screen.getByRole('button',{name:'Parse pasted text'}));expect(screen.getByRole('heading',{name:'Confirm profile and field mapping'})).toBeInTheDocument();await user.click(screen.getByRole('button',{name:/Confirm mapping/}));expect(screen.getByRole('heading',{name:'Quality review'})).toBeInTheDocument()});
