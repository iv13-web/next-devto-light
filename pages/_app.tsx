import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Navbar from '../components/Navbar'
import {Toaster} from 'react-hot-toast'
import {UserContext} from '../context/context'
import {useUserData} from '../hooks/useUserData'

export default function MyApp({Component, pageProps}: AppProps) {
	const userData = useUserData()

	return (
		<UserContext.Provider value={userData}>
			<Navbar/>
			<Component {...pageProps} />
			<Toaster/>
		</UserContext.Provider>
	)
}
