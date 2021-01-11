import {useContext, useEffect, useState} from 'react';

import Loading from '../components/Loading';
import FirebaseContext from '../contexts/firebase';

export default function Home() {
    const [data, setData] = useState<Array<{[key: string]: any}>>([]);

    const {firestore: db} = useContext(FirebaseContext);

    useEffect(() => {
        db.collection('transactions')
            .get()
            .then(({docs}) => {
                setData(docs.map((doc) => doc.data()));
            });
    }, []);

    if (data === null) {
        return <Loading />;
    } else {
        return (
            <div>
                <h1>Finances</h1>
                {data.map((datum: any) => (
                    <div>
                        <p>{datum.type}</p>
                        <p>{datum.amount}</p>
                    </div>
                ))}
            </div>
        );
    }
}
