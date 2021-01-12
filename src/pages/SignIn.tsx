import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import styles from './SignIn.module.css';
import Layout from '../components/Layout';
import {FirebaseContext, UserContext} from '../contexts';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {auth} = useContext(FirebaseContext);
    async function signIn(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        try {
            await auth().setPersistence(auth.Auth.Persistence.LOCAL);
            auth().signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.error(err);
        }
    }

    const history = useHistory();
    const {isSignedIn} = useContext(UserContext);
    useEffect(() => {
        if (isSignedIn) history.push('/');
    }, [history, isSignedIn]);

    return (
        <Layout className={styles.container}>
            <form className={styles.form} onSubmit={signIn}>
                <label>Email:</label>
                <input
                    type="text"
                    autoComplete="email"
                    value={email}
                    onChange={(evt) => {
                        setEmail(evt.target.value);
                    }}
                />

                <label>Password:</label>
                <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(evt) => {
                        setPassword(evt.target.value);
                    }}
                />
                <button type="button" style={{gridColumn: '1 / 3'}}>
                    Sign in
                </button>
            </form>
        </Layout>
    );
}
