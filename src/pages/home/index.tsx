import TransactionList from './components/transactions/TransactionList';
import Dashboard from './components/dashboard/Dashboard';
import styles from './index.module.css';
import {Layout} from '../../components';

export default function Home() {
    return (
        <Layout authenticatedRoute className={styles.container}>
            <TransactionList />
            <Dashboard />
        </Layout>
    );
}
