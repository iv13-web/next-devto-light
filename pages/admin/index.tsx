import AuthCheck from '../../components/AuthCheck'
import CreatePost from '../../components/CreatePost'
import PostList from '../../components/PostList'

export default function AdminPage() {
	return (
		<main>
			<AuthCheck>
				<PostList/>
				<CreatePost/>
			</AuthCheck>
		</main>
	)
}

