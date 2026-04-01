const admin = require('firebase-admin');

let serviceAccount;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT && process.env.FIREBASE_SERVICE_ACCOUNT !== "undefined") {
    console.log("🔥 Usando credenciales de Render");
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    console.log("🟢 Usando credenciales locales");
    serviceAccount = require('./stackburger-a3c81-firebase-adminsdk-fbsvc-efdfefd50c.json');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

} catch (error) {
  console.error("🔥 ERROR FIREBASE CONFIG:", error);
}

const db = admin.firestore();

module.exports = db;