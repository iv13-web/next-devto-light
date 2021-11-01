import React, {FC, useContext} from 'react'
import {UserContext} from '../context/context'
import AuthCheckFallback from './AuthCheckFallback'

type AuthCheckProps = {
	children: React.ReactNode
	fallback?: any
}

const AuthCheck: FC<AuthCheckProps> = ({children, fallback}) => {
	const {username} = useContext(UserContext)

	return username
		? children
		: fallback || <AuthCheckFallback/>

}

export default AuthCheck
