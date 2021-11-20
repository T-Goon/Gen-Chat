import React from 'react';
import { render } from '@testing-library/react-native';

import FeedItem from '../../src/components/FeedItem';

describe('<FeedItem/ >', () => {
    it('Num Children', () => {
        const feedItem = render(<FeedItem />);
        const json = feedItem.toJSON();

        expect(json.children.length).toBe(2);
    });

    it('Text Props Rendered', () => {
        const { getByText } = render(<FeedItem username='Username' message='Hellow!!' />);
        const username = getByText('Username:');
        const message = getByText('Hellow!!');

        expect(username).not.toBeNull();
        expect(message).not.toBeNull();
    });

    it('Snapshot', () => {
        const feedItemJson = render(<FeedItem username='Username' message='Hellow!!' />).toJSON();

        expect(feedItemJson).toMatchSnapshot();
    });
})