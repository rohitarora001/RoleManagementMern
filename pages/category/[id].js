import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import { CircularProgress } from '@material-ui/core'

const CategoryDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [Category, setCategory] = useState([])
    const [show, setShow] = useState(true)
    async function GetCategory() {
        const token = localStorage.getItem("CC_Token")
        await axios
            .get(`https://${baseUrl}api/category/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setCategory(res.data.data))
            .then(() => setShow(false))

    }
    useEffect(() => {
        GetCategory()
    }, [])

    return (
        <>
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
                    <div>
                        <h1>
                            {Category.name}
                        </h1>
                        <Typography color="textSecondary" gutterBottom>
                            {Category.description}
                        </Typography>
                    </div>
            }
        </>
    )
}

export default CategoryDetails
