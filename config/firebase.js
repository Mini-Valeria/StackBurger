const admin = require('firebase-admin');

const serviceAccount = require('./stackburger-a3c81-firebase-adminsdk-fbsvc-454a341e0c.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = db;