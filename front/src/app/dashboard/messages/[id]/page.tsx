import MessageDetails from '@/components/dashboard/dashboardMessage';
import styles from './styles.module.scss';
import { getMessageDashboardClient } from '@/services/dashboard/messages/dashboard.messages.service';

interface IMessageProps {
	params: {
		id: number;
	};
}

export default async function MessageDetailsPage(props: IMessageProps) {
	const { params } = props;
	const { data: message } = await getMessageDashboardClient(params.id);
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>Message</h1>
				<p className={styles.orderId}>{`# ${message.id}`}</p>
			</div>
			<div className={styles.userDetails}>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>First Name</p>
					<p className={styles.details}>{message.first_name}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Last Name</p>
					<p className={styles.details}>{message.last_name}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>E-Mail</p>
					<a
						href={`mailto:${message?.email}`}
						className={`${styles.details} ${styles.link}`}
					>
						{message?.email}
					</a>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Phone Number</p>
					<a
						href={`tel:${message?.phone}`}
						className={`${styles.details} ${styles.link}`}
					>
						{message?.phone}
					</a>
				</div>
			</div>
			<div className={styles.detailsWrapper}>
				<p className={styles.detailsLabel}>Message Text</p>
				<p className={styles.messageWrapper}>{message?.message}</p>
			</div>
			<MessageDetails />
		</div>
	);
}
