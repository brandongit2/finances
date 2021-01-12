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
    const {loading, isLoggedIn, signOut} = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (authenticatedRoute && !isLoggedIn && !loading) {
            history.push('/sign-in');
        }
    });

    if (loading) return <Loading />;
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Finances</h1>
                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            signOut();
                        }}
                    >
                        Sign out
                    </button>
                ) : null}
            </header>
            <div className={`${className} ${styles.contents}`}>{children}</div>
        </div>
    );
}
