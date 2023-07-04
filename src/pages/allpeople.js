import { collection, getDocs ,doc, updateDoc ,arrayUnion, arrayRemove, getDoc   } from "firebase/firestore";
import { db } from "@/components/firebase/firebase-config";
import { useEffect, useState } from "react";
import { auth } from "@/components/firebase/firebase-config";
import Cookies from "universal-cookie";
const cookies = new Cookies()



export default function AllPeople({theme}){
const [people ,setPeople ] = useState([])
const [friends ,setFriends] = useState([])
    useEffect(()=> {
        (async()=> {
           const querySnapshot = await getDocs(collection(db , "Users"))
           let mes = []
           querySnapshot.forEach((doc)=> {
            mes.push({...doc.data(), id:doc.id})
           })
           setPeople(mes)
        })()
    },[])
    useEffect(()=> {
       
        (async ()=> {
            let user = cookies.get('uid')
           const queryFr = await getDoc(doc(db, "Users",`${user}`))
        if(queryFr){
            let res = queryFr.data().friends.map(fr => fr.uid)
            
          setFriends(res)  
        }else setFriends([]) 
        })()
        
    },[])
    async function addFriends(id,name){
        alert(`${name} добавлен в друзья`)
        await(updateDoc(doc(db, "Users", `${auth.currentUser.uid}`),{
            friends: arrayUnion({
                name: name,
                uid: id
            }),
            chats: arrayUnion({
              room:auth.currentUser.uid + id,
              name: name
            })
        }))
        await(updateDoc(doc(db, "Users", `${id}`),{
            friends: arrayUnion({
              name: auth.currentUser.displayName,
              uid: auth.currentUser.uid
            }),
            chats: arrayUnion({
                room: auth.currentUser.uid + id,
                name: auth.currentUser.displayName
            })
        }))
    }
   
    return (
        <div className="people_div"> 
        <h1 className="people_title">All People</h1>
            <ul className="list_of_friends">
                {people.map(people => {
                    if(people.uid !== auth.currentUser.uid ){
                        return(
                          <li className={theme?"list_of_people_li_dark":"list_of_people_li_ligth"} key={people.uid}>
                          {people.name}
                          {friends.includes(people.uid)? <h1 className={theme?"inFriends_dark":"inFriends_ligth"}>In friends</h1>:<button className="addFriends" onClick={()=>addFriends(people.uid , people.name)}>addFriends</button>}
                         </li>   
                        )
                    }
                   
                } )}
            </ul>
        </div>
    )
}