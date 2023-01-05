import React, { useContext} from "react"
import { AppContext } from "../../../context/AppContext";


export const UserHeader = () => {
    const { user } = useContext(AppContext)
    return (<div className = "flex flex-row">
        <p className="text-white">{user.name}</p>
    </div>)
}