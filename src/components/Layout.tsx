import {ReactNode, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import styles from './Layout.module.css';
import Loading from './Loading';
import {UserContext} from '../contexts';

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
    const {loading, isSignedIn, signOut, email} = useContext(UserContext);

    if (loading) return <Loading />;
    if (authenticatedRoute && !isSignedIn && !loading)
        return <Redirect to="/sign-in" />;
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
        </div>
    );
}
