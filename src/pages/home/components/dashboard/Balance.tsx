import {useFirestore, useFirestoreDocData} from 'reactfire';

import {Loading} from '../../../../components';
import store from '../../../../redux/store';

export default function Balance() {
    const transactionsRef = useFirestore()
        .collection('users')
        .doc(store.getState().userInfo.uid as string)
        .collection('userInfo')
        .doc('balances');
    const {status, data: balances} = useFirestoreDocData<{main: number}>(
        transactionsRef
    );

    if (status === 'loading') return <Loading />;
    return (
        <div>
            <h2>Balance</h2>
            <p>${balances.main}</p>
        </div>
    );
}
