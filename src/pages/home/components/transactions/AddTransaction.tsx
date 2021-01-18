import firebase from 'firebase/app';
import {ChangeEvent, useReducer, useState} from 'react';
import {useFirestore} from 'reactfire';

import styles from './AddTransaction.module.css';
import {Input} from '../../../../components';
import {TransactionTypes} from '../../../../defs';
import store from '../../../../redux/store';

export default function AddTransaction() {
    const firestore = useFirestore();

    const [transactionType, setTransactionType] = useState<TransactionTypes>(
        'deposit'
    );
    const [amount, setAmount] = useReducer(
        (state: string, newValue: string) => {
            // Remove negative signs
            newValue = newValue.replace(/-/g, '');

            // Truncate to hundredths place
            newValue = newValue.replace(/(?<=\.[0-9]{2})[0-9]+/, '');

            return newValue;
        },
        '0'
    );

    function onTransactionTypeChanged(evt: ChangeEvent<HTMLInputElement>) {
        setTransactionType(evt.target.value as TransactionTypes);
    }

    function submit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        // Validate form
        if (transactionType === null) {
            console.log('no transaction type');
            return;
        }

        firestore
            .collection('users')
            .doc(store.getState().userInfo.uid as string)
            .collection('transactions')
            .add({
                time: firebase.firestore.Timestamp.now(),
                type: transactionType,
                amount: parseFloat(amount)
            });
        firestore
            .collection('users')
            .doc(store.getState().userInfo.uid as string)
            .collection('userInfo')
            .doc('balances')
            .update({
                main: firebase.firestore.FieldValue.increment(
                    parseFloat(amount) *
                        (transactionType === 'deposit' ? 1 : -1)
                )
            });

        // Reset form values
        setTransactionType('deposit');
        setAmount('0');
    }

    return (
        <form className={styles.container} onSubmit={submit}>
            <h2>Add a transaction</h2>
            <div className={styles.radio}>
                <div
                    className={`${styles.radioOverlay} ${styles[transactionType]}`}
                >
                    <div>
                        <span>Deposit</span>
                    </div>
                    <div>
                        <span>Withdrawl</span>
                    </div>
                </div>

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
                <span>$</span>
                <Input
                    type="number"
                    required
                    value={amount}
                    onChange={(evt) => {
                        setAmount(evt.target.value);
                    }}
                />
            </div>
            <button>Submit</button>
        </form>
    );
}
