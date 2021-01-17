import firebase from 'firebase/app';
import {ChangeEvent, useContext, useReducer, useState} from 'react';

import styles from './AddTransaction.module.css';
import {Input} from '../../../../components';
import {FirebaseContext} from '../../../../contexts';
import {TransactionTypes} from '../../../../defs/TransactionTypes';

export default function AddTransaction() {
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

    const {firestore} = useContext(FirebaseContext);
    function submit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();

        // Validate form
        if (transactionType === null) {
            console.log('no transaction type');
            return;
        }

        firestore().collection('transactions').add({
            time: firebase.firestore.Timestamp.now(),
            type: transactionType,
            amount
        });
        firestore()
            .collection('accountInfo')
            .doc('accountInfo')
            .update({
                balance: firebase.firestore.FieldValue.increment(
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
