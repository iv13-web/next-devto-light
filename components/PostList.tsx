import {auth, firestore} from '../lib/firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import {IPost} from '../types'
import PostFeed from './PostFeed'

export default function PostList() {
	const ref = firestore
		.collection('users')
		.doc(auth.currentUser?.uid)
		.collection('posts')

	const query = ref.orderBy('createdAt')
	const [querySnapshot] = useCollection(query)
	const posts = querySnapshot?.docs.map(doc => doc.data()) as IPost[]

	return (
		<>
			<h1 className='text-adaptive-header'>Manage your posts</h1>
			<PostFeed posts={posts} admin/>
		</>
	)
}
