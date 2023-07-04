import Link from "next/link";
import { auth } from "./firebase/firebase-config";

export default function Header({onChangeTheme,theme,click}){

      return (
        <div className={theme?"header":"header_ligth"}>
            <Link className="nav_button_on_header" href="/">Main</Link>
            <Link className="nav_button_on_header" href="/chats">Private Chats</Link>
            <Link className="nav_button_on_header" href="/allpeople">AllPeople</Link>
            <Link className="nav_button_on_header" href="/profile">Profile</Link>
            <button className={theme?"button_for_cahnge_theme_dark":"button_for_cahnge_theme_ligth"} onClick={onChangeTheme}>{theme? '🌞' : '🌑' }</button>
            {click > 23? <Link href="/game">👽</Link> : ""}
        </div>
    )  
    
    
}