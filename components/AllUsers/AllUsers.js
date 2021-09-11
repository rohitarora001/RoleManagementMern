import React from 'react'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const AllUsers = () => {
    const router = useRouter()
    const handleRedirect = () => {
        router.push('/users')
    }

    return (
        <div>
            <Button size="small"
                variant="outlined"
                color="secondary"
                onClick={handleRedirect}>
                Get Users
            </Button>
        </div>
    )
}

export default AllUsers
