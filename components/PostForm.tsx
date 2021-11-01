import {FC} from 'react'
import ReactMarkdown from 'react-markdown'
import {useForm} from 'react-hook-form'
import s from '../styles/Admin.module.css'
import {serverTimestamp} from '../lib/firebase'
import {toast} from 'react-hot-toast'
import ImageUploader from '../components/ImageUploader'
import {IPost} from '../types'

type PostFormProps = {
	postRef: any,
	defaultValues: any,
	preview: boolean
}

const PostForm: FC<PostFormProps> = ({postRef, defaultValues, preview}) => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState,
		formState: {
			errors,
			isValid,
			isDirty
		}
	} = useForm({defaultValues, mode: 'onChange'})

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
				<ImageUploader/>
				<textarea {...register('content', {
					maxLength: {
						value: 20000,
						message: 'content is too long, nobody will read it until the end 🧐 '
					},
					minLength: {
						value: 10,
						message: 'content is too short, maybe you should focus on Twitter 🤔 (10 characters min)'
					},
					required: {
						value: true,
						message: 'content is required'
					}
				})}/>
				{errors.content && <p className='text-danger'>{errors.content.message}</p>}
				<fieldset>
					<label htmlFor='published'>Publish</label>
					<input
						id='published'
						className={s.checkbox}
						type='checkbox'
						{...register('published')}
					/>
					<button
						type='submit'
						className='btn-green'
						disabled={!isDirty || !isValid}
					>
						Save changes
					</button>
				</fieldset>
			</div>
		</form>
	)
}

export default PostForm