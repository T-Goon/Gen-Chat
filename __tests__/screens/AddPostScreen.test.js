import React from 'react';
import { render } from '@testing-library/react-native';

import AddPostScreen from '../../src/screens/AddPostScreen';

describe('<AddPostScreen/>', () => {
    beforeEach(async () => {
        global.WebSocket = WebSocket;
    });

    it('has i child', async () => {
        const tree = render(<AddPostScreen />).toJSON();
        // console.log(tree.children[0].children[0].children[1]);
        expect(tree.children.length).toBe(2);
    });

    // it('can send message', async () => {

    //     const { findByText, findByPlaceholderText } = render(
    //         <ContextProvider>
    //             <AddPostScreen />
    //         </ContextProvider>);



    //     SecureStore.getItemAsync.mockResolvedValue("token");

    //     await server.connected;
    //     console.log(await server.connected);



    //     fireEvent(await findByPlaceholderText('message'), 'onChangeText', 'hello');


    //     fireEvent(await findByText('Post'), 'onPress');

    //     console.log(server);

    //     // client.send('hello');

    //     // console.log(tree);
    //     // let tree;
    //     // act(() => {
    //     //     tree = renderer.create(
    //     //         <ContextProvider>
    //     //             <AddPostScreen />
    //     //         </ContextProvider>).toJSON();
    //     //     console.log(tree);
    //     //     console.log(tree.children[0].children[0].children[1]);
    //     //     tree.children[0].children[0].children[1].props.onChangeText('hello');
    //     // tree.children[1].props.onClick();


    //     // const screen = shallow(
    //     //     <ContextProvider>
    //     //         <AddPostScreen />
    //     //     </ContextProvider>);
    //     // console.log(screen.find("*"));
    //     // screen.find(ButtonPrim).simulate('click');
    //     // screen.find(ButtonPrim).simulate('textChange', 'hello');

    //     // });

    //     await expect(server).toReceiveMessage("hello");
    //     expect(server).toHaveReceivedMessages(["hello"]);
    // });

    it('renders correctly', async () => {
        const tree = render(<AddPostScreen />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });


});