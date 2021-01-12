import firebase from 'firebase/app';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
import {
    FirebaseContext,
    UserContext,
    userContextDefaultValue
} from './contexts';
import {Home, SignIn} from './pages';

interface PropTypes {
    firebase: typeof firebase;
}

export default function App({firebase}: PropTypes) {
    const {auth, firestore} = firebase;

    const [user, setUser] = useState(userContextDefaultValue);

    useEffect(() => {
        function signOut() {
            auth().signOut();
            setUser((state) => ({...state, isSignedIn: false, email: null}));
        }

        const unsubscribe = auth().onAuthStateChanged((user) => {
            user &&
                setUser({
                    signOut,
                    loading: false,
                    isSignedIn: true,
                    email: user.email
                });
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    return (
        <FirebaseContext.Provider value={{auth, firebase, firestore}}>
            <UserContext.Provider value={user}>
                <Router>
                    <Switch>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </UserContext.Provider>
        </FirebaseContext.Provider>
    );
}
