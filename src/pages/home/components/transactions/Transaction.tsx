import styles from './Transaction.module.css';
import {TransactionTypes} from '../../../../defs/TransactionTypes';

interface PropTypes {
    type: TransactionTypes;
    amount: number;
}

export default function Transaction({type, amount}: PropTypes) {
    return (
        <div className={styles[type]}>
            <b>{type}</b>
            <p>${amount}</p>
        </div>
    );
}
