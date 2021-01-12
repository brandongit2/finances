import {ChangeEvent, useContext, useState} from 'react';

import styles from './AddTransaction.module.css';
import {FirebaseContext} from '../contexts';
import {TransactionTypes} from '../defs/TransactionTypes';

export default function AddTransaction() {
    const [transactionType, setTransactionType] = useState<TransactionTypes>(
        null
    );
    const [amount, setAmount] = useState(0);

    function onTransactionTypeChanged(evt: ChangeEvent<HTMLInputElement>) {
        setTransactionType(evt.target.value as TransactionTypes);
    }

    const {firestore} = useContext(FirebaseContext);
    function submit(evt: ChangeEvent<HTMLFormElement>) {
        evt.preventDefault();

        // Validate form
        if (transactionType === null) {
            console.log('no transaction type');
            return;
        }

        firestore()
            .collection('transactions')
            .add({type: transactionType, amount});

        // Reset form values
        setTransactionType(null);
        setAmount(0);
    }

    return (
        <form className={styles.container} onSubmit={submit}>
            <div className={styles.radio}>
                <input
                    type="radio"
                    id="transactionTypeWithdrawl"
                    name="transactionType"
                    value="withdrawl"
                    required
                    checked={transactionType === 'withdrawl'}
                    onChange={onTransactionTypeChanged}
                />
                <label htmlFor="transactionTypeWithdrawl">Withdrawl</label>

                <input
                    type="radio"
                    id="transactiontypeDeposit"
                    name="transactionType"
                    value="deposit"
                    required
                    checked={transactionType === 'deposit'}
                    onChange={onTransactionTypeChanged}
                />
                <label htmlFor="transactiontypeDeposit">Deposit</label>
            </div>
            <label>Amount:</label>
            <input
                type="number"
                required
                value={amount}
                onChange={(evt) => setAmount(parseFloat(evt.target.value))}
            />
            <button className={styles.submit}>Submit</button>
        </form>
    );
}
