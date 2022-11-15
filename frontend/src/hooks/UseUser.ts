import {useEffect, useState} from "react";
import axios from "axios";
import User from "../model/User";
import {UserInfo} from "../model/UserInfo";
import UserDTO from "../model/UserDTO";

export default function UseUser() {
    const [me, setMe] = useState<UserInfo | undefined>()
    const [users, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User>()

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
    }

    function getAllUsers() {
        axios.get("api/user/all")
            .then(response => response.data)
            .then(setUsers)
    }

    function getUserById(username: string) {
        axios.get("api/user/" + username)
            .then(response => response.data)
            .then(setUser)
    }

    function createUser(username: string, password: string) {
        axios.post("api/user/create", {username: username, password: password})
    }

    function updateUser(updatedUser: UserDTO) {
        axios.post("api/user/update/", updatedUser)
    }

    function deleteUser(username: String) {
        axios.delete("api/user/" + username)
    }

    return {handleLogin, handleLogout, getAllUsers, createUser, updateUser, deleteUser, getUserById, me, users, user}
}