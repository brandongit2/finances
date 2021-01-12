import {useContext, useEffect, useState} from 'react';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import {FirebaseContext} from '../contexts/firebase';

export default function Home() {
    const [data, setData] = useState<Array<{[key: string]: any}>>([]);

    const {firestore} = useContext(FirebaseContext);

    useEffect(() => {
        firestore()
            .collection('transactions')
            .get()
            .then(({docs}) => {
                setData(docs.map((doc) => ({...doc.data(), id: doc.id})));
            });
    }, [firestore]);

    if (data === null) {
        return <Loading />;
    } else {
        return (
            <Layout authenticatedRoute>
                {data.map((datum: any) => (
                    <div key={datum.id}>
                        <p>{datum.type}</p>
                        <p>{datum.amount}</p>
                    </div>
                ))}
            </Layout>
        );
    }
}
