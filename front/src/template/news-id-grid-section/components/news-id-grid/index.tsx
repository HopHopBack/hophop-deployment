'use client';

import useIsMobile from '@/hooks/useIsMobile';
import DesktopNewsGrid from '../desktop-news-id-grid';
import MobileNewsGrid from '../mobile-news-id-grid';

interface IProps {
	news: INews;
}

export default function NewsIdGrid({ news }: IProps) {
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
