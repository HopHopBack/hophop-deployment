import SectionContainer from '@/components/SectionContainer/SectionContainer';

import TopNewsGrid from './components/top-news-grid';

import { getTopNews } from '@/services/fetchData';

import styles from './styles.module.scss';

export default async function TopNews() {
	const theHottest = await getTopNews('hottest');
	const hopHopChoice = await getTopNews('choice');
	const oneLove = await getTopNews('love');
	const customerSecret = await getTopNews('secret');

	if (
		!theHottest.success ||
		!hopHopChoice.success ||
		!oneLove.success ||
		!customerSecret.success
	) {
		return <div>Error</div>;
	}

	return (
		<section>
			<SectionContainer>
				<h2 className={styles.title}>TOP News</h2>
			</SectionContainer>
			<div className={styles.cards}>
				<TopNewsGrid
					customerSecret={customerSecret.data.items[0]}
					hopHopChoice={hopHopChoice.data.items[0]}
					oneLove={oneLove.data.items[0]}
					theHottest={theHottest.data.items[0]}
				/>
			</div>
		</section>
	);
}
