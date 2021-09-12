import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import jwt from 'jsonwebtoken'
import { makeStyles } from '@material-ui/core/styles';
import { baseUrl, JWT_SECRET } from '../../next.config'
import Link from 'next/link'
import AddCategory from './AddCategory'
import EditCategory from './EditCategory'
import DeleteCategory from './DeleteCategory';
import Layout from '../Layout/Layout'
import { CircularProgress } from '@material-ui/core'

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

const MyCategoryHome = () => {
    const classes = useStyles();
    const [Category, setCategory] = useState([]);
    const [show, setShow] = useState(false);
    const getMyCategories = async () => {
        const token = localStorage.getItem("CC_Token")
        const user = jwt.verify(token, JWT_SECRET)
        const id = user.id
        await axios
            .get(`https://${baseUrl}api/users/${id}/mycategory`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setCategory(res.data.categories))
            .then(() => setShow(true))
    }
    useEffect(() => {
        getMyCategories()
    }, [])
    return (
        <>
            <Layout>
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
                    <AddCategory />
                </div>
                <div >
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
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
                                Category.length === 0 || Category === [] ?
                                    <h1>No users found</h1>
                                    :
                                    Category.map((cat, index) => {
                                        return (
                                            <>
                                                <Card className={classes.root}
                                                    variant="outlined"
                                                    key={index}
                                                    style={{
                                                        margin: "7px"
                                                    }} >
                                                    <CardContent >
                                                        <div style={{ display: 'flex' }}>
                                                            <Typography gutterBottom style={{ display: 'flex' }}>
                                                                {cat.name}
                                                                <EditCategory name={cat.name} description={cat.description} id={cat._id} />
                                                                <DeleteCategory id={cat._id} />
                                                            </Typography>
                                                        </div>
                                                        <Typography variant="h5" color="textSecondary" className={classes.title} component="h2">
                                                            {cat.description}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions >
                                                        <Link href={'/category/' + cat._id} key={cat._id}>
                                                            <Button size="small"
                                                                variant="outlined"
                                                                color="secondary">
                                                                View Category
                                                            </Button>
                                                        </Link>
                                                        <Link href={'/products/' + cat._id}>
                                                            <Button size="small"
                                                                variant="outlined"
                                                                color="secondary">
                                                                View Products
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
        </>
    )
}

export default MyCategoryHome
