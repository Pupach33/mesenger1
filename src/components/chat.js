import { useEffect, useRef, useState } from "react";
import {addDoc, collection ,serverTimestamp,onSnapshot , query ,where, orderBy} from "firebase/firestore"
import {auth, db } from "./firebase/firebase-config";

export default function Chat({room}){
    const [newMessage , setNewMessage] = useState("")
    const [messeges , setMesseges] = useState([])
    const [name , setName] = useState()
    const inputRef = useRef()
    const messegesRef = collection(db , "messeges")

    useEffect(()=>{
    const querryMessages = query(messegesRef ,where("room","==", room),orderBy("createAt"))
    const unsubscrive =   onSnapshot(querryMessages,(snapshot)=> {
            let mes = []
           
            snapshot.forEach((doc)=>{
                mes.push({...doc.data(), id:doc.id})
                
            })
            setMesseges(mes) 
            setName(()=> {
                let mas = mes.map(mes => mes.user)
                let nameSet = new Set (mas)
                return nameSet
                
            })
        })

        return () => unsubscrive()

        
    },[])
  
    
   async function handleSubmitForm(e){
        e.preventDefault();
        if(newMessage === "") return

        await addDoc(messegesRef,{
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })

        setNewMessage("")
    }
   
    
    return (
    
    <div className="chat_box">
            <h1>Chat name : {room} </h1>
            <div className="">{messeges.map((mes,inedx)=>
            <div  className={mes.user === auth.currentUser.displayName? "user": "anyone" }>
                <div key={inedx} className="user_messege_box">
                 <h2 className="name">{mes.user} </h2> 
                 <h2 className="text">{mes.text}</h2>
                 </div>
            </div>
                 )}</div>
            <form className="send_form" onSubmit={handleSubmitForm}>
                <input ref={inputRef} className="messegae_input" onChange={(e)=> setNewMessage(e.target.value)} placeholder="Type your message..." value={newMessage} type="text" />
                <input className="send_button" type="submit" value="send"/>
            </form>
    </div>
    )
}