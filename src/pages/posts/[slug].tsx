import { GetServerSideProps } from 'next'
import styles from './posts.module.scss'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from 'next/head'
import Image from 'next/image'
import getPosts from '@/services/getPosts'

interface PostProps {
	post: {
		slug: string,
		title: string,
		description: string,
		cover: string,
		updateAt: string
	}
}

export default function Post({ post }: PostProps) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<main className={styles.container}>
				<article className={styles.post}>
					<Image
						src={post.cover}
						width={720}
						height={410}
						alt={post.title}
						placeholder="blur"
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0qgcAAPkAu0/RaYsAAAAASUVORK5CYII='
						quality={100}
					/>
					<h1>{post.title}</h1>
					<time>{post.updateAt}</time>
					<div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.description}}></div>
				</article>

			</main>
		</>
	)
}

export async function getStaticPaths() {
	const results = await getPosts(1)

	console.log(results)

	const paths = results.posts.map((post: { slug: any }) => ({
		params: { slug: post.slug },
	}));
	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps = async (context: { params: { slug?: "" | undefined; }; }) => {
	const { slug = "" } = context.params

	const prismic = getPrismicClient()

	const response = await prismic.getByUID('post', String(slug), {})

	if (!response) {
		return {
			redirect: {
				destination: '/posts',
				permanent: false
			}
		}
	}

	const post = {
		slug: slug,
		title: RichText.asText(response.data.title),
		description: RichText.asHtml(response.data.description),
		cover: response.data.cover.url,
		updateAt: new Date(response.last_publication_date!).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})
	}
	return {
		props: {
			post
		},
		revalidate: 60 * 15
	}
}