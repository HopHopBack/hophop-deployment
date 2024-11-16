'use client';

import SectionContainer from '@/components/SectionContainer/SectionContainer';

import styles from './styles.module.scss';

export default function Test() {
	const onClickHandler = () => {
		console.log('test');
	};

	return (
		<SectionContainer>
			<button onClick={() => onClickHandler()}>TEST</button>
		</SectionContainer>
	);
}
