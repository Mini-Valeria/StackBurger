const admin = require('firebase-admin');

if (!admin.apps.length) {

  let serviceAccount;

  if (process.env.FIREBASE_PRIVATE_KEY) {
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    };
  } else {
    serviceAccount = require('./stackburger-a3c81-firebase-adminsdk-fbsvc-454a341e0c.json');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("🔥 Firebase initialized correctly");
}

const db = admin.firestore();

module.exports = db;