import {useState} from "react";
import axios from "axios";

export default function UseLogin(){
    const [me, setMe] = useState("")

    function handleLogin(username:string, password:string) {
        axios.get("api/user/login", {auth: {username, password}})
            .then(response => response.data)
            .then((data) => setMe(data))
            .catch(() => alert("Sorry, User oder Passwort war falsch!"))
    }

    function handleLogout(){
        axios.get("api/user/logout")
            .then(() => setMe(""))
    }

    return {handleLogin, handleLogout, me}
}