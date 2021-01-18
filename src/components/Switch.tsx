import {ReactNode, useReducer} from 'react';

import styles from './Switch.module.css';

interface PropTypes {
    leftLabel: ReactNode | string;
    rightLabel: ReactNode | string;
    onUpdate: (newState: 'left' | 'right') => void;
}

export default function Switch({leftLabel, rightLabel, onUpdate}: PropTypes) {
    const [switched, toggleSwitched] = useReducer((state) => !state, false);

    return (
        <div className={styles.container}>
            <span>{leftLabel}</span>
            <div
                className={styles.outer}
                onClick={() => {
                    onUpdate(!switched ? 'right' : 'left');
                    toggleSwitched();
                }}
            >
                <div
                    className={`${styles.inner} ${
                        switched ? styles.switched : ''
                    }`}
                />
            </div>
            <span>{rightLabel}</span>
        </div>
    );
}
