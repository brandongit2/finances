import {TransactionTypes} from '../../../defs/TransactionTypes';

interface PropTypes {
    type: TransactionTypes;
    amount: number;
}

export default function Transaction({type, amount}: PropTypes) {
    return (
        <div>
            <b>{type}</b>
            <p>{amount}</p>
        </div>
    );
}
