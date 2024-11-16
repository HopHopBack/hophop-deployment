import { ChevronLeft, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import useIsMobile from '@/hooks/useIsMobile';

import styles from './styles.module.scss';

interface FullscreenSwiperProps {
	images: { image: string }[];
	initialSlide: number;
	onClose: () => void;
}

export function FullscreenSwiper({
	images,
	onClose,
	initialSlide,
}: FullscreenSwiperProps) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperClass | null>(null);
	const [currentIndex, setCurrentIndex] = useState(initialSlide);
	const [zoomedSlides, setZoomedSlides] = useState<{ [key: number]: boolean }>(
		{},
	);
	const [startY, setStartY] = useState<number | null>(null);

	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	const handleImageDoubleClick = (index: number) => {
		setZoomedSlides((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const onSlideChange = (swiper: SwiperClass) => {
		setCurrentIndex(swiper.realIndex);
		setZoomedSlides((prev) => ({ ...prev, [currentIndex]: false }));
	};

	const handleTouchStart = (event: TouchEvent) => {
		setStartY(event.touches[0].clientY);
	};

	const isMobile = useIsMobile(992);

	useEffect(() => {
		if (isMobile) {
			const element = document.getElementById('overlay');

			const handleTouchMove = (event: TouchEvent) => {
				if (startY !== null) {
					const currentY = event.touches[0].clientY;
					const diffY = startY - currentY;

					if (diffY < -150) {
						onClose();
					}
				}
			};

			if (element) {
				element.addEventListener('touchstart', handleTouchStart);
				element.addEventListener('touchmove', handleTouchMove);

				return () => {
					element.removeEventListener('touchstart', handleTouchStart);
					element.removeEventListener('touchmove', handleTouchMove);
				};
			}
		} else {
			return undefined;
		}
	}, [startY, swiperRef, onClose, isMobile]);

	return (
		<div className={styles.fullscreenOverlay} id="overlay">
			<button title="X" className={styles.closeButton} onClick={onClose}>
				<X />
			</button>
			<div className={styles.buttonContainer}>
				<button
					title="next"
					onClick={handleNext}
					className={`${styles.button} ${styles.button_right}`}
				>
					<ChevronLeft className={styles.iconRotate} />
				</button>
				<button
					title="prev"
					onClick={handlePrev}
					className={` ${styles.button} ${styles.button_left}`}
				>
					<ChevronLeft />
				</button>
			</div>
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				initialSlide={initialSlide}
				onSlideChange={onSlideChange}
				loop={true}
				spaceBetween={0}
				thumbs={{ swiper: thumbsSwiper }}
				navigation={false}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles.fullscreenSwiper}
			>
				{images.map((img, key) => (
					<SwiperSlide key={key}>
						<Image
							fill
							src={img.image}
							alt=""
							className={`${styles.fullscreenImage} ${zoomedSlides[key] ? styles.zoomed : ''}`}
							onDoubleClick={() => handleImageDoubleClick(key)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<div className={styles.counter}>
				{currentIndex + 1}/{images.length}
			</div>
			<div>
				<Swiper
					onSwiper={setThumbsSwiper}
					loop={true}
					slidesPerView={3}
					spaceBetween={10}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className={styles.thumbnails}
				>
					{images.map((img, key) => (
						<SwiperSlide key={key} className={styles.swiperSlide2}>
							<Image
								key={key}
								width={100}
								height={100}
								src={img.image}
								alt=""
								className={`${styles.thumbnailImage} ${currentIndex === key ? `${styles.active}` : ''}`}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
