'use client';
import { PencilLine, TextSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './styles.module.scss';

interface IProps {
	callback: () => string;
	type?: 'edit' | 'view';
}

export default function EditButton(props: IProps) {
	const { callback, type } = props;
	const router = useRouter();
	return (
		<div className={styles.iconWrapper}>
			{type === 'edit' ? (
				<PencilLine onClick={() => router.push(callback())} />
			) : (
				<TextSearch onClick={() => router.push(callback())} />
			)}
		</div>
	);
}
