import {ReactNode, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

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
    const history = useHistory();
    useEffect(() => {
        if (authenticatedRoute && !isSignedIn && !loading) {
            history.push('/sign-in');
        }
    });

    if (loading) return <Loading />;
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Finances</h1>
                <div className={styles.rightSide}>
                    <span>
                        Logged in as <b>{email}</b>.
                    </span>
                    {isSignedIn ? (
                        <button
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sign out
                        </button>
                    ) : null}
                </div>
            </header>
            <div className={`${className} ${styles.contents}`}>{children}</div>
        </div>
    );
}
