'use client';

import Button from '@/components/Button/Button';
import styles from './styles.module.scss';
import { Field, Form, Formik, FormikProps } from 'formik';

const MessageDetails = () => {
	return (
		<Formik
			initialValues={{ quickAnswer: '' }}
			onSubmit={(values, { resetForm }) => {
				console.log(values.quickAnswer);
				resetForm();
			}}
		>
			{({
				handleReset,
				isValid,
				dirty,
			}: FormikProps<{ quickAnswer: string }>) => (
				<Form>
					<div className={styles.detailsWrapper}>
						<label htmlFor="quickAnswer" className={styles.detailsLabel}>
							Quick Answer
						</label>
						<Field
							as="textarea"
							id="quickAnswer"
							name="quickAnswer"
							placeholder="Quick Answer"
							className={styles.quickAnswerArea}
						/>
					</div>
					<div className={styles.buttonsContainer}>
						<button
							type="button"
							className={styles.deleteButton}
							onClick={handleReset}
						>
							Clear all
						</button>
						<Button
							type="submit"
							className={styles.saveButton}
							text="Send Message"
							disabled={!(isValid && dirty)}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default MessageDetails;
