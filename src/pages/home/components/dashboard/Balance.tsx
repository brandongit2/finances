import {useContext, useEffect, useState} from 'react';

import {FirebaseContext} from '../../../../contexts';

export default function Balance() {
    const [balance, setBalance] = useState(0);

    const {firestore} = useContext(FirebaseContext);
    useEffect(() => {
        firestore()
            .collection('accountInfo')
            .doc('accountInfo')
            .onSnapshot((doc) => {
                setBalance(doc.data()?.balance);
            });
    }, [firestore]);

    return (
        <div>
            <h2>Balance</h2>
            <p>${balance}</p>
        </div>
    );
}
