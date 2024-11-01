'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import Pagination from '@/components/dashboard/pagination/Pagination';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardMessagesId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';
import { getMessagesDashboardClient } from '@/services/dashboard/messages/dashboard.messages.service';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';

interface IProps {
	data: IResponse<IMessages>;
}

export default function MessagesTable(props: IProps) {
	const { data } = props;
	const [newData, setNewData] = useState(data);

	const header = [
		{ name: 'ID' },
		{ name: 'First Name' },
		{ name: 'Last Name' },
		{ name: 'Email' },
		{ name: 'Phone' },
		{ name: 'Actions' },
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={`${styles.tableHeader}`}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
					</li>
					{newData?.items?.map((item, index: number) => (
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
							<div className={`${styles.col} ${styles.col2}`}>
								{item.first_name}
							</div>
							<div className={`${styles.col} ${styles.col3}`}>
								{item.last_name}
							</div>
							<div className={`${styles.col} ${styles.col4}`}>{item.email}</div>
							<div className={`${styles.col} ${styles.col5}`}>{item.phone}</div>
							<div className={`${styles.col} ${styles.col6}`}>
								<EditButton callback={() => getDashboardMessagesId(item.id)} />
								<RemoveButton callback={() => alert('I am not ready yet')} />
							</div>
						</li>
					))}
				</ul>
			</div>
			{newData?.items?.length > 0 ? (
				<Pagination
					num_pages={newData?.pagination?.num_pages}
					currentPage={newData?.pagination?.current_page}
					totalCount={newData?.items_count}
					pageSize={10}
					onPageChange={async (page) => {
						const res = await getMessagesDashboardClient(page);
						if (res.success) {
							setNewData(res.data);
						}
					}}
				/>
			) : null}
		</div>
	);
}
