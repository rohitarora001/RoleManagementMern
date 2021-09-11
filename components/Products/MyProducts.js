import React from 'react'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const MyProducts = () => {
    const router = useRouter()
    const handleRedirect = () => {
        router.push('/myproducts')
    }
    return (
        <div>
            <Button size="small"
                variant="outlined"
                color="secondary"
                onClick={handleRedirect}>
                My Products
            </Button>
        </div>
    )
}

export default MyProducts