import type {NextPage} from 'next'
import Loader from '../components/Loader'
import {GetServerSideProps} from 'next'
import {firestore, fromMillis, postToJSON} from '../lib/firebase'
import {IPost} from '../types'
import {useState} from 'react'
import PostFeed from '../components/PostFeed'

const LIMIT = 10

export const getServerSideProps: GetServerSideProps = async (context) => {
	const postsQuery = firestore
		.collectionGroup('posts')
		.where('published', '==', true)
		.orderBy('createdAt', 'desc')
		.limit(LIMIT)

	const posts = (await postsQuery.get()).docs.map(postToJSON)

	return {
		props: {posts}
	}
}

type Props = {
	posts: IPost[]
}

const Home: NextPage<Props> = (props) => {
	const [posts, setPosts] = useState(props.posts)
	const [loading, setLoading] = useState(false)
	const [postsEnd, setPostsEnd] = useState(false)
	const shouldShowBtn = !loading && !postsEnd

	const getMorePosts = async () => {
		setLoading(true)
		const lastPost = posts[posts.length - 1]
		const cursor = typeof lastPost.createdAt === 'number'
			? fromMillis(lastPost.createdAt)
			: lastPost.createdAt

		const query = firestore
			.collectionGroup('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.startAfter(cursor)
			.limit(LIMIT)

		const newPosts: any[] = (await query.get()).docs.map(doc => doc.data())
		setPosts(posts.concat(newPosts))
		setLoading(false)

		if (newPosts.length < LIMIT) {
			setPostsEnd(true)
		}
	}

	return (
		<main>
			<PostFeed posts={posts} admin={false}/>
			{shouldShowBtn && <button onClick={getMorePosts}>Load more</button>}
			{postsEnd && <p className='text-center'>You have reached the end! 👏</p>}
			<Loader show={loading}/>
		</main>
	)
}

export default Home
