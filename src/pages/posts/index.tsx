import Head from 'next/head'
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { useState } from 'react'

type Post = {
	title: string,
	description: string,
	cover: string,
	updateAt: string,
	slug: string
}
interface PostsProps {
	posts: Post[]
}

export default function Posts({ posts: postsBlog }: PostsProps) {

	const [posts, setPosts] = useState(postsBlog || [])

	return (
		<>
			<Head>
				<title>Blog PizzoSoft</title>
			</Head>
			<main className={styles.container}>
				<div className={styles.posts}>

					{posts.map((post, index) => (
						<Link href={`/posts/${post.slug}`} key={post.slug}>
							<Image
								src={post.cover}
								alt={post.title}
								width={720}
								height={410}
								quality={100}
								blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0qgcAAPkAu0/RaYsAAAAASUVORK5CYII='
								placeholder="blur"
							/>
							<strong>{post.title}</strong>
							<time>{post.updateAt}</time>
							<p>{post.description}</p>
						</Link>
					))}

					<div className={styles.buttonNavigate}>
						<div>
							<button>
								<FiChevronsLeft size={25} color="#FFF" />
							</button>
							<button>
								<FiChevronLeft size={25} color="#FFF" />
							</button>
						</div>
						<div>
							<button>
								<FiChevronRight size={25} color="#FFF" />
							</button>
							<button>
								<FiChevronsRight size={25} color="#FFF" />
							</button>
						</div>

					</div>
				</div>

			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const prismic = getPrismicClient()
	const response = await prismic.query([
		Prismic.Predicates.at('document.type', 'post'),
	], {
		orderings: '[document.last_publication_date desc]',
		fetch: ['post.title', 'post.description', 'post.cover'],
		pageSize: 3
	})

	const posts = response.results.map((post) => {
		return {
			title: RichText.asText(post.data.title),
			description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
			cover: post.data.cover.url,
			updateAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
			slug: post.uid
		}
	})
	return {
		props: {
			posts
		},
		revalidate: 60 * 30 // atualiza a cada 30 minutos
	}
}