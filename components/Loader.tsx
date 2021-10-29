import {FC} from 'react'

type Props = {
	show: Boolean
}

const Loader: FC<Props> = ({show}) => {
	return show ? <div className='loader'/> : null
}

export default Loader