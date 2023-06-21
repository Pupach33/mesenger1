import '@/styles/globals.css'
import '@/styles/login.css'
import '@/styles/chat.css'
import '@/styles/header.css'
import '@/styles/people.css'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Login from '@/components/Login'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'


const cookies = new Cookies()

export default function App({ Component, pageProps }) {
  const [log ,setLog] = useState(false)
  const [loading ,setLodings] = useState(false)
  const router = useRouter()

  useEffect(()=> {
    router.events.on("roteChangeStart",()=> {
      setLodings(true)
    })
    router.events.on("roteChangeComplete",()=> {
      setLodings(false)
    })
  })
  
  useEffect(()=>{
    setLog(cookies.get('auth-token'))
  },[])

  if(!log){
    return <Login setLog={setLog}/>
  }else 
  return(
  <div>
    {
      loading? <img  src="/louder.gif" alt=""/> : <div> 
    <Header />
   <Component {...pageProps} /></div>
    }
   
  </div> 
  )
}
