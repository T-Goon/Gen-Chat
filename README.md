# Gen-Chat

A React Native app that hosts a chatroom where all users can communicate in real time.

![image](https://user-images.githubusercontent.com/32044950/141661913-57c4410b-9887-4d71-bad4-7d31bbcb08b8.png)
![image](https://user-images.githubusercontent.com/32044950/141661862-98c559cd-825e-41d6-8c75-e20d261ce929.png)
![image](https://user-images.githubusercontent.com/32044950/141661867-cb5165f7-6768-42e3-860a-99070a59885d.png)

## Running

### Tools needed
- expo-cli
- Android Studio
- Nodejs and npm

### Starting the Backend
In the `server` directory install dependencies with `npm install`, then run: `npm start`.

### Starting the Frontend on Android
Open an AVD from Android Studio and then run `adb reverse tcp:3000 tcp:3000`.

In the main Gen-Chat directory install dependencies with `expo install`. Now press the 'a' key or click the button on the expo web ui.
