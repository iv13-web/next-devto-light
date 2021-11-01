import Link from 'next/link'
import {useContext} from 'react'
import {UserContext} from '../context/context'
import s from '../styles/Navbar.module.css'
import SignoutButton from './SignoutButton'

const Navbar = ({}) => {
	const {user, username} = useContext(UserContext)

	return (
		<nav className={s.navbar}>
		<div className={s.container}>
			<ul>
				<li>
					<Link href='/'>
						<button className="btn-logo">NEXT 🔥</button>
					</Link>
				</li>
				{username && (
					<>
						<li className="push-left">
							<SignoutButton/>
						</li>
						<li>
							<Link href='/admin'>
								<button className="btn-blue">Your Posts</button>
							</Link>
						</li>
						<li className={s.avatar}>
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
		</div>
		</nav>
	)
}

export default Navbar