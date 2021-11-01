import PostItem from './PostItem'
import {IPost} from '../types'
import {FC} from 'react'

type PostFeedProps = {
	posts: IPost[],
	admin: boolean
}

const PostFeed: FC<PostFeedProps> = ({posts, admin}): (JSX.Element | null) => {

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