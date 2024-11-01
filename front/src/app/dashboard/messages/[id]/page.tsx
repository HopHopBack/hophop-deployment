'use client';

import { useState } from 'react';

import styles from './styles.module.scss';
import type { Metadata } from 'next';
import { getCouponById } from '@/services/dashboard/coupons/dashboard.coupons.service';
import { notFound } from 'next/navigation';

interface Message {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
	quickAnswer: string;
}

// TODO: Add metadata

export default function MessageDetails() {
	const [message, setMessage] = useState<Message | null>(null);
	const [quickAnswer, setQuickAnswer] = useState<string>('');

	const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setQuickAnswer(e.target.value);
	};

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.titleWrapper}>
				<h1 className={styles.title}>Message</h1>
				<p className={styles.orderId}>{message?.id || 'sdfgs'}</p>
			</div>
			<div className={styles.userDetails}>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>First Name</p>
					<p className={styles.details}>{message?.firstName || 'sfgs'}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Last Name</p>
					<p className={styles.details}>{message?.lastName || 'sfgsfg'}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>E-Mail</p>
					<p className={styles.details}>{message?.email || 'sfgsfg'}</p>
				</div>
				<div className={styles.detailsWrapper}>
					<p className={styles.detailsLabel}>Phone Number</p>
					<p className={styles.details}>{message?.phone || 'sdfgsdfg'}</p>
				</div>
			</div>
			<div className={styles.detailsWrapper}>
				<p className={styles.detailsLabel}>Message Text</p>
				<p className={styles.messageWrapper}>
					{message?.message || 'hjjjjjjjjjj'}
				</p>
			</div>
			<div className={styles.detailsWrapper}>
				<label htmlFor="quickAnswer" className={styles.detailsLabel}>
					Quick Answer
				</label>
				<textarea
					id="quickAnswer"
					placeholder={'Quick Answer'}
					value={quickAnswer}
					onChange={handleAnswerChange}
					className={styles.quickAnswerArea}
				/>
			</div>
		</div>
	);
}
