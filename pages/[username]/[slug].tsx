import {GetStaticProps, GetStaticPaths} from 'next'
import {firestore, getUserWithUsername, postToJSON} from '../../lib/firebase'
import {ParsedUrlQuery} from 'querystring'
import s from '../../styles/Post.module.css'
import {FC} from 'react'
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {IPost} from '../../types'
import PostContent from '../../components/PostContent'
import AuthCheck from '../../components/AuthCheck'
import {HeartButton} from '../../components/HeartButton'
import Link from 'next/link'

interface IParams extends ParsedUrlQuery {
	username: string
	slug: string
}

export const getStaticProps: GetStaticProps = async ({params}) => {
	const {username, slug} = params as IParams
	const userDoc = await getUserWithUsername(username)
	let post
	let path

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(slug)
		post = postToJSON(await postRef.get())
		path = postRef.path
	}

	return {
		props: {post, path},
		revalidate: 5000
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const snapshot = await firestore.collectionGroup('posts').get()

	const paths = snapshot.docs.map(doc => {
		const {slug, username} = doc.data()
		return {
			params: {username, slug}
		}
	})
	return {
		paths,
		fallback: 'blocking'
	}
}

type PostProps = {
	path: string
	post: IPost
}

const Post: FC<PostProps> = (props) => {
	const postRef = firestore.doc(props.path)
	const [realtimePost] = useDocumentData(postRef)
	const post = realtimePost || props.post

	return (
		<main className={s.container}>
			<section>
				<PostContent post={post as IPost}/>
			</section>
			<aside className='card'>
				<p>
					<strong> {post.heartCount || 0} ❤</strong>
				</p>
				<AuthCheck fallback={
					<Link href='/signup'>
						<button>💗 Sign up</button>
					</Link>
				}>
					<HeartButton postRef={postRef}/>
				</AuthCheck>
			</aside>
		</main>
	)
}

export default Post