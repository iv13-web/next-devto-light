import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {FC} from 'react'
import {IPost} from '../types'
import {convertTimestampToDate} from '../utils/postUtils'

type PostContentProps = {
	post: IPost
}

const PostContent: FC<PostContentProps> = ({post}) => {
	const createdAt = typeof post.createdAt === 'number'
		? new Date(post.createdAt)
		: post.createdAt.toDate()

	const date = convertTimestampToDate(createdAt)

	const user = (
		<Link href={`/${post.username}`}>
			<a className='text-info'>@{post.username}</a>
		</Link>
	)

	return (
		<div className='card'>
			<h1>{post?.title}</h1>
			<span className='text-sm'>
				Written by {user} on {date}
			</span>
			<ReactMarkdown>
				{post?.content}
			</ReactMarkdown>
		</div>
	)
}

export default PostContent
