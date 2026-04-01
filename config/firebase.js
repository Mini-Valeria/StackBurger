const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("🔥 Firebase conectado correctamente");

const db = admin.firestore();

module.exports = db;