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
import Link from 'next/link'
import makeToast from '../../Toaster';
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress';


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

const ProductsByCat = () => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;
    const [show, setShow] = useState(true)
    const [product, setProduct] = useState([])
    const checkLoggedin = () => {
        const token = localStorage.getItem("CC_Token")
        if (token === null) {
            return false;
        }
        else {
            return true
        }
    }
    async function GetProduct() {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/products/getproductbycategory/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setProduct(res.data.products))
            .then(() => setShow(false))
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
        <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >

                {
                    show == true ?
                        <div style={{
                            display: "flex",
                            position: "fixed",
                            top: "40%",
                            left: "50%",
                        }}>
                            < CircularProgress disableShrink />
                        </div>
                        :
                        product.length === 0 || product === [] ?
                            <h1>No products in this category please add the products and come back.</h1>
                            :
                            product.map((prod, index) => {
                                return (
                                    <>
                                        {/* {console.log(product.name)} */}
                                        <Card className={classes.root}
                                            variant="outlined"
                                            key={prod._id}
                                            style={{
                                                margin: "7px"
                                            }} >
                                            <CardContent key={prod._id}>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    {prod.name}
                                                </Typography>
                                                <Typography variant="h5" component="h2">
                                                    {prod.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions key={product._id}>
                                                <Link href={'/product/' + prod._id} key={prod._id}>
                                                    <Button size="small"
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => console.log(prod._id)}>
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

export default ProductsByCat
