import PostItem from './PostItem'
import {IPost} from '../types'

const PostFeed: ({posts, admin}: { posts: IPost[]; admin: boolean }) => (JSX.Element | null) = ({posts, admin}) => {

	if (posts) {
		return (
			<>
				{posts.map(post => <PostItem post={post} key={post.slug} admin={admin}/>)}
			</>
		)
	}
	return null
}

export default PostFeed