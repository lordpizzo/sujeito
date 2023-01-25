import { getPrismicClient } from '@/services/prismic'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

export default async function getPosts(pageNumber: number) {
	const prismic = getPrismicClient()
	const response = await prismic.query([
		Prismic.Predicates.at('document.type', 'post'),
	], {
		orderings: '[document.last_publication_date desc]',
		fetch: ['post.title', 'post.description', 'post.cover'],
		pageSize: 3,
		page: String(pageNumber)
	})

	const posts = response.results.map((post) => {
		return {
			title: RichText.asText(post.data.title),
			description: post.data.description.find(content => content.type === 'paragraph')?.text ?? '',
			cover: post.data.cover.url,
			updateAt: new Date(post.last_publication_date!).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric',
			}),
			slug: post.uid
		}
	})

	return {
		posts,
		page: response.page,
		totalPage: response.total_pages
	}
}