import firebase from 'firebase/app';
import {ChangeEvent, useContext, useState} from 'react';

import styles from './AddTransaction.module.css';
import {FirebaseContext} from '../../../../contexts';
import {TransactionTypes} from '../../../../defs/TransactionTypes';

export default function AddTransaction() {
    const [transactionType, setTransactionType] = useState<TransactionTypes>(
        'deposit'
    );
    const [amount, setAmount] = useState(0);

    function onTransactionTypeChanged(evt: ChangeEvent<HTMLInputElement>) {
        setTransactionType(evt.target.value as TransactionTypes);
    }

    const {firestore} = useContext(FirebaseContext);
    function submit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        // Validate form
        if (transactionType === null) {
            console.log('no transaction type');
            return;
        }

        firestore()
            .collection('transactions')
            .add({
                time: firebase.firestore.Timestamp.now(),
                type: transactionType,
                amount
            });
        firestore()
            .collection('accountInfo')
            .doc('accountInfo')
            .update({
                balance: firebase.firestore.FieldValue.increment(
                    amount * (transactionType === 'deposit' ? 1 : -1)
                )
            });

        // Reset form values
        setTransactionType('deposit');
        setAmount(0);
    }

    return (
        <form className={styles.container} onSubmit={submit}>
            <h2>Add a transaction</h2>
            <div className={styles.radio}>
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
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    required
                    value={amount}
                    onChange={(evt) => setAmount(parseFloat(evt.target.value))}
                />
            </div>
            <button>Submit</button>
        </form>
    );
}
