import {useEffect, useState} from "react";
import axios from "axios";
import User from "../model/User";
import {UserInfo} from "../model/UserInfo";

export default function UseUser() {
    const [me, setMe] = useState<UserInfo | undefined>()
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User>({username: "", roles: []})

    useEffect(() => {
        const me = window.localStorage.getItem('ME')
        me !== null && (!me ? setMe(undefined) : setMe(JSON.parse(me)))
    }, [])

    function handleLogin(username: string, password: string) {
        axios.get("api/user/login", {auth: {username, password}})
            .then(response => response.data)
            .then((data) => {
                setMe(data)
                window.localStorage.setItem('ME', JSON.stringify(data))
            })
            .catch(() => alert("Sorry, username or password was wrong!"))
    }

    function handleLogout() {
        axios.get("api/user/logout")
            .then(() => {
                setMe(undefined)
                window.localStorage.setItem('ME', JSON.stringify(undefined))
            })
            .catch((error) => console.error(error))
    }

    function getAllUsers() {
        axios.get("api/user/all")
            .then(response => response.data)
            .then(setUsers)
            .catch((error) => console.error(error))
    }

    function getUser(username: string) {
        axios.get("api/user/" + username)
            .then(response => response.data)
            .then(setUser)
            .catch((error) => console.error(error))
    }

    function createUser(username: string, password: string) {
        axios.post("api/user/create", {username: username, password: password})
            .then(getAllUsers)
            .catch((error) => console.error(error))
    }

    function updateUser(updatedUser: User) {
        axios.post("api/user/update/", updatedUser)
            .then(response => response.data)
            .then(getUser)
            .catch((error) => console.error(error))
    }

    function deleteUser(username: String) {
        axios.delete("api/user/delete/" + username)
            .then(response => {
                console.log(response.data)
            })
            .then(getAllUsers)
            .catch((error) => console.error(error))
    }

    return {handleLogin, handleLogout, getAllUsers, createUser, updateUser, deleteUser, getUser, me, users, user}
}