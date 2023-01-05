import React, { useContext, useEffect} from "react"
import { AppContext } from "../../../context/AppContext";


export const UserHeader = () => {
    const { user } = useContext(AppContext)
    useEffect( () => {
        console.log("user", user)
    }, [user])
    return (<div className = "flex flex-row">
        <p className="text-white">{user.name}ds</p>
    </div>)
}