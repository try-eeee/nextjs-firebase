import { serverConfig } from "./config";
import {
  initializeApp as adminInitializeApp,
  cert,
  getApps,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const adminApp =
  getApps().length === 0
    ? adminInitializeApp({
        credential: cert(serverConfig.serviceAccount),
      })
    : getApps()[0];

const db = getFirestore(adminApp);
const auth = getAuth(adminApp);

export { db, auth };
