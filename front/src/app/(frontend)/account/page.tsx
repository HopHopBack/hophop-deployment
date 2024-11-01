import type { Metadata } from 'next';

import AccountMenu from '@/components/account-menu';
import AccountForm from '@/template/AccountForm/AccountForm';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: `Account - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function AccountPage() {
	return (
		<div className={styles.page}>
			<AccountMenu className={styles.menu} />

			<h1 className={styles.title}>Account</h1>

			<AccountForm />
		</div>
	);
}
