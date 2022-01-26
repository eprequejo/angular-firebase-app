import { Component } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase, ref, set } from "firebase/database";
import { Auth, getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase-app';
  user = { name: "", age: "" };

  // app: FirebaseApp;
  database: Database;
  auth: Auth;

  constructor() {
    const firebaseConfig = {
        apiKey: "AIzaSyBCmMuTHrNJLGXgoR2wy3_kBkUvB2J7n-8",
        authDomain: "angular-firebase-app-affce.firebaseapp.com",
        databaseURL: "https://angular-firebase-app-affce-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "angular-firebase-app-affce",
        storageBucket: "angular-firebase-app-affce.appspot.com",
        messagingSenderId: "185900307509",
        appId: "1:185900307509:web:6d7e9b29981bd487f48d7c",
        measurementId: "G-9Z1TFY8DYR"
      };
    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);
    this.auth = getAuth(app);
  }

  submit() {
    signInAnonymously(this.auth).then(() => {
      onAuthStateChanged(this.auth, (u) => {
        if (u) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = u.uid;
          set(ref(this.database, "users/" + uid), {
            name: this.user.name,
            age: this.user.age,
            created: new Date().toISOString().split("T")[0]
          });
        } else {
          throw new Error("User is not signed in")
        }
      });
    }).catch((error) => {
      throw new Error(`${error.code}: ${error.message}`)
    });

  }
}
