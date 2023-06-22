import { useEffect, useRef, useState } from "react";
import {addDoc, collection ,serverTimestamp,onSnapshot , query ,where, orderBy} from "firebase/firestore"
import {auth, db } from "./firebase/firebase-config";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Chat({room}){
    const [newMessage , setNewMessage] = useState("")
    const [messeges , setMesseges] = useState([])
    const [name , setName] = useState()
    const [show , setShow] = useState()
    const messegesRef = collection(db , "messeges")
     const DivRef = useRef()
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
   
    useEffect(() => {
      if (DivRef.current) {
        DivRef.current.scrollTop = DivRef.current.scrollHeight;
      }
    }, [messeges]);
  
    
   async function handleSubmitForm(e){
        e.preventDefault();
        if(newMessage === "") return

        await addDoc(messegesRef,{
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            user_uid: auth.currentUser.uid,
            user_photo: auth.currentUser.photoURL,
            room,
        })

        setNewMessage("")
    }
   
    function handleSetNewMessageEm(e){
        setNewMessage(newMessage => newMessage += e.native)
    }
    return (
    
    <div ref={DivRef} className="chat_box">
            <div  className="">{messeges.map((mes,inedx)=>
            <div  className={mes.user_uid === auth.currentUser.uid? "user": "anyone" }>
                <div key={inedx} className="user_messege_box">
                 {mes.user_photo !== null || mes.user_photo !== undefined? <img className="imgProfil" src={mes.user_photo} alt=""/>: ""}
                 <h2 className="name">{mes.user} </h2> 
                 <h2 className="text">{mes.text}</h2>
            
                 </div>
            </div>
                 )}</div>
                 <div className="send_form">
            <form  onSubmit={handleSubmitForm}>
                {show && <div className="emoji"><Picker  data={data} onEmojiSelect={handleSetNewMessageEm} /> </div> }
                <input  className="messegae_input" onChange={(e)=> setNewMessage(e.target.value)} placeholder="Type your message..." value={newMessage} type="text" />
                <button type="button" className="open_emoji" onClick={()=> setShow(!show)}><p className="open_emoji_text">😀</p></button>
                <input className="send_button" type="submit" value="send"/>
                
            </form>
            
              </div>
    </div>
    )
}
