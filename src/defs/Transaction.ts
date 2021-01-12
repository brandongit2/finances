import {TransactionTypes} from './TransactionTypes';

export interface Transaction {
    id: string;
    type: TransactionTypes;
    amount: number;
}
