import {useRouter} from 'next/router'
import {SyntheticEvent, useContext, useState} from 'react'
import {UserContext} from '../context/context'
import kebabCase from 'lodash.kebabcase'
import {auth, firestore, serverTimestamp} from '../lib/firebase'
import toast from 'react-hot-toast'

export default function CreatePost() {
	const router = useRouter()
	const {username} = useContext(UserContext)
	const [title, setTitle] = useState('')

	const slug = encodeURI(kebabCase(title))

	const isValid = title.length > 3 && title.length < 100

	const createPost = async (e: SyntheticEvent) => {
		e.preventDefault()
		const uid = auth.currentUser?.uid
		const ref = firestore
			.collection('users')
			.doc(uid)
			.collection('posts')
			.doc(slug)
		const data = {
			title,
			slug,
			uid,
			username,
			published: false,
			content: '',
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			heartCount: 0
		}
		await ref.set(data)
		toast.success('Draft created successfully!')
		router.push(`admin/${slug}`)
	}

	return (
		<form onSubmit={createPost}>
			<input
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder='Print the name of your post'
			/>
			<button
				type='submit'
				disabled={!isValid}
				className='btn-green'
			>
				Create new post
			</button>
		</form>
	)
}