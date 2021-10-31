export default function Custom404() {
	return (
		<main>
			<h1	className='text-adaptive-header text-center'>404 - This page does not seem to exist...</h1>
			<div style={{
				height: 400,
				pointerEvents: 'none',
			}}>
				<iframe
					src="https://giphy.com/embed/jcxtvm2bsZDH2"
					width="100%"
					height="80%"
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		</main>
	)
}