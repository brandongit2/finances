import firebase from 'firebase/app';
import {createContext} from 'react';

export default createContext({
    firestore: (null as unknown) as firebase.firestore.Firestore
});
