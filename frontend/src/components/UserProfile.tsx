import './UserProfile.css';
import React, {Dispatch, SetStateAction} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

type UserProfileProps = {
    setProfile: Dispatch<SetStateAction<boolean>>
}

export default function UserProfile(props: UserProfileProps) {

    const closeProfile = () => {
        props.setProfile(false)
    }

    return (
        <div className="user-profile-container">
            <div className={"close"}>
                <FontAwesomeIcon onClick={closeProfile} icon={faXmark} size={"1x"}/>
            </div>
        </div>
    )
}