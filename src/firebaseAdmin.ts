import { serverConfig } from "./config";
import {
  initializeApp as adminInitializeApp,
  cert,
  getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const adminApp =
  getApps().length === 0
    ? adminInitializeApp({
        credential: cert(serverConfig.serviceAccount),
      })
    : getApps()[0];
const db = getFirestore(adminApp);

export { db };
