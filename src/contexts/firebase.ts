import firebase from 'firebase/app';
import {createContext} from 'react';

export const firebaseContextDefaultValue = {
    auth: (null as unknown) as typeof firebase.auth,
    firebase: (null as unknown) as typeof firebase,
    firestore: (null as unknown) as typeof firebase.firestore
};

export const FirebaseContext = createContext(firebaseContextDefaultValue);
