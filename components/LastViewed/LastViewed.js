import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import jwt from 'jsonwebtoken'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { JWT_SECRET, baseUrl, token } from '../../next.config'
import Link from 'next/link'
import Layout from '../Layout/Layout'

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
const LastViewed = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        const getProducts = async () => {
            const token = localStorage.getItem("CC_Token")
            const user = jwt.verify(token, JWT_SECRET);
            const id = user.id;
            await axios
                .get(`http://${baseUrl}api/users/${id}/viewedproducts`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => setProducts(res.data.data.data[0].productsviewed))
        }
        getProducts();
    }, [])

    return (
        <Layout>

            <div>
                <div style={{
                    display:"flex",
                    margin:"auto",
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <h1>
                        Products History
                    </h1>
                </div>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {
                        products.map((product, index) => {
                            return (
                                <>
                                    <Card className={classes.root}
                                        variant="outlined"
                                        key={product.id}
                                        style={{
                                            margin: "7px"
                                        }} >
                                        <CardContent key={product.id}>
                                            {/* {
                                            product.pictures.map((pic) => {
                                                return (
                                                    <div>
                                                        <a><img src={pic} /></a>
                                                    </div>
                                                )
                                            })
                                        } */}
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {product.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions key={product.id}>
                                            <Link href={'/product/' + product._id} key={product._id}>
                                                <Button size="small"
                                                    variant="outlined"
                                                    color="secondary">
                                                    View Product
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </>
                            )
                        })
                    }
                </Grid>
            </div>
        </Layout>
    )

}

export default LastViewed
