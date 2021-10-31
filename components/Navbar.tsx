import Link from 'next/link'
import {useContext} from 'react'
import {UserContext} from '../context/context'
import {useRouter} from 'next/router'
import {auth} from '../lib/firebase'

const Navbar = ({}) => {
	const {user, username} = useContext(UserContext)
	const router = useRouter()

	const signOut =  () => {
		auth.signOut()
		router.reload()
	}

	return (
		<nav className='navbar'>
			<ul>
				<li>
					<Link href='/'>
						<button className="btn-logo">NEXT 🔥</button>
					</Link>
				</li>
				{username && (
					<>
						<li className="push-left">
							<button onClick={signOut} className='hide-mobile'>Sign Out</button>
						</li>
						<li>
							<Link href="/admin">
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						<li className='avatar'>
							<Link href={`/${username}`}>
								<img src={user?.photoURL || '/hacker.png'}/>
							</Link>
						</li>
					</>
				)}
				{!username && (
					<li>
						<Link href='/signup'>
							<button className="btn-blue">Log in</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Navbar