import React from 'react';
import { render } from '@testing-library/react-native';

import AddPostScreen from '../../src/screens/AddPostScreen';

describe('<AddPostScreen/>', () => {
    it('has i child', async () => {
        const tree = render(<AddPostScreen />).toJSON();
        expect(tree.children.length).toBe(2);
    });

    it('renders correctly', async () => {
        const tree = render(<AddPostScreen />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

});