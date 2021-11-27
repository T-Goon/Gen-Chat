var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Expo } = require('expo-server-sdk');

const User = require('../schemas/User');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    username: user.username,
  },
    process.env.JWT_SECRET);
}

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
      res.json({ token: generateToken({ id: user._id, username: user.username }) });
    } else {
      res.json({ error: 'Password does not match' });
    }
    return;
  }

  res.json({ error: 'User does not exist' });
});

router.post('/register', async function (req, res, next) {
  const { username, password, confirmPassword } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    res.json({ error: `User with username ${username} already exists` });
    return;
  }

  if (password !== confirmPassword) {
    res.json({ error: 'Passwords do not match' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let newUser = await new User({
    username,
    passwordHash
  });
  newUser = await newUser.save();

  res.json({ token: generateToken({ id: newUser._id, username: newUser.username }) });
});

// Sends a notification to a specified client
router.post('/notif', async (req, res, next) => {
  const json = req.body;
  const somePushTokens = [json.notifToken];
  console.log(json);

  // Create a new Expo SDK client
  // optionally providing an access token if you have enabled push security
  let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

  // Create the messages that you want to send to clients
  let messages = [];
  for (let pushToken of somePushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: 'default',
      body: 'This is a test notification',
      data: { withSome: 'data' },
    })
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();

  // TODO: Check the receipts later

  res.json({ status: 'success' });
});

module.exports = router;
