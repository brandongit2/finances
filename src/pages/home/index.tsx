import {Layout} from '../../components';
import styles from './index.module.css';
import TransactionList from './components/TransactionList';

export default function Home() {
    return (
        <Layout authenticatedRoute className={styles.container}>
            <TransactionList />
        </Layout>
    );
}
