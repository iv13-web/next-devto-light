import {createContext} from 'react'
import firebase from 'firebase/app'

type ContextProps = {
	user: firebase.User | null
	username: string | null
}

export const UserContext = createContext<Partial<ContextProps>>({})