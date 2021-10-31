import {FC, useContext} from 'react'
import {auth, signInWithGoogle} from '../lib/firebase'
import {UserContext} from '../context/context'
import UsernameForm from '../components/UsernameForm'
import {Button} from '../components/UI/Button'
import {SigninForm} from '../components/SigninForm'

const Signup: FC = ({}) => {
	const {user, username} = useContext(UserContext)

	return (
		<main>
			{user
				? !username ? <UsernameForm/> : <SignOutButton/> //сделать компонент регистрации внутри paper, а не только кнопку
				: <SigninForm/>
			}
		</main>
	)
}

export function SignInButton() {
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

export function SignOutButton() {
	return <Button onClick={auth.signOut}>Sign Out</Button>
}

export default Signup