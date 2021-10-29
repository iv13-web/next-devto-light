import {FC} from 'react'

type Props = {
	username: string | null | undefined
	isValid: boolean
	loading: boolean
}

const UsernameMessage: FC<Props> = ({ username, isValid, loading}) => {
	if (loading) {
		return <p>Checking...</p>
	}
	if (isValid) {
		return <p className='text-success'>{username} is available</p>
	}
	if (username && username?.length < 3) {
		return <p className='text-danger'>Username should be at least 3 characters long</p>
	}
	if (username && !isValid) {
		return <p className='text-danger'>This username is already taken</p>
	}
	return null
}

export default UsernameMessage
