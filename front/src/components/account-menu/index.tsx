'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import styles from './styles.module.scss';

interface IProps {
	className?: string;
}

export default function AccountMenu({ className }: IProps) {
	const pathname = usePathname();

	return (
		<div className={cn(styles.menu, className)}>
			<Link
				href="/account/orders"
				className={cn(styles.item, {
					[styles.active]: pathname === '/account/orders',
				})}
			>
				Orders
			</Link>

			<Link
				href="/account"
				className={cn(styles.item, {
					[styles.active]: pathname === '/account',
				})}
			>
				Account
			</Link>
		</div>
	);
}
