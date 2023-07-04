import {auth, provider ,db} from './firebase/firebase-config'
import {addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { useRef, useState } from 'react'
import { doc, updateDoc , setDoc ,arrayUnion ,arrayRemove } from "firebase/firestore"; 
import Cookies from 'universal-cookie'

const cookies = new Cookies()



export default function Login({setLog}){
 const [login , setLogin] = useState(false)
  const [message , setMessage] = useState("")
 const handleNameRef = useRef()
 const handleEmailRef = useRef()
 const handlePasswordRef = useRef()
 const handleSecPasswordRef = useRef()

    async function signWithGoogle(){
        try{
            const result =  await signInWithPopup(auth, provider)
            cookies.set("auth-token",result.user.refreshToken)             
            cookies.set("uid",result.user.uid)             
          setLog(true)
        } catch(e){
            console.error(e)
        }  
    }
   async function regWithGoogle(){
        try{
            const result =  await signInWithPopup(auth, provider)
            cookies.set("auth-token",result.user.refreshToken)
            cookies.set("uid",result.user.uid)  
            await setDoc(doc(db,"Users", `${result.user.uid}` ),{
                name: result.user.displayName,
                uid: result.user.uid,
                chats: [],
                friends: []
            },{ merge: true })
            
          setLog(true)
        } catch(e){
            console.error(e)
        }  
    }
    async function handleRegFormSubmit(e){
        e.preventDefault()
        if(handlePasswordRef.current.value === handleSecPasswordRef.current.value){
           const result = await createUserWithEmailAndPassword(auth,handleEmailRef.current.value , handlePasswordRef.current.value )
           updateProfile(auth.currentUser,{
            displayName: `${handleNameRef.current.value}`
           })
           cookies.set("auth-token",result.user.refreshToken)
           cookies.set("uid",result.user.uid)  
            await setDoc(doc(db,"Users", `${result.user.uid}` ),{
            name: handleNameRef.current.value,
            uid: result.user.uid,
            chats: [],
            friends: []
            },{ merge: true })
          setLog(true) 
        }else {
            setMessage("An correct password")
        }
        
    }
    async function handleLogFormSubmit(e){
        e.preventDefault()
        const result = await signInWithEmailAndPassword (auth,handleEmailRef.current.value , handlePasswordRef.current.value)
            cookies.set("auth-token",result.user.refreshToken)             
            cookies.set("uid",result.user.uid)             
          setLog(true)
    }
     

    return (
        <div className="Login">
            {login? <div className='login_div'>
        <h1 className='logText'>Login</h1>
               <form onSubmit={handleLogFormSubmit} className='login_input'>
                <input className='input_for_log' ref={handleEmailRef} type='email' placeholder='email' />
                <input className='input_for_log' ref={handlePasswordRef} type='password' placeholder='password' />
                <input className='regButton' type='submit' value="login" />
               </form>
                
       
                <p>And you can login with <button className='buttonLog' onClick={signWithGoogle}>Google</button> or <button onClick={()=> setLogin(!login)} className='buttonLog'>registration</button> </p>
         </div> : 

         <div className='login_div'>
         <h1 className='logText'>Registration</h1>
         <form className='login_input' onSubmit={handleRegFormSubmit}>
                <input className='input_for_log' ref={handleNameRef} type='text' placeholder='name' />
                <input className='input_for_log' ref={handleEmailRef} type='email' placeholder='email' />
                <input className='input_for_log' ref={handlePasswordRef} type='password' placeholder='password' />
                <input className='input_for_log' ref={handleSecPasswordRef} type='password' placeholder='password' />
                <input className='regButton' type='submit' value="regisrtation" />
                {message}
         </form>
        
         <p className='text_under_input_log'> And you can regestration with <button className='buttonLog' onClick={regWithGoogle}>Google</button> or <button onClick={()=> setLogin(!login)} className='buttonLog'>login</button> </p>
         </div>}     
        </div>
    )
}