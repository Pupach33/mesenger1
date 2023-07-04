import { doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "@/components/firebase/firebase-config";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { updateProfile } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const cookies = new Cookies()

export default  function  Profile({theme}){
    const [friends ,setFriends] = useState([])
    const [edit ,setEdit] = useState(true)
    const [imageProfile ,setImageProfile] = useState("")
    const [filesPath ,setFilesPath] = useState("")
    

    const nameRef = useRef()
    
    
    useEffect(()=> {
        (async()=> {
            let user = cookies.get('uid')
          const friend = await getDoc(doc(db, "Users", `${user}`)) 
          setFriends(friend.data().friends)
        })()
    },[])
    async function handleChangeProfile(){
       await updateProfile(auth.currentUser,{
            displayName: `${nameRef.current.value === ""?auth.currentUser.displayName: nameRef.current.value}`,
           })
           if(imageProfile !== ""){
            const UrlForImage = `images/${uuidv4()}${filesPath.slice(12)}`
            const storageRef = ref(storage, `${UrlForImage}`);
            uploadBytes(storageRef,imageProfile).then((snapshot)=>{
                getDownloadURL(ref(storage, `${UrlForImage}`)).then((url) =>{
                    (async()=>{ await updateProfile(auth.currentUser,{
                        photoURL: url,
                    })})()
                })
            })
           }
           
           setEdit(true)
    }
    if(auth.currentUser === null) {
        return<div className="people_div"><h1>Loading...</h1></div> 
    }else if(auth.currentUser !== null ) {
        return (
            <div className="people_div">
                <h1 className="people_title">Your profile</h1>
                    {edit === true? (
                  <div className="profil_div">
                  <img  className="profileImg" src={auth.currentUser.photoURL !== null ? auth.currentUser.photoURL :"/avatarImage.png"}  alt="" /> 
                  <div className="profile_infi_div">
                    <div>
                  <h3> {auth.currentUser.displayName }</h3>
                  <h3> Email : {auth.currentUser.email}</h3>
                  <h3> Number : {auth.currentUser.phoneNumber !== null ? auth.currentUser.phoneNumber : "empty"}</h3>
                    </div>
                  <button className="button_save" onClick={()=>setEdit(false)}>Edit profile</button>
                  </div>
                </div>
                    ):(<div className="profile_info_edit">
                        <p className="button_choose_photo">Choose a photo {filesPath.slice(12)}</p>
                        <input className="photo_input" onChange={(e)=>{
                            setFilesPath(e.target.value)
                            setImageProfile(e.target.files[0])
                        } } type="file" />
                        <input ref={nameRef} type="text" placeholder={`${auth.currentUser.displayName}...` } />
                        <button className="button_save" onClick={handleChangeProfile}>Save changes</button>
                    </div>)}
                
                <h1>Your friends</h1>
                <ul className="list_of_friends">
                    {friends.map(fre => <li className={theme?"list_of_friends_li":"list_of_friends_li_dark"} key={fre.uid}>{fre.name}</li>)}
                </ul>
            </div>
        )
    }
    
}

