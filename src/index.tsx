import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';
import {FirebaseAppProvider} from 'reactfire';

import App from './App';

const firebaseConfig = {
    apiKey: 'AIzaSyDx7EgsxgP8VKjW928yHC104PvB0HxVnGY',
    authDomain: 'finances-ef0a0.firebaseapp.com',
    projectId: 'finances-ef0a0',
    storageBucket: 'finances-ef0a0.appspot.com',
    messagingSenderId: '150511282825',
    appId: '1:150511282825:web:9b85dfd39ac32b01807458',
    measurementId: 'G-9ZDJ3FFGZ5'
};

ReactDOM.render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
