import {createContext} from 'react'
import {IUser} from '../types'

type ContextProps = {
	user: IUser | null
	username: string | null
}

export const UserContext = createContext<Partial<ContextProps>>({})
