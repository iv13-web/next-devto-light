import {FC} from 'react'
import ReactMarkdown from 'react-markdown'
import {useForm} from 'react-hook-form'
import s from '../pages/admin/Admin.module.css'
import {serverTimestamp} from '../lib/firebase'
import {toast} from 'react-hot-toast'

type PostFormProps = {
	postRef: any,
	defaultValues: any,
	preview: any
}

const PostForm: FC<PostFormProps> = ({postRef, defaultValues, preview}) => {
	const {register, handleSubmit, reset, watch} = useForm({defaultValues, mode: 'onChange'})

	const updatePost = async ({content, published}: {content: string; published: boolean}) => {
		await postRef.update({
			content,
			published,
			updatedAt: serverTimestamp()
		})
		reset({content, published})
		toast.success('Post updated successfully')
	}

	return (
		<form onSubmit={handleSubmit(updatePost)}>
			{preview &&
				<div className='card'>
					<ReactMarkdown>{watch('content')}</ReactMarkdown>
				</div>
			}
			<div className={preview ? s.hidden : s.controls}>
				<textarea {...register('content')}/>
				<fieldset>
					<label htmlFor='published'>Published</label>
					<input
						id='published'
						className={s.checkbox}
						type='checkbox'
						{...register('published')}
					/>
					<button type='submit' className='btn-green'>
						Save changes
					</button>
				</fieldset>
			</div>
		</form>
	)
}

export default PostForm