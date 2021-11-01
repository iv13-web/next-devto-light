import {ChangeEvent, useState} from 'react'
import Loader from './Loader'
import {auth, getUploadPercent, STATE_CHANGED, storage} from '../lib/firebase'
import {toast} from 'react-hot-toast'

export default function ImageUploader() {
	const [uploading, setUploading] = useState<boolean>(false)
	const [progress, setProgress] = useState<string>('0')
	const [downloadURL, setDownloadURL] = useState<string>()

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		// @ts-ignore
		const file = Array.from(e.target.files)[0]
		const ext = file.type.split('/')[1]
		const userId = auth.currentUser?.uid
		const ref = storage.ref(`uploads/${userId}/${Date.now()}.${ext}`)
		setUploading(true)
		const task = ref.put(file)
		task.on(STATE_CHANGED, (snapshot => {
			const percent = getUploadPercent(snapshot)
			setProgress(percent)
			// not a native Promise (no async await)
			task
				.then(() => ref.getDownloadURL())
				.then(url => {
					setDownloadURL(url)
					setUploading(false)
				})
				.then(() => {
					toast('Please, do not forget to copy and paste the generated link inside your post textarea', {
						icon: '⚠'
					})
				})
		}))
	}

	return (
		<div className='box'>
			<Loader show={uploading}/>
			{uploading && <h3>{progress}%</h3>}
			{!uploading &&
				<>
					<label htmlFor='image' className='btn'>
						📷 Upload image
						<input
							id='image'
							type='file'
							onChange={uploadFile}
							accept='image/x-png, image/gif, image/jpeg'
						/>
					</label>
				</>
			}
			{downloadURL &&
			<code className='upload-snippet'>
				{`![alt](${downloadURL})`}
			</code>
			}
		</div>
	)
}
