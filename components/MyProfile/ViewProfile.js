import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import DeleteUser from './DeleteUser'
import UpdateProfile from './UpdateProfile'
import LogOut from './LogOut'
import Jwt from 'jsonwebtoken'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import MyCategory from '../Category/MyCategory'
import MyProducts from '../Products/MyProducts' 

const ViewProfile = () => {
    const [userRole, setUserRole] = useState()
    const getCurrentUser = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`http://${baseUrl}api/users/me`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                setUserRole(res.data.data.role)
            }
            )
    }
    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <Layout>
            <div style={{display:"flex"}}>
                <h1>
                    My Profile
                </h1>
                <div style={{
                    display: "flex",
                    margin: "auto",
                }}>
                    <div style={{
                        margin: "5px"
                    }}>
                        {userRole == 1 || userRole == 2 ?
                            <MyProducts />
                            : null
                        }
                    </div>
                    <div style={{
                        margin: "5px"
                    }}>
                        {userRole == 1 || userRole == 2 ?
                            <MyCategory />
                            : null
                        }
                    </div>
                    <div style={{
                        margin: "5px"
                    }}>
                        <ChangePassword />
                    </div>
                    <div style={{
                        margin: "5px"
                    }}>
                        <UpdateProfile />
                    </div>
                    <div style={{
                        margin: "5px"
                    }}>
                        <DeleteUser />
                    </div>
                    <div style={{
                        margin: "5px"
                    }}>
                        <LogOut />
                    </div>
                </div>

            </div>
            <div style={{
                display: "flex",
                marginLeft: "20px"
            }}>
                <Profile />
            </div>
        </Layout>
    )
}

export default ViewProfile
