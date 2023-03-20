import { GetStaticProps } from 'next'
import styles from './styles.module.scss'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from 'next/head'

import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

interface ContentProps {
	content: {
		title: string,
		description: string,
		banner: string,
		facebook: string,
		instagram: string,
		linkedin: string
	}
}

export default function Sobre({ content }: ContentProps) {
	return (
		<>
			<Head>
				<title>Quem Somos? | PizzoSoft Desenvolvimento de Software</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<section className={styles.ctaText}>
						<h1>
							{content.title}
						</h1>
						<div className={styles.postContent} dangerouslySetInnerHTML={{__html: content.description}}></div>

						<Link href={content.facebook}>
							<FaFacebook size={40} />
						</Link>
						<Link href={content.instagram}>
							<FaInstagram size={40} />
						</Link>
						<Link href={content.linkedin}>
							<FaLinkedin size={40} />
						</Link>

					</section>
					<Image
						src={content.banner}
						alt="PizzoSoft"
						width={620}
						height={310}
						quality={100}
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0qgcAAPkAu0/RaYsAAAAASUVORK5CYII='
						placeholder="blur"
					/>
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient()
	const response = await prismic.query([
		Prismic.Predicates.at('document.type', 'about')
	])

	const {
		title,
		description,
		banner,
		facebook,
		instagram,
		linkedin
	} = response.results[0].data

	const content = {
		title: RichText.asText(title),
		description: RichText.asHtml(description),
		banner: banner.url,
		facebook: facebook.url,
		instagram: instagram.url,
		linkedin: linkedin.url
	}
	return {
		props: {
			content
		},
		revalidate: 60 * 1000
	}

}