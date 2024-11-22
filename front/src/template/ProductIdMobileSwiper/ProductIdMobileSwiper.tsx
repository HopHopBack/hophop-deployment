'use client';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

import { FullscreenSwiper } from '../FullscreenSwiper/FullscreenSwiper';
import AddToFavoriteButton from '@/components/AddToFavoriteButton/AddToFavoriteButton';

import { getImages } from '@/utils/typeGuards';

import styles from './styles.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
	isPreview?: boolean;
}

export default function ProductIdMobileSwiper(props: IProps) {
	const { product, className = '', isPreview = false } = props;
	const [isFullscreenOpen, setFullscreenOpen] = useState(false);
	const images = getImages(product?.images);
	const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index);
		setFullscreenOpen(true);
	};

	const handleCloseFullscreen = () => {
		setFullscreenOpen(false);
	};

	return (
		<div className={`${styles.swiperContainer} ${className}`}>
			{isFullscreenOpen && (
				<FullscreenSwiper
					images={images}
					initialSlide={selectedImageIndex}
					onClose={handleCloseFullscreen}
				/>
			)}
			<Swiper
				pagination={{
					clickable: true,
					bulletActiveClass: `${styles.swiperPaginationBulletActive}`,
					bulletClass: `${styles.swiperPaginationBullet}`,
					horizontalClass: `${styles.horizontalClass}`,
				}}
				modules={[Pagination]}
				className={styles.swiper}
			>
				{product && (
					<AddToFavoriteButton
						isPreview={isPreview}
						className={styles.icon}
						product={product}
					/>
				)}

				{getImages(product?.images).map((img, key) => (
					<SwiperSlide
						key={key}
						className={styles.slide}
						onClick={() => handleImageClick(key)}
					>
						<Image width={319} height={380} src={img.image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
