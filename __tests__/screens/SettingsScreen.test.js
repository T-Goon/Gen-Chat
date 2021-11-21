import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as SecureStore from 'expo-secure-store';

import SettingsScreen from '../../src/screens/SettingsScreen';
jest.mock('expo-secure-store');

describe('<SettingsScreen/>', () => {
    it('has i child', async () => {
        const tree = render(<SettingsScreen />).toJSON();

        expect(tree.children.length).toBe(1);
    });

    it('renders correctly', async () => {
        const tree = render(<SettingsScreen />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Logs out', async () => {
        const navivation = { reset: jest.fn()};
        const settingScreen = render(<SettingsScreen navigation={navivation} />);

        await fireEvent(settingScreen.getByText('Logout'), 'press');

        expect(navivation.reset).toHaveBeenCalledWith({ index: 1, routes: [{ name: 'Login' }] });
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('token');
    });
});