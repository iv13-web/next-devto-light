import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {FC} from 'react'
import {IPost} from '../types'
import {convertTimestampToDate} from '../utils/postUtils'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import CodeBlock from './CodeBlock'

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
			<ReactMarkdown components={CodeBlock}>
				{post.content}
			</ReactMarkdown>
		</div>
	)
}

export default PostContent


/*
<ReactMarkdown
				children={post?.content}
				components={{
					code({node, inline, className, children, ...props}) {
						const match = /language-(\w+)/.exec(className || '')
						return !inline && match ? (
							<SyntaxHighlighter
								children={String(children).replace(/\n$/, '')}
								style={darcula}
								language={match[1]}
								PreTag="div"
								{...props}
							/>
						) : (
							<code className={className} {...props}>
								{children}
							</code>
						)
					}
				}}
			/>
*/