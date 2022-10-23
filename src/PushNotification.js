const admin = require('firebase-admin');

const serviceAccount = require('./phamvanquy-a286a-firebase-adminsdk-gkj3s-9b69755401.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://phamvanquy-a286a-default-rtdb.firebaseio.com',
});
