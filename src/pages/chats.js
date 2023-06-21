import Chat from "@/components/chat";
import {auth, db } from "../components/firebase/firebase-config";
import {getDoc, doc, getDocs, collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies()


export default function PrivateChats(){
    const [privet ,setPrivet] = useState([])
    const [room ,setRoom] = useState(null)
    const [generalChats ,setGeneralChats] = useState([])
    useEffect(()=> {
        let user = cookies.get('uid')
        if(user !== undefined || user !== null){
         (async()=>{
          const chats = await getDoc(doc(db, "Users", `${user}`)) 
         if(chats.data().chats){
            setPrivet(chats.data().chats)
         }else setPrivet([])
          
        })() 
        }else if(auth === null ) {
          return null
        } 
      },[])
      useEffect(()=>{     
        (async()=>{
         const querySnapshot = await getDocs(collection(db , "chats"))
         let mes = []
         querySnapshot.forEach(quer=> {
           mes.push({...quer.data(), id:quer.id})
         })
         setGeneralChats(mes) 
        })() 
      },[])
      return (
    
        <div className="search_room"> 
            {room ? 
      <div className="chat">
        <Chat room={room} />
        <button onClick={()=> setRoom(null)} className="exit_button">Search room</button>
      </div> :
      <div>
      <div className="general_chat">
          <h1>General chat</h1>
        {generalChats.map(chat=> <button className="rooms_button" onClick={()=> setRoom(chat.room)}>{chat.room}</button>)}
      </div>
        
         <h1>Private Chats</h1>
        {privet.map(chat => <button className="rooms_button" onClick={()=> setRoom(chat.room)}>{chat.name}</button>)}
        </div>    
        }
          </div>
     
      )
}