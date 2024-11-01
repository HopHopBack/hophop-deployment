'use client';

import DesktopTopNewsGrid from '../desktop-top-news-grid';
import MobileTopNewsGrid from '../mobile-top-news-grid';

import useIsMobile from '@/hooks/useIsMobile';

interface IProps {
	theHottest: INews;
	hopHopChoice: INews;
	oneLove: INews;
	customerSecret: INews;
}

export default function TopNewsGrid({
	customerSecret,
	hopHopChoice,
	oneLove,
	theHottest,
}: IProps) {
	const isMobile = useIsMobile(768);

	return (
		<>
			{isMobile ? (
				<MobileTopNewsGrid
					customerSecret={customerSecret}
					hopHopChoice={hopHopChoice}
					oneLove={oneLove}
					theHottest={theHottest}
				/>
			) : (
				<DesktopTopNewsGrid
					customerSecret={customerSecret}
					hopHopChoice={hopHopChoice}
					oneLove={oneLove}
					theHottest={theHottest}
				/>
			)}
		</>
	);
}
