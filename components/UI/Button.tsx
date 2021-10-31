import {FC, ReactNode, MouseEventHandler} from 'react'

type ButtonProps = {
	className?: string
	onClick?: MouseEventHandler
	image?: string
	children: ReactNode
}

export const Button: FC<ButtonProps> = ({className, onClick, image, children}) => {
	return (
		<button className={className} onClick={onClick}>
			{image && <img src={image}/>}
			{children}
		</button>
	)
}