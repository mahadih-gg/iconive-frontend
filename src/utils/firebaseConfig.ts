import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk6laTPUIGt9-8zNj20A-0ottNCmkFiuY",
  authDomain: "iconive-wigs.firebaseapp.com",
  projectId: "iconive-wigs",
  storageBucket: "iconive-wigs.appspot.com",
  messagingSenderId: "196267064595",
  appId: "1:196267064595:web:f7e8139d9ac4425a61aee6",
  measurementId: "G-GSYR5S1PW6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
