import {Button} from './UI/Button'
import {signInWithGoogle} from '../lib/firebase'

export default function SignInButton() {
	return (
		<Button
			className='btn-google'
			onClick={signInWithGoogle}
			image='/google.png'
		>
			Sign in with Google
		</Button>
	)
}