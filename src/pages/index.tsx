import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import techsImage from '../../public/images/techs.svg'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import banner from "../../public/images/banner.jpg"

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
				<meta charSet="UTF-8" />
                <meta name="description" content="PizzoSoft Desenvolvimento De Software." />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="PizzoSoft"></meta>
                <meta property="og:url" content="http://pizzosoft.com.br"></meta>
                <meta property="og:description" content="A PizzoSoft é uma empresa de Analise e Desenvolvimento de Softwares fundada em 2014. Com base em São Paulo busca inovar em cada projeto. A empresa tem como foco o desenvolvimento de softwares Personalizados, sem a intenção de apenas atender ao cliente, mas também tornar todas as visões e sonhos em realidade." />
                <meta property="og:image" content="https://pizzosoft.com.br"></meta>
                <meta property="og:ttl" content="604800"></meta>
			</Head>
			<main className={styles.container}>
				<div className={styles.containerHeader}>
					<section className={styles.ctaText}>
						<h1>{content.title}</h1>
						<span>{content.subtile}</span>

					</section>
					<Image src={banner}
						alt="Banners"
						width={620}
						height={310}
						quality={100}
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0qgcAAPkAu0/RaYsAAAAASUVORK5CYII='
						placeholder="blur" />
				</div>
				<hr className={styles.divisor} />
				<div className={styles.sectionContent}>
					<section>
						<h2>{content.mobile}</h2>
						<div className={styles.postContent} dangerouslySetInnerHTML={{__html: content.mobile_content}}></div>
					</section>
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
		mobile_content: RichText.asHtml(mobile_content),
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