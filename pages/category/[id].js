import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../../next.config'
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

const CategoryDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [Category, setCategory] = useState([])
    async function GetCategory() {
        const token = localStorage.getItem("CC_Token")
        console.log(id)
        const Data = await axios
            .get(`http://${baseUrl}api/category/${id}`,
                { headers: { "Authorization": `Bearer ${token}` } })
        // await setCategory(Data.data.data.data[0])
        setCategory(Data.data.data)
    }
    // console.log(Category)
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
                            <a><img src={`http://localhost:4000/uploads/${pic}`} /></a>
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
