import {
  initializeApp as clientInitializeApp,
  FirebaseApp,
} from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { clientConfig } from "./config";

let clientApp: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;

export function getFirebaseAuth() {
  if (!clientApp) {
    clientApp = clientInitializeApp(clientConfig);
  }

  if (!auth) {
    auth = getAuth(clientApp);
  }

  if (!storage) {
    storage = getStorage(clientApp);
  }

  return { clientApp, auth, storage };
}
