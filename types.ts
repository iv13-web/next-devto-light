import firebase from 'firebase/app'

export interface IUser extends Omit<firebase.User, 'photoURL'> {
	username: string | null
	photoURL: string | undefined
}

export interface IPost {
	content: string
	createdAt: string | number
	heartCount: number
	published: boolean
	slug: string
	title: string
	uid: string
	updatedAt: string
	username: string
}
