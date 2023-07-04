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
  const [theme ,setTheme] = useState(true)
  const [click ,setClick] = useState(0)
  const router = useRouter()

  useEffect(()=> {
    router.events.on("roteChangeStart",()=> {
      setLodings(true)
    })
    router.events.on("roteChangeComplete",()=> {
      setLodings(false)
    })
  })
  console.log(theme)
  useEffect(()=>{
    setTheme(cookies.get('theme'))
    setLog(cookies.get('auth-token'))
  },[])
  function changeTheme(){
    const themeForSession = !theme
   setTheme(!theme)
   setClick(click + 1)
   cookies.set("theme",themeForSession)
  }
 console.log(click)
  if(!log){
    return <Login setLog={setLog}/>
  }else 
  return(
  <div className={theme?'dark':'ligth'}>
    {
      loading? <img  src="/louder.gif" alt=""/> : <div> 
    <Header click={click} theme={theme} onChangeTheme={changeTheme} />
    <Component theme={theme} {...pageProps} /></div>
    
    }
   
  </div> 
  )
}
