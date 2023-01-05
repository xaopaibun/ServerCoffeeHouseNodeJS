const admin = require('firebase-admin');

const serviceAccount = require('./phamvanquy-a286a-firebase-adminsdk-gkj3s-9b69755401.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://phamvanquy-a286a-default-rtdb.firebaseio.com',
});
const message = {
  data: {
    // Custom data payload
    data: 'hello world',
  },
  token: 'device-token',
};

admin
  .messaging()
  .sendToDevice(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
