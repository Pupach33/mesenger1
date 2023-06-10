import Login from "@/components/Login"
import { useEffect, useState,useRef } from "react"
import Cookies from 'universal-cookie'
import Chat from "@/components/chat"
import {auth, db } from "../components/firebase/firebase-config";
import {addDoc, collection ,serverTimestamp,onSnapshot , query ,where, orderBy} from "firebase/firestore"


const messegesRef = collection(db , "chats")

const cookies = new Cookies()

export default function Home() {
  const [log ,setLog] = useState(false)
  const [room ,setRoom] = useState(null)
  const [chatss ,setChats] = useState([])
  const [search,setSearch] = useState([])
  const [roomInput ,setRoomInput] = useState("")

  useEffect(()=>{
    setLog(cookies.get('auth-token'))
  },[])
  useEffect(()=>{
    const querryChats = query(messegesRef)
    const unsubscrive =  onSnapshot(querryChats,(snapshot)=> {
            let mes = []
           
            snapshot.forEach((doc)=>{
                mes.push({...doc.data(), id:doc.id})
                
            })
            setChats(mes) 
            setSearch(mes)
          
        })

        return () => unsubscrive()

        
    },[])
    function handleSearch(){
      if(roomInput === undefined || roomInput === "" || roomInput === null){
        setSearch(chatss)
      }else {
       let sear = search.filter(({room}) => room.toLowerCase().includes(roomInput.toLowerCase()))
      setSearch(sear) 
      }
      
    }
    // if (findCategory === "All" && findcountry === "All") {
    //   return items.filter(({ name }) =>
    //     name.toLowerCase().includes(findname.toLowerCase())
    //   );
    console.log(roomInput, "sdsdsd")
    console.log(chatss, "chatss")

  if(!log){
    return (
    <>
      <Login setLog={setLog}/>
    </>
  )
  }


  return (
  <div className="search_room">
      {room ? 
      <div className="chat">
        <Chat room={room} />
        <button onClick={()=> setRoom(null)} className="exit_button">Serach room</button>
      </div> :
        <div className="room">
        <h1 className="room_text">Enter room name</h1>
        <input className="input_room" onChange={(e)=> setRoomInput(e.target.value)} type="text" />
        <button className="button_room" onClick={handleSearch} >Search</button>
        <div>
          {search.map(chat=> <button className="rooms_button" onClick={()=> setRoom(chat.room)}>{chat.room}</button>)}
          
          </div>
        </div>
        }
    </div>
    
  )
  
}
