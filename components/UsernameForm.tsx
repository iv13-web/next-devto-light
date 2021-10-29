import {ChangeEvent, FC, useCallback, useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/context'
import {firestore} from '../lib/firebase'
import {debounce} from '../utils/debounce'
import UsernameMessage from './UsernameMessage'

const UsernameForm: FC = () => {
	const {user, username} = useContext(UserContext)
	const [value, setValue] = useState('')
	const [isValid, setIsValid] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event: any) => {
		event.preventDefault()
		const userDoc = firestore.doc(`users/${user?.uid}`)
		const usernameDoc = firestore.doc(`usernames/${value}`)

		const batch = firestore.batch()
		batch.set(userDoc, {username: value, photoURL: user?.photoURL, displayName: user?.displayName})
		batch.set(usernameDoc, {uid: user?.uid})

		await batch.commit()
	}

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
				setIsValid(!exists)
				setLoading(false)
			}
		}, 500),
		[]
	)

	return !username ? (
		<section>
			<h3>Choose Username</h3>
			<form onSubmit={handleSubmit}>
				<input
					autoComplete='off'
					name='username'
					placeholder='username'
					value={value}
					onChange={handleChange}
				/>
				<UsernameMessage  isValid={isValid} loading={loading} username={value}/>
				<button type='submit' className='btn-green' disabled={!isValid}>
					Choose
				</button>
			</form>
		</section>
	) : null
}

export default UsernameForm