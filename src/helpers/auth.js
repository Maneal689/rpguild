import { auth } from "../services/firebase";

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function signinWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  auth().signInWithRedirect(provider);
}

export function logout() {
  return auth().signOut();
}
