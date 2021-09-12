import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { baseUrl } from '../../next.config'
const Profile = () => {
    const [user, setUser] = useState([])
    const [show, setShow] = useState(false)
    // setUserProfile(user)
    // const [picurl, setPicUrl] = useState('')
    // const [picture, setPicture] = useState('')
    const GetCurrentUser = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/users/me`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setUser(res.data.data))
            .then(() => setShow(true))
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
            {
                show == false || user == undefined || user == null || user.length == 0 ?
                    <div style={{
                        display: "flex",
                        position: "fixed",
                        top: "40%",
                        left: "50%",
                    }}>
                        < CircularProgress disableShrink />

                    </div>
                    :
                    <>
                        <div
                            style={{
                                display: "flex"
                            }}>
                            <h2 style={{
                                marginRight: "5px",
                                fontSize: "1.2em"
                            }}>
                                Name:
                            </h2>
                            <h3
                                style={{
                                    marginTop: "17px",
                                    fontSize: "1.2em"
                                }}>
                                {user.firstname + " " + user.lastname}
                            </h3>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                margin: "0"
                            }}>
                            <h2 style={{
                                marginRight: "5px",
                                fontSize: "1.2em"
                            }}>
                                Email:
                            </h2>
                            <h3
                                style={{
                                    marginTop: "17px",
                                    fontSize: "1.2em"
                                }}>
                                {user.email}
                            </h3>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                margin: "0"
                            }}>
                            <h2 style={{
                                marginRight: "5px",
                                fontSize: "1.2em"
                            }}>
                                Phone:
                            </h2>
                            <h3 style={{
                                marginTop: "17px",
                                fontSize: "1.2em"
                            }}>
                                {user.phone}
                            </h3>
                        </div>
                    </>
            }

        </div>
    )
}

export default Profile
