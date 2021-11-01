import {toast} from 'react-hot-toast'
import {useRouter} from 'next/router'

const DeletePostButton = ({postRef}: any) => {
	const router = useRouter()

	const deletePost = async () => {
		const doIt = confirm('Are you sure?')
		if (doIt) {
			await postRef.delete()
			router.push('/admin')
			toast('post annihilated ', { icon: '🗑️' })
		}
	}

	return (
		<button className="btn-red" onClick={deletePost}>
			Delete
		</button>
	)
}

export default DeletePostButton
