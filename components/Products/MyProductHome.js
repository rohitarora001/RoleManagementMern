import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import jwt from 'jsonwebtoken'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, JWT_SECRET } from '../../next.config'
import Link from 'next/link'
import AddProducts from './AddProducts'

const MyProductHome = () => {
    const [Products, setProducts] = useState([]);
    const getMyProducts = async () => {
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET)
        const id = user.id
        await axios
            .get(`http://${baseUrl}api/users/${id}/myproducts`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setProducts(res.data.products))
    }
    useEffect(() => {
        getMyProducts()
    }, [])
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <h1> My Category - The Categories Made By You  </h1>
            </div>
            <div style={{
                display: "flex",
                paddingBottom: "10px",
                margin: "5px"
            }}>
                <AddProducts />
            </div>

        </>
    )
}

export default MyProductHome
