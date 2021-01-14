import {useContext, useEffect, useState} from 'react';

import AddTransaction from './AddTransaction';
import Transaction from './Transaction';
import styles from './TransactionList.module.css';
import {FirebaseContext} from '../../../contexts';
import {Transaction as TransactionInterface} from '../../../defs/Transaction';
import Loading from '../../../components/Loading';

export default function TransactionList() {
    const [data, setData] = useState<Array<TransactionInterface> | null>(null);

    const {firestore} = useContext(FirebaseContext);

    useEffect(() => {
        firestore()
            .collection('transactions')
            .onSnapshot((querySnapshot) => {
                let transactions = [] as Array<TransactionInterface>;
                querySnapshot.forEach((doc) => {
                    transactions.push({
                        ...(doc.data() as TransactionInterface),
                        id: doc.id
                    });
                });
                setData(transactions);
            });
    }, [firestore]);

    if (data === null) {
        return <Loading />;
    } else {
        return (
            <div className={styles.container}>
                {data.map((datum: any) => (
                    <div key={datum.id}>
                        <Transaction type={datum.type} amount={datum.amount} />
                    </div>
                ))}
                <AddTransaction />
            </div>
        );
    }
}
