import Login from "@/components/Login"
import { useEffect, useState,useRef } from "react"
import Chat from "@/components/chat"
import {auth, db } from "../components/firebase/firebase-config";
import {getDocs,getDoc, collection,doc } from "firebase/firestore"





export default function Home() {
  

 

  return (
  <div className="search_room">
      <h1>Всем доброго времени суток.   Спасибо за ваш преальфатест😘</h1>
  </div>
    
  )
  
}
