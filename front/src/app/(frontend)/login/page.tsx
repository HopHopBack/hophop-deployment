import Image from 'next/image';
import type { Metadata } from 'next';

import styles from '@/app/(frontend)/login/styles.module.scss';
import LoginForm from '@/template/LoginForm/LoginForm';

export const metadata: Metadata = {
	title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function Login() {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1 className={styles.title}>Welcome to</h1>
				<div className={styles.logo}>
					<Image src={'/logo.svg'} alt={'logo'} width={300} height={165} />
				</div>
			</div>
			<LoginForm />
		</div>
	);
}
