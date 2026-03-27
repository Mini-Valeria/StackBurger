const admin = require('firebase-admin');

const serviceAccount = require('./stackburger-a3c81-firebase-adminsdk-fbsvc-107b7d1981.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;