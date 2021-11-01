import {useEffect, useRef} from "react"

export default function useUpdatedEffect(callback: Function, dependencies: Array<any>) {
	const firstRenderRef = useRef(true)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}
		return callback()
	}, dependencies)
}
