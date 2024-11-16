'use client';
import styles from './styles.module.scss';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useCallback } from 'react';
/* eslint-disable */
import { Image as LucideIcon, Link as LucideLink } from 'lucide-react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
/* eslint-enable */
import { useFormikContext } from 'formik';

interface IProps {
	name: string;
	value?: string;
}

export default function EditorNews(props: IProps) {
	const { name, value } = props;
	const { setFieldValue, setFieldTouched, errors, touched } =
		useFormikContext<any>();
	const inputClassName = `${styles.wrapper} ${touched.content && errors.content ? styles.inputError : touched.content ? styles.inputSuccess : ''}`;
	let content = value || '';
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Image,
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: 'https',
			}),
		],
		content: content,
		onBlur: ({ editor }) => {
			setFieldTouched('content', true, true);
		},
		onUpdate: ({ editor }) => {
			const content = editor.getHTML();
			setFieldValue(name, `${content}`);
			setFieldTouched('content', true, true);
		},
	}) as Editor;

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes('link').href;
		const url = window.prompt('URL', previousUrl);

		// cancelled
		if (url === null) {
			return;
		}

		// empty
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		// update link
		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	}, [editor]);

	const addImage = useCallback(
		(event: any) => {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = () => {
					const url = reader.result as string;
					editor.chain().focus().setImage({ src: url }).run();
				};

				reader.readAsDataURL(file);
			}
		},
		[editor],
	);
	if (!editor) {
		return null;
	}
	console.log(errors.content);
	// @ts-ignore
	return (
		<div className={styles.superMegaWrapper}>
			<div className={inputClassName}>
				<div className={styles.menuWrapper}>
					<div className={styles.menuContainer}>
						<div className={styles.buttonsWrapper}>
							<button
								type={'button'}
								style={{ fontWeight: 'bold' }}
								onClick={() => editor.chain().focus().toggleBold().run()}
								className={editor.isActive('bold') ? `${styles.active}` : ''}
							>
								<b>B</b>
							</button>
							<button
								type={'button'}
								style={{ fontStyle: 'italic' }}
								onClick={() => editor.chain().focus().toggleItalic().run()}
								className={editor.isActive('italic') ? `${styles.active}` : ''}
							>
								I
							</button>
							<button
								type={'button'}
								onClick={() => editor.chain().focus().toggleUnderline().run()}
								className={
									editor.isActive('underline') ? `${styles.active}` : ''
								}
							>
								<span className={styles.underline}>U</span>
							</button>
						</div>
						<div className={styles.buttonsWrapper}>
							<button
								type={'button'}
								onClick={() =>
									editor.chain().focus().setTextAlign('left').run()
								}
								className={
									editor.isActive({ textAlign: 'left' })
										? `${styles.activeBg}`
										: ''
								}
							>
								<div className={styles.alignLeft}>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</button>

							<button
								type={'button'}
								onClick={() =>
									editor.chain().focus().setTextAlign('center').run()
								}
								className={
									editor.isActive({ textAlign: 'center' })
										? `${styles.activeBg}`
										: ''
								}
							>
								<div className={styles.alignCenter}>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</button>

							<button
								type={'button'}
								onClick={() =>
									editor.chain().focus().setTextAlign('right').run()
								}
								className={
									editor.isActive({ textAlign: 'right' })
										? `${styles.activeBg}`
										: ''
								}
							>
								<div className={styles.alignRight}>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</button>
						</div>
						<div className={styles.buttonsWrapper}>
							<button
								type={'button'}
								onClick={() => editor.chain().focus().toggleOrderedList().run()}
								className={
									editor.isActive('orderedList') ? `${styles.activeBg}` : ''
								}
							>
								<div className={styles.orderedList}>
									<span>1</span>
									<span>2</span>
									<span>3</span>
								</div>
							</button>

							{/* Bullet List Button */}
							<button
								type={'button'}
								onClick={() => editor.chain().focus().toggleBulletList().run()}
								className={
									editor.isActive('bulletList') ? `${styles.activeBg}` : ''
								}
							>
								<span className={styles.bulletList}>• • •</span>
							</button>
						</div>
						<div className={`${styles.buttonsWrapper} ${styles.none}`}>
							<div
								className={editor.isActive('orderedList') ? 'is-active' : ''}
							>
								<input
									type="file"
									accept="image/*"
									onChange={addImage}
									style={{ display: 'none' }}
									id="upload-image"
								/>
								<label htmlFor="upload-image">
									<LucideIcon
										color={editor.isActive('image') ? '#192c32' : '#507178'}
									/>
								</label>
							</div>
							<button type={'button'} onClick={setLink}>
								<LucideLink
									color={editor.isActive('link') ? '#192c32' : '#507178'}
								/>
							</button>
						</div>
					</div>
				</div>
				<div className={styles.editor}>
					<EditorContent placeholder={'Enter Some Text'} editor={editor} />
				</div>
			</div>
			{errors.content && touched.content && (
				// @ts-ignore
				<span className={`${styles.error}`}>{errors.content}</span>
			)}
		</div>
	);
}
