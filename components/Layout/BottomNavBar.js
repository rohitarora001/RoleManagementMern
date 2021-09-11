import React from 'react'
import Link from 'next/link'

const BottomNavBar = () => {
    return (
        <div style={{
            clear: "both",
            position: "fixed",
            margin: "0",
            padding: "0",
            bottom: "0",
            width: "95%",
            height: "60px",   /* Height of the footer */
            background: "#6cf"
        }}>
            <div
            style={{
                display:"flex"
            }}>
                <div
                style={{
                    marginTop:"20px",
                    marginLeft:"100px",
                }}>
                    <Link href='/'>
                        <a
                            style={{
                                textDecoration: "none",
                                color: 'black',
                                fontWeight: 20,
                            }}> All Products </a>
                    </Link>
                </div>
                <div
                style={{
                    marginTop:"20px",
                    marginLeft:"300px",
                }}>
                    <Link href='/lastviewed'>
                        <a
                            style={{
                                textDecoration: "none",
                                color: 'black',
                                fontWeight: 20,
                            }}> Last Viewed </a>
                    </Link>

                </div>
                <div
                style={{
                    marginTop:"20px",
                    marginLeft:"300px",
                }}>
                    <Link href='/category'>
                        <a
                            style={{
                                textDecoration: "none",
                                color: 'black',
                                fontWeight: 20,
                            }}> Category </a>
                    </Link>

                </div>
                <div
                style={{
                    marginTop:"20px",
                    marginLeft:"300px",
                }}>
                    <Link href='/myprofile'>
                        <a
                            style={{
                                textDecoration: "none",
                                color: 'black',
                                fontWeight: 20,
                            }}> My Profile </a>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default BottomNavBar
