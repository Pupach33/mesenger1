import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/components/firebase/firebase-config";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies()

export default function Friends({result}){
    const [friends ,setFriends] = useState([])
    useEffect(()=> {
        (async()=> {
            let user = cookies.get('uid')
          const friend = await getDoc(doc(db, "Users", `${user}`)) 
          setFriends(friend.data().friends)
        })()
    },[])
    
    return (
        <div className="people_div">
            <h1>Friends</h1>
            <ul className="list_of_friends">
                {friends.map(fre => <li className="list_of_friends_li" key={fre.uid}>{fre.name}</li>)}
            </ul>
        </div>
    )
}

