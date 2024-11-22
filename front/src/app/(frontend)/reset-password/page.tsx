import Image from 'next/image';
import { Suspense } from 'react';
import type { Metadata } from 'next';

import styles from './page.module.scss';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

export const metadata: Metadata = {
	title: `Reset Password - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Record<string, string | undefined>;
}) {
	const userEmail = searchParams['user_email'];
	const token = searchParams['key'];

	if (!userEmail || !token) {
		return <div>Invalid URL</div>;
	}
	return (
		<div className={styles.pageWrapper}>
			<div>
				<h1 className={styles.formTitle}>Password Reset</h1>
				<p className={styles.emailAddress}>for {userEmail}</p>
			</div>
			<div className={styles.imageWrapper}>
				<Image
					src={'/illustration_password.svg'}
					width={300}
					height={360}
					alt={'image'}
				/>
			</div>
			<Suspense>
				<ResetPasswordForm token={token} user_email={userEmail} />
			</Suspense>
		</div>
	);
}
