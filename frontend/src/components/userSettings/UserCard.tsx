import './UserCard.css';
import User from "../model/User";
import { ImCross } from 'react-icons/im';

type UserCardProps = {
    user: User
    deleteUser: (username: string) => void
}

export default function UserCard(props: UserCardProps) {

    return (
        <div className="user-card">
            <div className="user-name">
            {props.user.username}
            </div>
            <div className="user-role">
            {props.user.roles}
            </div>
            <ImCross className="user-delete" onClick={() => props.deleteUser(props.user.username)}/>
        </div>

    )
}