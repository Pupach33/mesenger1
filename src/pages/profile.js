import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/components/firebase/firebase-config";
import { memo, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { updateProfile } from "firebase/auth";
const cookies = new Cookies()

export default  function  Profile(){
    const [friends ,setFriends] = useState([])
    const [edit ,setEdit] = useState(true)
   

    const nameRef = useRef()
    const imageRef = useRef()
    
    useEffect(()=> {
        (async()=> {
            let user = cookies.get('uid')
          const friend = await getDoc(doc(db, "Users", `${user}`)) 
          setFriends(friend.data().friends)
        })()
    },[])
    async function handleChangeProfile(){
       await updateProfile(auth.currentUser,{
            displayName: `${nameRef.current.value}`,
            photoURL: `${imageRef.current.value}`
           })
           setEdit(true)
    }
    if(auth.currentUser === null) {
        return<div className="people_div"><h1>Loading...</h1></div> 
    }else if(auth.currentUser !== null ) {
        return (
            <div className="people_div">
                <h1>Your profile</h1>
                    {edit === true? (
                  <div className="profil_div">
                  <img  className="profileImg" src={auth.currentUser.photoURL !== null ? auth.currentUser.photoURL :"/avatarImage.png"}  alt="" /> 
                  <div className="profile_infi_div">
                  <h3> {auth.currentUser.displayName }</h3>
                  <h3> Email : {auth.currentUser.email}</h3>
                  <h3> Number : {auth.currentUser.phoneNumber !== null ? auth.currentUser.phoneNumber : "empty"}</h3>
                  <button className="button_save" onClick={()=>setEdit(false)}>Edit profile</button>
                    </div>
                    </div>
                    ):(<div className="profile_info_edit">
                        <input ref={imageRef} type="text" placeholder="url photo"  />
                        <input ref={nameRef} type="text" placeholder={`${auth.currentUser.displayName}...` } />
                        <button className="button_save" onClick={handleChangeProfile}>save changes</button>
                    </div>)}
                
                <h1>Your friends</h1>
                <ul className="list_of_friends">
                    {friends.map(fre => <li className="list_of_friends_li" key={fre.uid}>{fre.name}</li>)}
                </ul>
            </div>
        )
    }
    
}

