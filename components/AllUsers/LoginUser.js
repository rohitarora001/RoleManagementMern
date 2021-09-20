import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { baseUrl } from '../../next.config';
import makeToast from '../../Toaster'
import axios from 'axios'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken';


const LoginUser = ({ id }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const loginUser = async () => {
        try {
            const token = localStorage.getItem("CC_Token")
            const myHeaders = { headers: { "Authorization": `Bearer ${token}` } }
            await axios
                .post(`https://${baseUrl}api/admin/user-login/${id}`, myHeaders)
                .then((res) => {
                    if (res.status == 200) {
                        const token1  = res.data.token
                        localStorage.setItem("CC_Token", token1);
                        router.push('/');
                        makeToast("success", 'Logged in successfully');
                    }
                })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Button
                size="small"
                variant="outlined"
                onClick={handleClickOpen}
            >
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Do you want to login into this user?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}
                        color="primary">
                        Back
                    </Button>
                    <Button color="primary" autoFocus
                        onClick={() => {
                            loginUser()
                            handleClose()
                        }}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoginUser
