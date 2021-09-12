import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import jwt from 'jsonwebtoken'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, JWT_SECRET } from '../../next.config'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddProducts from './AddProducts'
import DeleteProduct from './DeleteProduct';
import Link from 'next/link';
import EditProduct from './EditProduct';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const MyProductHome = () => {
    const classes = useStyles();
    const [Products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const getMyProducts = async () => {
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET)
        const id = user.id
        await axios
            .get(`https://${baseUrl}api/users/${id}/myproducts`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setProducts(res.data.products))
            .then(() => setShow(true))
    }
    useEffect(() => {
        getMyProducts()
    }, [])
    return (
        <Layout>
            <div style={{
                height: "97.9vh"
            }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                    <h1> My Products - The Products Made By You  </h1>
                </div>
                <div style={{
                    display: "flex",
                    paddingBottom: "10px",
                    // margin: "5px"
                }}>
                    <AddProducts />
                </div>
                <div style={{
                    display: "flex",
                    width: "75vw"
                }}>
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
                            Products.length === 0 || Products === [] ?
                                <h1>No products are added by you till now</h1>
                                :
                                Products.map((prod, index) => {
                                    return (
                                        <div style={{
                                            margin: "10px"
                                        }}>
                                            <Card className={classes.root} key={index}>
                                                <CardContent >
                                                    <Typography variant="h5" key={index} component="h2">
                                                        {prod.name}
                                                    </Typography>
                                                    <Typography variant="h5" key={index} color="textSecondary" component="h2">
                                                        {prod.description}
                                                    </Typography>
                                                    <Typography variant="h5" key={index} color="black" component="h2">
                                                        Price : {prod.price}
                                                    </Typography>

                                                </CardContent>
                                                <CardActions>
                                                    <Link href={'/product/' + prod._id}>
                                                        <Button size="small" key={index} variant="outlined">View Product</Button>
                                                    </Link>
                                                </CardActions>
                                                <CardActions key={index}>
                                                    <EditProduct
                                                        name={prod.name}
                                                        price={prod.price}
                                                        description={prod.description}
                                                        id={prod._id}
                                                        key={index}
                                                    />
                                                </CardActions>
                                                <CardActions key={index}>
                                                    <DeleteProduct id={prod._id} />
                                                </CardActions>
                                            </Card>
                                        </div>
                                    )
                                })
                    }
                </div>
            </div>

        </Layout>
    )
}

export default MyProductHome