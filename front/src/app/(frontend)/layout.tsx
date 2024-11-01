import type { Metadata } from 'next';

import ButtonToTop from '@/components/ButtonToTop/ButtonToTop';
import Container from '@/components/Container/Container';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

import '@/styles/globals.scss';
import '@/styles/reset.scss';
import '@/styles/variables.scss';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: 'Where Every Hop Counts for Cool EDC Gear!',
};

export default function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Container>
					<div className={styles.wrapper}>{children}</div>
					<div className={styles.buttonToTop}>
						<ButtonToTop />
					</div>
				</Container>
			</main>
			<Footer />
		</>
	);
}
