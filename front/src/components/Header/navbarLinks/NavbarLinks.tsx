'use client';

import Link from 'next/link';
import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import styles from './NavbarLinks.module.scss';

export default function NavbarLinks() {
	const router = useRouter();
	const pathname = usePathname();

	const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (pathname === '/') {
			const productsSection = document.getElementById('category');
			if (productsSection) {
				productsSection.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			router.push('/#category');
		}
	};

	return (
		<ul className={styles.nav}>
			<Link href="/news" className={styles.nav_link}>
				NEWS
			</Link>
			<Link
				href="/"
				className={styles.nav_link}
				onClick={handleScrollToProducts}
			>
				PRODUCT
			</Link>
			<Link href="#" className={styles.nav_link}>
				CATALOG
			</Link>
		</ul>
	);
}
