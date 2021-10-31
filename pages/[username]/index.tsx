import {GetServerSideProps} from 'next'
import UserProfile from '../../components/UserProfile'
import PostFeed from '../../components/PostFeed'
import {IPost, IUser} from '../../types'
import {FC} from 'react'
import {getUserWithUsername, postToJSON} from '../../lib/firebase'

type Props = {
	user: IUser
	posts: IPost[]
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const {username} = query
	const userDoc = await getUserWithUsername(username)
	let user = null
	let posts = null

	if (userDoc) {
		user = userDoc.data()
		const postsQuery = userDoc.ref
			.collection('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.limit(5)
		posts = (await postsQuery.get()).docs.map(postToJSON)
	}

	return {
		props: {user, posts}
	}
}

const UserProfilePage: FC<Props> = ({user, posts}) => {

	return (
		<main>
			<UserProfile user={user}/>
			<PostFeed posts={posts} admin={false}/>
		</main>
	)
}

export default UserProfilePage
