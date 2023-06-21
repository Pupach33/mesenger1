import Link from "next/link";
import { auth } from "./firebase/firebase-config";

export default function Header(){
  
      return (
        <div className="header">
            <Link href="/">Main</Link>
            <Link href="/chats">Private Chats</Link>
            <Link href="/allpeople">AllPeople</Link>
            <Link href="/friends">YourFriends</Link>
        </div>
    )  
    
    
}