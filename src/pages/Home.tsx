import {useContext, useEffect, useState} from 'react';

import styles from './Home.module.css';
import {AddTransaction, Layout, Loading, Transaction} from '../components';
import {FirebaseContext} from '../contexts/firebase';
import {Transaction as TransactionInterface} from '../defs/Transaction';

export default function Home() {
    const [data, setData] = useState<Array<{[key: string]: any}>>([]);

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
            <Layout authenticatedRoute className={styles.container}>
                {data.map((datum: any) => (
                    <div key={datum.id}>
                        <Transaction type={datum.type} amount={datum.amount} />
                    </div>
                ))}
                <AddTransaction />
            </Layout>
        );
    }
}
