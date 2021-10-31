import {FC, useContext} from 'react'
import {auth, googleAuthProvider} from '../lib/firebase'
import {UserContext} from '../context/context'
import UsernameForm from '../components/UsernameForm'
import Paper from '../components/Paper'

const Signup: FC = ({}) => {
	const {user, username} = useContext(UserContext)

	return (
		<main>
			{user ?
				!username ? <UsernameForm/> : <SignOutButton/>
				:
				<SignInButton/>
			}
		</main>
	)
}

function SignInButton() {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider)
	}
	return (
		<Paper>
			<button className='btn-google' onClick={signInWithGoogle}>
				<img src='/google.png'/> Sign in with Google
			</button>
		</Paper>
	)
}

function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>
}

export default Signup