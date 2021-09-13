import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import makeToast from '../../Toaster';
import { useRouter } from 'next/router'

const ProductLandingPage = ({ id }) => {
    const [product, setProduct] = useState([])
    const router = useRouter();
    async function GetProduct() {
        const token = localStorage.getItem("CC_Token")
        console.log(id)
        const Data = await axios
            .get(`https://${baseUrl}api/products/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
        setProduct(Data.data.data.data[0])
        console.log(Data.data.data.data[0])
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
            GetProduct()
        }
    }, [])
    return (
        <>
            <h1>
                {product.name}
            </h1>
            {/* {
                product.pictures.map((pic) => {
                    return (
                        <div>
                            <a><img src={pic} /></a>
                        </div>
                    )
                })} */}
            <Typography color="textSecondary" gutterBottom>
                {product.description}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {product.price}
            </Typography>
        </>
    )
}
export default ProductLandingPage
