import React from 'react';
// import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react-native';

import SettingsScreen from '../../src/screens/SettingsScreen';

describe('<SettingsScreen/>', () => {
    it('has i child', async () => {
        const tree = render(<SettingsScreen />).toJSON();

        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', async () => {
        const tree = render(<SettingsScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});