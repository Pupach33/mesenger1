import { useEffect, useRef, useState } from "react";
import {addDoc, collection ,serverTimestamp,onSnapshot , query ,where, orderBy} from "firebase/firestore"
import {auth, db,storage } from "./firebase/firebase-config";
import { getDownloadURL,  ref ,uploadBytes } from "firebase/storage";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { v4 as uuidv4 } from 'uuid';

export default function Chat({room,theme}){
    const [newMessage , setNewMessage] = useState("")
    const [messeges , setMesseges] = useState([])
    const [show , setShow] = useState()
    const [filesPath ,setFilesPath] = useState("")
    const [file ,setFile] = useState("")
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

        if(file !== ""){
        const UrlForImage = `images/${uuidv4()}${filesPath.slice(12)}`
        const storageRef = ref(storage, `${UrlForImage}`);
         uploadBytes(storageRef,file).then((snapshot)=>{
         getDownloadURL(ref(storage, `${UrlForImage}`)).then((url) =>{
            (async() =>{
             await  addDoc(messegesRef,{
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            user_uid: auth.currentUser.uid,
            user_photo: auth.currentUser.photoURL,
            room,
            image: `${url}`
        })
            })()  
         }) 
        }) 
        setFile("")
        setFilesPath("")
        setNewMessage("")

        }else {
            if(newMessage === "") return 
            await addDoc(messegesRef,{
                text: newMessage,
                createAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                user_uid: auth.currentUser.uid,
                user_photo: auth.currentUser.photoURL,
                room,
                
        })}
        setNewMessage("")
       
    }
   
    function handleSetNewMessageEm(e){
        setNewMessage(newMessage => newMessage += e.native)
    }
    
    return (
    
    <div ref={DivRef} className="chat_box">
            <div  className="">{messeges.map((mes,inedx)=>
            <div key={inedx}   className={mes.user_uid === auth.currentUser.uid? "user": "anyone" }>
                <div key={inedx} className="user_messege_box">
                <div className={mes.user_uid === auth.currentUser.uid?"div_for_imgProfile":""}>
                 { mes.user_photo === undefined?"" : <img className="imgProfil" src={mes.user_photo} alt=""/> }
                 <h2 className="name">{mes.user} </h2> 
                 </div>
                 {mes.image === undefined? "":<img className="imageInChat" src={mes.image} />}
                 <h2 className="text">{mes.text}</h2>
            
                 </div>
            </div>
                 )}</div>
                 <div className="send_form">
            <form  onSubmit={handleSubmitForm}>
                {show && <div className="emoji"><Picker  data={data} onEmojiSelect={handleSetNewMessageEm} /> </div> }
                <input className="inputForImage" onChange={(e)=>{
                   setFilesPath(e.target.value) 
                   setFile(e.target.files[0])
                   console.log(e.target.files)
                }  }  type="file" accept=".jpg, .jpeg, .png, .gif" />
                
                <input  className="messegae_input" onChange={(e)=> setNewMessage(e.target.value)} placeholder="Type your message..." value={newMessage} type="text" />
                <button type="button" className="open_emoji" onClick={()=> setShow(!show)}  >😁</button>
                <input className="send_button" type="submit" value="send"/>
                
            </form>
            
              </div>
    </div>
    )
}
