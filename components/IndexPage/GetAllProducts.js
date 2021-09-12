import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl } from '../../next.config'
import makeToast from '../../Toaster'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link'

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

const GetAllProducts = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(true)
    const router = useRouter()

    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }

    const GetProducts = async () => {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/products`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setProducts(res.data))
            .then(()=>setShow(false))
    }
    useEffect(() => {

        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            GetProducts()
        }
    }, [])
    return (
        <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >{
                    show == true ?
                        <div style={{
                            display: "flex",
                            position: "fixed",
                            top: "40%",
                            left: "50%",
                        }}>
                            <CircularProgress disableShrink />
                        </div>
                        :
                        products.length === 0 || products === [] ?
                            <h1>No products found</h1>
                            :
                            products.map((product, index) => {
                                return (
                                    <>
                                        {/* {console.log(product.name)} */}
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
                                                <Typography key={index} className={classes.title} color="textSecondary" gutterBottom>
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="h5" key={index} component="h2">
                                                    {product.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions key={product._id}>
                                                <Link href={'/product/' + product._id} key={product._id}>
                                                    <Button size="small"
                                                        variant="outlined"
                                                        color="secondary"
                                                        key={index}>
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
    )
}


export default GetAllProducts
