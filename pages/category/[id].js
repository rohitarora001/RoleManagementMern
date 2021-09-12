import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

const CategoryDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [Category, setCategory] = useState([])
    // console.log(Category)
    async function GetCategory() {
        const token = localStorage.getItem("CC_Token")
        console.log(id)
        const Data = await axios
            .get(`https://${baseUrl}api/category/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
        // await setCategory(Data.data.data.data[0])
        setCategory(Data.data.data)
    }
    useEffect(() => {
        GetCategory()
    }, [])

    return (

        <div>
            <h1>
                {Category.name}
            </h1>
            {/* {
                Category.pictures.map((pic) => {
                    return (
                        <div>
                            <a><img src={`https://localhost:4000/uploads/${pic}`} /></a>
                        </div>
                    )
                })} */}
            <Typography color="textSecondary" gutterBottom>
                {Category.description}
            </Typography>
        </div>
    )
}

export default CategoryDetails
