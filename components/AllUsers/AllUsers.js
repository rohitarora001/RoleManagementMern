import React from 'react'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const AllUsers = () => {
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
    const handleRedirect = () => {
        const goahead = checkLoggedin()
        if (goahead == false) {
            makeToast("error", "You must be logged in")
            router.push('/login')
        }
        else {
            router.push('/users')
        }
    }

    return (
        <div>
            <Button size="small"
                color="primary"
                onClick={handleRedirect}>
                Get Users
            </Button>
        </div>
    )
}

export default AllUsers
