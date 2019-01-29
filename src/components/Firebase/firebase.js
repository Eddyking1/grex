import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCbGkbjQBKLQuWSKe_qEDHuAOumo60Tkag",
  authDomain: "grex-6f160.firebaseapp.com",
  databaseURL: "https://grex-6f160.firebaseio.com",
  projectId: "grex-6f160",
  storageBucket: "grex-6f160.appspot.com",
  messagingSenderId: "716371013269"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;