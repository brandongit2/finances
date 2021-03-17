import {useFirestore, useFirestoreCollectionData} from "reactfire";

import AddTransaction from "./AddTransaction";
import Transaction from "./Transaction";
import styles from "./TransactionList.module.css";
import {Loading} from "../../../../components";
import store from "../../../../redux/store";

export default function TransactionList() {
  const transactionsRef = useFirestore()
    .collection("users")
    .doc(store.getState().userInfo.uid as string)
    .collection("transactions")
    .orderBy("time");
  const {status, data} = useFirestoreCollectionData(transactionsRef);
  console.log(data);

  if (status === "loading") return <Loading />;

  return (
    <div className={styles.container}>
      <h2>All transactions</h2>
      {data.map((datum: any) => (
        <div key={datum.id}>
          <Transaction
            type={datum.type}
            amount={datum.amount}
            time={datum.time}
          />
        </div>
      ))}
      <AddTransaction />
    </div>
  );
}
