'use client';

import DesktopNewsGrid from '../desktop-news-grid';
import MobileNewsGrid from '../mobile-news-grid';

import useIsMobile from '@/hooks/useIsMobile';

interface IProps {
	news: INews[];
}

export default function NewsGrid({ news }: IProps) {
	const isMobile = useIsMobile(992);

	return (
		<>
			{isMobile ? (
				<MobileNewsGrid news={news} />
			) : (
				<DesktopNewsGrid news={news} />
			)}
		</>
	);
}
