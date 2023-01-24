import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="ptBR">
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap' rel='stylesheet' />
				<link rel='shortchut icon' href='/mundo.ico' type='image/ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
