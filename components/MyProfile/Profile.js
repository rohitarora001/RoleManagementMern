import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
const Profile = () => {
    const [user, setUser] = useState([])
    // setUserProfile(user)
    // const [picurl, setPicUrl] = useState('')
    // const [picture, setPicture] = useState('')
    const GetCurrentUser = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`http://${baseUrl}api/users/me`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setUser(res.data.data)
                // setPicUrl(res.data.data.avatar[0])
            }
            )
    }
    useEffect(() => {
        GetCurrentUser()
        // GetCurrentUserImage()
    }, [])
    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            {/* {console.log(user.firstname)}
            {console.log(user.lastname)}
            {console.log(user.phone)}
            {console.log(user.email)} */}
            <div
                style={{
                    display: "flex"
                }}>
                    <h2 style={{
                        marginRight:"5px",
                        fontSize:"1.2em"
                    }}>
                        Name:
                    </h2>
                    <h3
                    style={{
                        marginTop:"15px"
                    }}>
                        {user.firstname+" "+user.lastname}
                    </h3>
            </div>
            <div
                style={{
                    display: "flex",
                    margin:"0"
                }}>
                    <h2 style={{
                        marginRight:"5px",
                        fontSize:"1.2em"
                    }}>
                        Email:
                    </h2>
                    <h3
                    style={{
                        marginTop:"15px"
                    }}>
                        {user.email}
                    </h3>
            </div>
            <div
                style={{
                    display: "flex",
                    margin:"0"
                }}>
                    <h2 style={{
                        marginRight:"5px",
                        fontSize:"1.2em"
                    }}>
                        Phone:
                    </h2>
                    <h3
                    style={{
                        marginTop:"15px"
                    }}>
                        {user.phone}
                    </h3>
            </div>
            
        </div>
    )
}

export default Profile
