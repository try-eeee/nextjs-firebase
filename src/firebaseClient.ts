import {
  initializeApp as clientInitializeApp,
  FirebaseApp,
} from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { clientConfig } from "./config";

let clientApp: FirebaseApp;
let auth: Auth;

export function getFirebaseAuth() {
  if (!clientApp) {
    clientApp = clientInitializeApp(clientConfig);
  }

  if (!auth) {
    auth = getAuth(clientApp);
  }

  return { clientApp, auth };
}
