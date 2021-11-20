import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import ButtonPrim from '../../src/components/ButtonPrim';

describe('<ButtonPrim/ >', () => {
    it('Num Children', () => {
        const buttonPrim = render(<ButtonPrim />);
        const json = buttonPrim.toJSON();

        expect(json.children.length).toBe(1);
    });

    it('OnPress Prop', () => {
        const onPress = jest.fn();
        const buttonPrim = render(<ButtonPrim onPress={onPress} />);

        fireEvent(buttonPrim.container, 'press');
        expect(onPress.mock.calls.length).toBe(1);
    });

    it('Snapshot', () => {
        const buttonPrimJson = render(<ButtonPrim />).toJSON();
        
        expect(buttonPrimJson).toMatchSnapshot();
    });
})