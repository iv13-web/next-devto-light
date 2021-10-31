import {createContext} from 'react'
import firebase from 'firebase/app'

type ContextProps = {
	user: firebase.User | null | undefined
	username: string | null
}

export const UserContext = createContext<ContextProps>({
	user: null,
	username: null
})
