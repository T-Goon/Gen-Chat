import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import FormInput from '../../src/components/FormInput';

describe('<FormInput/ >', () => {
    it('Num Children', () => {
        const formInput = render(<FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
            label='Password:' placeholder='password' type='numeric' secureTextEntry={true} multiline={true} />);
        const json = formInput.toJSON();

        expect(json.children.length).toBe(2);
    });

    it('OnChange Prop', () => {
        const onChange = jest.fn();
        const { getByPlaceholderText } = render(<FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
            label='Password:' placeholder='password' secureTextEntry={false} onChangeText={onChange} multiline={false} />);

        fireEvent(getByPlaceholderText('password'), 'changeText', 'test');
        expect(onChange).toHaveBeenCalledWith('test');
    });

    it('Snapshot', () => {
        const formInputJson = render(<FormInput containerStyles={{ paddingHorizontal: 15, marginVertical: 5, marginBottom: 20 }}
            label='Password:' placeholder='password' secureTextEntry={true} multiline={false} />).toJSON();

        expect(formInputJson).toMatchSnapshot();
    });
})