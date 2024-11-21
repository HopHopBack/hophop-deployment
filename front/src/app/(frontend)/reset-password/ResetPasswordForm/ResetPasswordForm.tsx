'use client';

import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import ActionModal from '@/components/ActionModal/ActionModal';
import Button from '@/components/Button/Button';
import InputPassword from '@/components/InputPassword/InputPassword';
import useOutside from '@/hooks/useOutside';
import { resetPassword } from '@/services/auth/passwordResetApi';
import { passwordValid } from '@/validation/checkout/validation';

import styles from './ResetPasswordForm.module.scss';

export interface IFormValuesProfile {
	newPassword: string;
	confirmPassword: string;
}

interface IProps {
	token: string;
	user_email: string;
}

export default function ResetPasswordForm(props: IProps) {
	const { token, user_email } = props;
	const [errorMessage, setErrorMessage] = useState('');

	const {
		ref: successModalRef,
		isShow: isSuccessModalOpen,
		setIsShow: setIsSuccessModalOpen,
	} = useOutside(false);

	const handleSubmit = async (values: IFormValuesProfile) => {
		const res = await resetPassword({
			token: token,
			email: user_email,
			password: values.newPassword,
			password2: values.confirmPassword,
		});

		if (res.success) {
			setIsSuccessModalOpen(true);
		} else {
			setErrorMessage(res.error?.message || 'чAn unknown error occurred');
		}
	};

	return (
		<>
			<Formik
				validationSchema={yup
					.object({
						newPassword: passwordValid,
						confirmPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('newPassword')], 'Passwords must match'),
					})
					.required()}
				initialValues={{
					newPassword: '',
					confirmPassword: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.form}>
						<InputPassword
							title={'New password'}
							name={'newPassword'}
							placeholder={'New password'}
						/>
						<InputPassword
							title={'Confirm password'}
							name={'confirmPassword'}
							placeholder={'Confirm password'}
						/>
						{errorMessage && (
							<div className={styles.errorMessage}>{errorMessage}</div>
						)}
						<Button
							type="submit"
							className={styles.resetButton}
							text="Reset my password"
							style="primary"
						/>
					</Form>
				)}
			</Formik>
			{isSuccessModalOpen && (
				<ActionModal
					ref={successModalRef}
					show={isSuccessModalOpen}
					iconSrc={'/thanksPageIllustration.svg'}
					onClose={() => setIsSuccessModalOpen(false)}
					title={'Woohoo! You did it!'}
					text={`You've successfully reset your password. You're ready to rock and
						roll again!`}
					type={'success'}
				/>
			)}
		</>
	);
}
