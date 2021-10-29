import {FC, useCallback, useContext, useEffect, useState, ChangeEvent} from 'react'
import {auth, firestore, googleAuthProvider} from '../lib/firebase'
import {UserContext} from '../context/context'
import {debounce} from '../utils/debounce'

const Signup: FC = ({}) => {
	const {user, username} = useContext(UserContext)

	return (
		<main>
			{user ?
				username == null ? <UsernameForm/> : <SignOutButton/>
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
		<button className='btn-google' onClick={signInWithGoogle}>
			<img src='/google.png'/> Sign in with Google
		</button>
	)
}

function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {
	const {user, username} = useContext(UserContext)
	const [value, setValue] = useState('')
	const [isValid, setIsValid] = useState(false)
	const [loading, setLoading] = useState(false)

	// const handleSubmit = e => {
	//
	// }

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const enteredName = e.target.value.toLowerCase()
		const regExp = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
		if (enteredName.length < 3) {
			setValue(enteredName)
			setLoading(false)
			setIsValid(false)
		}
		if (regExp.test(enteredName)) {
			setValue(enteredName)
			setLoading(true)
			setIsValid(false)
		}
	}

	useEffect(() => {
		checkUsername(value)
	}, [value])

	const checkUsername = useCallback(
		debounce(async (username: string) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`)
				const {exists} = await ref.get()
				console.log('Firestore read executed!')
				setIsValid(!exists)
				setLoading(false)
			}
		}, 500),
		[]
	)

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form>
					<input
						name='username'
						placeholder='username'
						value={value}
						onChange={handleChange}
					/>
					<button type='submit' className='btn-green' disabled={!isValid}>
						Choose
					</button>
				</form>
			</section>
		)
	)
}

export default Signup