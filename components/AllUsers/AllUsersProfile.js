import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import DeleteUser from './DeleteUser'

const AllUsersProfile = () => {

    const [Users, setUsers] = useState([])
    useEffect(() => {
        const getAllUsers = async () => {
            const token = localStorage.getItem("CC_Token")
            await axios
                .get(`http://${baseUrl}api/users/all-user`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => setUsers(res.data))
        }
        getAllUsers()
    }, [])
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <h2>All Users</h2>
                {
                    Users.map((user, index) => {
                        return (
                            <div
                                style={{
                                    background: "F5F5F5",
                                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                    border: "2px solid grey",
                                    borderRadius: "5px",
                                    marginBottom:"10px",
                                }}>

                                <div style={{
                                    color: "black",
                                    padding: "5px",
                                }}>

                                    <div style={{
                                        margin: "5px",
                                    }}>
                                        Name: {user.firstname} {user.lastname}
                                    </div>
                                    <div style={{
                                        margin: "5px",
                                    }}>
                                        Phone: {user.phone}
                                    </div>
                                    <div style={{
                                        margin: "5px",
                                    }}>
                                        Email: {user.email}
                                    </div>
                                    <div style={{
                                        margin: "5px",
                                    }}>
                                        <DeleteUser id={user._id} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default AllUsersProfile
