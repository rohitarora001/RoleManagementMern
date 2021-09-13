import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import DeleteUser from './DeleteUser'
import UpdateProfile from './UpdateProfile'
import LogOut from './LogOut'
import AllUsers from '../AllUsers/AllUsers'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import MyCategory from '../Category/MyCategory'
import MyProducts from '../Products/MyProducts'
import makeToast from '../../Toaster';
import { useRouter } from 'next/router'

const ViewProfile = () => {
    const [userRole, setUserRole] = useState()
    const [UserId, setUserId] = useState()
    const router = useRouter()
    const getCurrentUser = async () => {
        try{
            const token = localStorage.getItem("CC_Token")
            await axios
                .get(`https://${baseUrl}api/users/me`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    setUserRole(res.data.data.role)
                    setUserId(res.data.data._id)
                }
                )
        }
        catch(error){
            makeToast("error","You must be logged in")
        }
    }
    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }
    useEffect(() => {
        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            getCurrentUser()
        }
    }, [])
    return (
        <Layout>
            <div style={{
                display: "flex",
                backgroundColor: "rgb(240,242,245)",
                borderRadius:"5px"
            }}>
                <div>
                    <h1 style={{
                        color: "rgb(102,204,255)",
                        marginLeft: "10px",
                    }}>
                        My Profile
                    </h1>
                </div>
                <div style={{
                    display: "flex",
                    margin: "auto",
                    position: "absolute",
                    right: "15px",
                    top: "30px",
                }}>
                    <div style={{
                        margin: "5px"
                    }}>
                        {userRole == 1 ?
                            <AllUsers />
                            : null
                        }
                    </div>
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
                        <DeleteUser id={UserId} />
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
