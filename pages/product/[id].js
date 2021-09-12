import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState([])
    // console.log(product)
    async function GetProduct() {
        const token = localStorage.getItem("CC_Token")
        console.log(id)
        const Data = await axios
            .get(`https://${baseUrl}api/products/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
        await setProduct(Data.data.data.data[0])
        console.log(Data.data.data.data[0])
    }
    useEffect(() => {
        GetProduct()
    }, [])
    
    return (
        <div>
            <h1>
                {product.name}
            </h1>
            {/* {
                product.pictures.map((pic) => {
                    return (
                        <div>
                            <a><img src={`https://localhost:4000/uploads/${pic}`} /></a>
                        </div>
                    )
                })} */}
            <Typography color="textSecondary" gutterBottom>
                {product.description}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {product.price}
            </Typography>
        </div>
    )
}

export default ProductDetails
