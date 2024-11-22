import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

import { getMessagesDashboardServer } from '@/services/dashboard/messages/dashboard.messages.service';

import DashboardTable from '@/components/dashboard/dashboardTable/DashboardTable';
import styles from './styles.module.scss';

export const metadata: Metadata = {
	title: `Messages - ${process.env.NEXT_PUBLIC_APP_NAME} Dashboard`,
};

export default async function DashboardMessages() {
	const messages = await getMessagesDashboardServer();
	if (!messages.success) {
		notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				searchType={'customers'}
				compact={true}
				text={'Messages'}
			/>
			{messages.data.items.length > 0 ? (
				<DashboardTable
					columns={[
						{ key: 'id', label: 'ID' },
						{ key: 'first_name', label: 'First Name' },
						{ key: 'last_name', label: 'Last Name' },
						{ key: 'email', label: 'Email' },
						{ key: 'phone', label: 'Phone' },
						{ key: 'actions', label: 'Actions' },
					]}
					data={messages.data}
				/>
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
