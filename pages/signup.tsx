import {FC, useContext, useEffect} from 'react'
import {UserContext} from '../context/context'
import UsernameForm from '../components/UsernameForm'
import {SigninForm} from '../components/SigninForm'
import {useRouter} from 'next/router'

const Signup: FC = () => {
	const {user, username} = useContext(UserContext)
	const router = useRouter()

	useEffect(() => {
		username != null && router.push('/')
	}, [username])

	return (
		<main>
			{user && !username
				? <UsernameForm/> //сделать компонент регистрации внутри paper, а не только кнопку
				: <SigninForm/>
			}
		</main>
	)
}

export default Signup