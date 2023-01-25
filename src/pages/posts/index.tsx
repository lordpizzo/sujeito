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
import getPosts from '../../services/getPosts'

type Post = {
	title: string,
	description: string,
	cover: string,
	updateAt: string,
	slug: string
}
interface PostsProps {
	posts: Post[],
	page: string,
	totalPage: string
}

export default function Posts({ posts: postsBlog, page, totalPage }: PostsProps) {

	const [posts, setPosts] = useState(postsBlog || [])
	const [currentPage, SetCurrentPage] = useState(Number(page))

	async function navigatePage(pageNumber: number) {
		const response = await getPosts(pageNumber)
		SetCurrentPage(pageNumber)
		setPosts(response.posts)
	}

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

						{Number(currentPage) >= 2 && (
							<div>
								<button onClick={() => navigatePage(1)}>
									<FiChevronsLeft size={25} color="#FFF" />
								</button>
								<button onClick={() => navigatePage(Number(currentPage - 1))}>
									<FiChevronLeft size={25} color="#FFF" />
								</button>
							</div>
						)}
						{Number(currentPage) < Number(totalPage) && (
							<div>
								<button onClick={() => navigatePage(Number(currentPage + 1))}>
									<FiChevronRight size={25} color="#FFF" />
								</button>
								<button onClick={() => navigatePage(Number(totalPage))}>
									<FiChevronsRight size={25} color="#FFF" />
								</button>
							</div>
						)}

					</div>
				</div>

			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {

	const response = await getPosts(1)
	return {
		props:
			response
		,
		revalidate: 60 * 30 // atualiza a cada 30 minutos
	}
}