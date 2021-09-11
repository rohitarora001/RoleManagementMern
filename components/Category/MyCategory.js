import React from 'react'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const MyCategory = () => {
    const router = useRouter()
    const handleRedirect = () => {
        router.push('/mycategories')
    }
    return (
        <div>
            <Button size="small"
                variant="outlined"
                color="secondary"
                onClick={handleRedirect}>
                My Category
            </Button>
        </div>
    )
}

export default MyCategory
