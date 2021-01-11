import firebase from 'firebase/app';
import 'firebase/firestore';
import {Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import Loading from './components/Loading';
import FirebaseContext from './contexts/firebase';
import Home from './pages/Home';

const firebaseConfig = {
    apiKey: 'AIzaSyDx7EgsxgP8VKjW928yHC104PvB0HxVnGY',
    authDomain: 'finances-ef0a0.firebaseapp.com',
    projectId: 'finances-ef0a0',
    storageBucket: 'finances-ef0a0.appspot.com',
    messagingSenderId: '150511282825',
    appId: '1:150511282825:web:9b85dfd39ac32b01807458',
    measurementId: 'G-9ZDJ3FFGZ5'
};

firebase.initializeApp(firebaseConfig);

export default function App() {
    return (
        <FirebaseContext.Provider value={{firestore: firebase.firestore()}}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Suspense fallback={Loading}>
                            <Home />
                        </Suspense>
                    </Route>
                </Switch>
            </Router>
        </FirebaseContext.Provider>
    );
}
