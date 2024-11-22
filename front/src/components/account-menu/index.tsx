'use client';

import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
					[styles.active]: /^\/account\/orders(\/\d+)?$/.test(pathname),
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
