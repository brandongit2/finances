import {useState} from 'react';
import styles from './Input.module.css';

export default function Input(
    props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <span
            className={`${styles.container} ${
                isFocused ? styles.focused : ''
            } ${props.className || ''}`}
        >
            <input
                {...props}
                className={styles.input}
                onFocus={(evt) => {
                    setIsFocused(true);
                    props.onFocus && props.onFocus(evt);
                }}
                onBlur={(evt) => {
                    setIsFocused(false);
                    props.onBlur && props.onBlur(evt);
                }}
            />
        </span>
    );
}
