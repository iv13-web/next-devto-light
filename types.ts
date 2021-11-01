import firebase from 'firebase/app'
import {Message, Validate, ValidationRule} from 'react-hook-form'

export interface IUser extends Omit<firebase.User, 'photoURL'> {
	username: string | null
	photoURL: string | undefined
}

export interface IPost {
	content: string
	createdAt: any
	heartCount: number
	published: boolean
	slug: string
	title: string
	uid: string
	updatedAt: string
	username: string
}