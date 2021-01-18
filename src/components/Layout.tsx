import {ReactNode} from 'react';
import {Redirect} from 'react-router-dom';

import {Footer} from './';
import styles from './Layout.module.css';
import {useSignOut} from '../hooks';
import store from '../redux/store';

interface PropTypes {
    children: ReactNode;
    className?: string;
    authenticatedRoute?: boolean;
}

export default function Layout({
    children,
    className = '',
    authenticatedRoute = false
}: PropTypes) {
    const {isSignedIn, email} = store.getState().userInfo;

    const signOut = useSignOut();

    if (authenticatedRoute && !isSignedIn) return <Redirect to="/sign-in" />;
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Finances</h1>
                {isSignedIn ? (
                    <div className={styles.rightSide}>
                        <span>
                            Logged in as <b>{email}</b>.
                        </span>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sign out
                        </button>
                    </div>
                ) : null}
            </header>
            <div className={`${className} ${styles.contents}`}>{children}</div>
            <Footer />
        </div>
    );
}
