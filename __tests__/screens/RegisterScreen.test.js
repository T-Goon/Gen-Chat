import React from 'react';
import { render } from '@testing-library/react-native';

import RegisterScreen from '../../src/screens/RegisterScreen';

describe('<RegisterScreen/>', () => {
    it('has i child', async () => {
        const tree = render(<RegisterScreen />).toJSON();

        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', async () => {
        const tree = render(<RegisterScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});