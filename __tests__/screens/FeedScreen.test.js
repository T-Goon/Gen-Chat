import React from 'react';
import { render } from '@testing-library/react-native';

import FeedScreen from '../../src/screens/FeedScreen';

describe('<FeedScreen />', () => {
    
    it('has i child', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree.children.length).toBe(3);
    });

    it('renders correctly', async () => {
        const tree = render(<FeedScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});