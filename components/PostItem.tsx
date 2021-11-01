import React, {FC} from 'react'
import {IPost} from '../types'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {countMinutesToRead, countWords} from '../utils/postUtils'

type Props = {
	post: IPost
	admin: boolean
}

const PostItem: FC<Props> = ({post, admin = false}) => {
	const router = useRouter()
	const wordCount = countWords(post?.content)
	const minutesToRead = countMinutesToRead(wordCount)
	const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation()

	return (
		<div
			className='card-clickable'
			onClick={() => router.push(`/${post.username}/${post.slug}`)}
		>
			<Link href={`/${post.username}`}>
				<a onClick={stopPropagation}>
					<p><strong className='text-hover'>By @{post.username}</strong></p>
				</a>
			</Link>
			<h2>
				<Link href={`/${post.username}/${post.slug}`}>
					<a onClick={stopPropagation}>
						{post.title}
					</a>
				</Link>
			</h2>
			<footer>
				<span>
					{wordCount} words / {minutesToRead} min
				</span>
				<span> 💗 {post.heartCount} Hearts</span>
			</footer>
			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<a onClick={stopPropagation}>
							<button className="btn-blue">Edit</button>
						</a>
					</Link>
					{post.published
						? <p className="text-success">Published</p>
						: <p className="text-danger">Unpublished</p>
					}
				</>
			)}
		</div>
	)
}

export default PostItem