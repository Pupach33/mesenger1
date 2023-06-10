import {auth, provider} from './firebase/firebase-config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { useRef, useState } from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()



export default function Login({setLog}){
    const [trues ,setTrues] = useState(false)

 const handleNameRef = useRef()
 const handlePasswordRef = useRef()

    async function signWithGoogle(){
        try{
            const result =  await signInWithPopup(auth, provider)
            cookies.set("auth-token",result.user.refreshToken) 
            setLog(true)
        } catch(e){
            console.error(e)
        }
      
    }
    // async function handleFormSubmit(e){
    //     e.preventDefault()
    //     const result = await createUserWithEmailAndPassword(auth,handleNameRef.current.value , handlePasswordRef.current.value)
    //     cookies.set("auth-token",result.user.refreshToken)
    //     setLog(true)
    // }
    //  const text = "text"
    //  const text2 = "password" 
     

    return (
        <div className="Login">
            <h1 className='sign'>Sign in with Google </h1>
            {/* <form onSubmit={handleFormSubmit}>
                <input ref={handleNameRef} type='text' placeholder='name' />
                <input ref={handlePasswordRef} type={trues?text:text2} placeholder='password' />
                <button onClick={()=>setTrues(!trues)}>view pass</button>
                <input type="submit" value="Login" />
            </form> */}
            
            <button className='buttonLog' onClick={signWithGoogle}>Sign In With Google </button>
        </div>
    )
}