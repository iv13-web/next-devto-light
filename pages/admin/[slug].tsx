import AuthCheck from '../../components/AuthCheck'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {auth, firestore} from '../../lib/firebase'
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore'
import PostForm from '../../components/PostForm'
import Link from 'next/link'
import s from './Admin.module.css'

const AdminPostEdit = ({}) => {

	return (
		<AuthCheck>
			<PostManager/>
		</AuthCheck>
	)
}

export default AdminPostEdit

function PostManager() {
	const [preview, setPreview] = useState(false)
	const router = useRouter()
	const {slug} = router.query

	const postRef = firestore
		.collection('users')
		.doc(auth.currentUser?.uid)
		.collection('posts')
		.doc(slug as string)

	const [post] = useDocumentDataOnce(postRef)

	return (
		<main>
			{post &&
				<div className={s.container}>
					<section  className={s.section}>
						<h1 className='text-adaptive-header'>{post.title}</h1>
						<PostForm
							postRef={postRef}
							defaultValues={post}
							preview={preview}
						/>
					</section>
					<aside className={s.aside}>
						<h3 className={s.tools}>Tools</h3>
						<button onClick={() => setPreview(!preview)}>
							{preview ? 'Edit' : 'Preview'}
						</button>
						<Link href={`/${post.username}/${post.slug}`}>
							<button className="btn-blue">Live view</button>
						</Link>
					</aside>
				</div>
			}
		</main>
	)
}
