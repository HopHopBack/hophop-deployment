import Script from 'next/script';

import Initializer from '@/components/initializer';

import { londrinaSolid } from '@/styles/fonts/fonts';

import '@/styles/reset.scss';
import '@/styles/variables.scss';
import '@/styles/globals.scss';

import styles from './page.module.scss';

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-5RZYXBRX4N"
				/>

				<Script id="gtag">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-5RZYXBRX4N');
					`}
				</Script>

				<Script id="clarity-script" strategy="afterInteractive">
					{`
						(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
					`}
				</Script>
			</head>
			<body className={londrinaSolid.className}>
				<div className={styles.bodyInner}>{children}</div>
				<Initializer />
			</body>
		</html>
	);
}
