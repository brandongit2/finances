import firebase from "firebase/app";

import styles from "./Transaction.module.css";
import {TransactionTypes} from "../../../../defs";

interface PropTypes {
  type: TransactionTypes;
  amount: number;
  time: firebase.firestore.Timestamp;
}

export default function Transaction({type, amount, time}: PropTypes) {
  const date = time.toDate();

  return (
    <div className={styles[type]}>
      <p>
        <b>{type}</b> of <b>${amount}</b> on {date.toDateString()} at{" "}
        {date.toTimeString()}
      </p>
    </div>
  );
}
