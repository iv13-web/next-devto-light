import {FC} from 'react'
import s from '../styles/Loader.module.css'

type Props = {
	show: Boolean
}

const Loader: FC<Props> = ({show}) => {
	return show ? <div className={s.loader}/> : null
}

export default Loader