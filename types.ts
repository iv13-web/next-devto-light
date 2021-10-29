import firebase from 'firebase/app'

export interface IUser extends Omit<firebase.UserInfo, 'photoURL'> {
	username: string | null | undefined
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
