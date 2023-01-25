import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import techsImage from '../../public/images/techs.svg'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

type Content = {
	title: string,
	subtile: string,
	link_action: string,
	mobile: string,
	mobile_content: string,
	mobile_banner: string,
	title_web: string,
	webcontent: string,
	web_banner: string
}
interface ContentProps {
	content: Content
}

export default function Home({ content }: ContentProps) {
	return (
		<>
			<Head>
				<title>PizzoSoft</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<section className={styles.ctaText}>
						<h1>{content.title}</h1>
						<span>{content.subtile}</span>

						<Link href={content.link_action}>
							<button>
								Começar agora
							</button>
						</Link>

					</section>
					<img src="/images/banner-conteudos.png" alt="Banners" />
				</div>
				<hr className={styles.divisor} />

				<div className={styles.sectionContent}>
					<section>
						<h2>{content.mobile}</h2>
						<span>{content.mobile_content}</span>
					</section>

					<img src={content.mobile_banner} alt="Conteúdos Mobile" />
				</div>

				<hr className={styles.divisor} />

				<div className={styles.sectionContent}>
					<img src={content.web_banner} alt="Conteúdos Mobile" />

					<section>
						<h2>{content.title_web}</h2>
						<span>{content.webcontent}</span>
					</section>

				</div>

				<div className={styles.nextLevelContent}>
					<Image src={techsImage} alt='Techs Image' />

					<h2>
						Mais de <span className={styles.alunos}>15 mil</span> já levaram a sua carreira ao próximo nível.
					</h2>
					<span>Why do we use it?</span>

					<Link href={content.link_action}>
						<button>
							Começar agora!
						</button>
					</Link>
				</div>
			</main>
		</>
	)
}


export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient()

	const response = await prismic.query([
		Prismic.Predicates.at('document.type', 'home')
	])
	const { title, subtitle, link_action, mobile, mobile_content, mobile_banner, title_web, webcontent, web_banner } = response.results[0].data

	const content = {
		title: RichText.asText(title),
		subtile: RichText.asText(subtitle),
		link_action: link_action.url,
		mobile: RichText.asText(mobile),
		mobile_content: RichText.asText(mobile_content),
		mobile_banner: mobile_banner.url,
		title_web: RichText.asText(title_web),
		webcontent: RichText.asText(webcontent),
		web_banner: web_banner.url
	}

	return {
		props: {
			content
		},
		revalidate: 60 * 2
	}
}