import {auth} from '../lib/firebase'
import {useRouter} from 'next/router'
import {Button} from './UI/Button'

export default function SignoutButton() {
  const router = useRouter()

  const signout =  () => {
    auth.signOut()
    router.reload()
  }

  return (
    <Button onClick={signout}>Sign Out</Button>
  )
}