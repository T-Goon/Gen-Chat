import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import LoginRegHere from '../../src/components/LoginRegHere';

describe('<FormInput/ >', () => {
    it('Num Children', () => {
        const replace = jest.fn();
        const loginRegHere = render(<LoginRegHere navigation={{ replace }}
            msg={'Don\'t have an account? Register '} location='Register' />);
        const json = loginRegHere.toJSON();

        expect(json.children.length).toBe(2);
    });

    it('OnPress Prop', () => {
        const replace = jest.fn();
        const { getByText } = render(<LoginRegHere navigation={{ replace }}
            msg={'Don\'t have an account? Login '} location='Login' />);

        fireEvent(getByText('here'), 'press');
        expect(replace).toHaveBeenCalledWith('Login');
    });

    it('Snapshot', () => {
        const replace = jest.fn();
        const loginRegHereJson = render(<LoginRegHere navigation={{ replace }}
            msg={'Don\'t have an account? Too bad. Just click '} location='some place else' />).toJSON();

        expect(loginRegHereJson).toMatchSnapshot();
    });
})