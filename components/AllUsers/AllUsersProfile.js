import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteUser from './DeleteUser'
import makeToast from '../../Toaster';
import { useRouter } from 'next/router'

const AllUsersProfile = () => {

    const [Users, setUsers] = useState([])
    const [show, setShow] = useState(false)
    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }
    const getAllUsers = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/users/all-user`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setUsers(res.data))
            .then(() => setShow(true))
    }
    useEffect(() => {

        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            getAllUsers()
        }
    }, [])
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <h2>All Users</h2>
                {
                    show == false ?
                        <div style={{
                            display: "flex",
                            position: "fixed",
                            top: "40%",
                            left: "50%",
                        }}>
                            < CircularProgress disableShrink />
                        </div>
                        :
                        Users.length === 0 || Users === [] ?
                            <h1>No users found</h1>
                            :
                            Users.map((user, index) => {
                                return (
                                    <div
                                        style={{
                                            background: "F5F5F5",
                                            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                                            border: "2px solid grey",
                                            borderRadius: "5px",
                                            marginBottom: "10px",
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
